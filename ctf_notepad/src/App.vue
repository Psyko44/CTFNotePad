<!--
================================================================================
 Fichier : App.vue
 Description :
  Ce composant principal sert de structure à l'application CTF NotePad, un outil
  de prise de notes et de gestion de projets axé sur la cybersécurité et les CTF.
  Il inclut la navigation, la gestion des projets et l'intégration du mode sombre.

 Fonctionnalités principales :
  - Barre d'application avec un bouton pour basculer entre le mode clair et sombre.
  - Menu latéral (navigation drawer) affichant :
    - Les pages principales de l'application (Accueil, Techniques, Privilege Escalation, Générateur de Shells).
    - La liste des projets avec possibilité de sélection et de suppression.
  - Création et suppression de projets directement depuis l'interface.
  - Persistance des projets via un store Vuex/Pinia (`useProjectStore`).
  - Utilisation de `router-view` pour afficher dynamiquement les pages en fonction de la navigation.
  - Exportation des projets sous format JSON avec prise en charge des notes et des images stockées en localStorage.
  - Gestion du mode `rail` du drawer pour un affichage compact.

 Technologies utilisées :
  - Vue.js 3 (Composition API)
  - Vuetify (composants UI)
  - Vue Router (gestion de la navigation)
  - Vuex/Pinia (`useProjectStore`) pour la gestion de l'état global
  - LocalStorage pour la sauvegarde des images associées aux projets
  - JSON Blob export pour l'exportation de projets

 Remarque :
  Cette application est destinée aux professionnels de la cybersécurité, aux
  passionnés de CTF et aux étudiants en hacking éthique.

 Auteur : Psyko
 Date : 24.02.2025
================================================================================
-->


<template>
  <v-app>
    <v-app-bar>
      <v-container class="d-flex align-center">
        <v-spacer></v-spacer>
        <v-btn block icon @click="toggleTheme">
          <v-icon>{{ theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <!-- Navigation drawer avec les projets -->
    <v-navigation-drawer v-model="drawer" elevation="3" :rail="rail" @click="rail = false" permanent>
      <v-list-item prepend-avatar="https://cdn-icons-png.flaticon.com/512/2631/2631389.png"
        :title="rail ? '' : 'CTF NotePad'">
        <template v-slot:append>
          <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item to="/" :active="route.path === '/'">
          <v-list-item-title>Accueil</v-list-item-title>
        </v-list-item>

        <v-list-item to="/techniques" :active="route.path === '/techniques'">
          <v-list-item-title>Techniques</v-list-item-title>
        </v-list-item>

        <v-list-item to="/privesc" :active="route.path === '/privesc'">
          <v-list-item-title>Privilege Escalation</v-list-item-title>
        </v-list-item>

        <v-list-item to="/shells" :active="route.path === '/shells'">
          <v-list-item-title>Générateur de Shells</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-divider class="my-2"></v-divider>

      <v-list v-if="projects.length > 0" density="compact" nav>
        <v-list-item v-for="project in projects" :key="project.id" :value="project" :title="project.name"
          :active="currentProject?.id === project.id" @click="selectProject(project)">
          <template v-slot:prepend>
            <v-icon :icon="currentProject?.id === project.id ? 'mdi-folder-open' : 'mdi-folder'"></v-icon>
          </template>
          <template v-slot:append>
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn icon="mdi-dots-vertical" variant="text" density="compact" v-bind="props" @click.stop></v-btn>
              </template>
              <v-list>
                <v-list-item @click="deleteProject(project.id)">
                  <template v-slot:prepend>
                    <v-icon color="error">mdi-delete</v-icon>
                  </template>
                  <v-list-item-title class="text-error">Delete</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-divider></v-divider>
        <div class="pa-2">
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Contenu principal -->
    <v-main class="d-flex flex-column fill-height">

      <router-view></router-view>
    </v-main>

    <!-- Dialog pour nouveau projet -->
    <v-dialog v-model="showNewProjectDialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h5 pa-4">
          Create New Project
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="newProjectName" label="Project Name" variant="outlined" hide-details autofocus
            @keyup.enter="createProject"></v-text-field>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn color="error" variant="text" @click="showNewProjectDialog = false">
            Cancel
          </v-btn>
          <v-btn color="primary" @click="createProject" :disabled="!newProjectName.trim()">
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTheme } from 'vuetify'
import { useProjectStore } from '@/stores/project'
import { useRouter, useRoute } from 'vue-router'

const theme = useTheme()
const projectStore = useProjectStore()
const router = useRouter()
const route = useRoute()
const drawer = ref(true)
const rail = ref(false)
const showNewProjectDialog = ref(false)
const newProjectName = ref('')

const currentProject = computed(() => projectStore.currentProject)
const projects = computed(() => projectStore.projects)

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const createProject = () => {
  if (newProjectName.value.trim()) {
    const project = projectStore.createProject(newProjectName.value)
    showNewProjectDialog.value = false
    newProjectName.value = ''
    selectProject(project)
  }
}

const selectProject = (project) => {
  projectStore.selectProject(project)
  router.push('/editor')
}

function deleteProject(id) {
  projectStore.deleteProject(id)
}

const exportProject = () => {
  if (!projectStore.currentProject) {
    console.error('No project selected')
    return
  }

  try {

    const projectData = {
      ...projectStore.currentProject,
      zones: projectStore.zones.map(zone => ({
        ...zone,
        notes: zone.notes || ''
      }))
    }


    const projectImages = {}
    const imageKeys = Object.keys(localStorage).filter(key =>
      key.startsWith('image_') &&
      projectData.zones.some(zone =>
        zone.notes && zone.notes.includes(key.replace('image_', ''))
      )
    )

    imageKeys.forEach(key => {
      projectImages[key] = localStorage.getItem(key)
    })


    const exportData = {
      project: projectData,
      images: projectImages,
      version: '1.0'
    }


    const jsonString = JSON.stringify(exportData, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })


    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${projectData.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`


    document.body.appendChild(link)
    link.click()


    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error exporting project:', error)
  }
}
</script>

<style scoped>
:deep(.v-main) {
  flex: 1;
  min-height: 0;
  width: 100%;
}

.v-navigation-drawer :deep(.v-navigation-drawer__content) {
  display: flex;
  flex-direction: column;
}

:deep(.v-navigation-drawer__content > *:first-child) {
  flex-shrink: 0;
}

:deep(.v-navigation-drawer__content > *:nth-child(2)) {
  flex: 1;
  overflow-y: auto;
}

.v-navigation-drawer :deep(.v-list) {
  flex-grow: 1;
}
</style>
