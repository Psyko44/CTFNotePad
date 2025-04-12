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
  <v-app :theme="themeStore.mode">
    <v-app-bar density="compact">
      <v-app-bar-title>{{ themeStore.mode === 'ctf' ? 'CTF' : 'OSINT' }} NotePad</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-switch
        v-model="isOsintMode"
        :true-value="true"
        :false-value="false"
        hide-details
        density="compact"
        :color="themeStore.mode === 'ctf' ? 'primary' : 'primary'"
        class="mr-4"
      >
        <template v-slot:label>
          <div class="d-flex align-center">
            <span class="mr-2">
              Passer en mode {{ themeStore.mode === 'ctf' ? 'OSINT' : 'CTF' }}
            </span>
            <v-icon size="small">mdi-arrow-right-circle</v-icon>
          </div>
        </template>
      </v-switch>
      <input
        type="file"
        ref="fileInput"
        style="display: none"
        accept=".json"
        @change="importProject"
      />
      <v-btn prepend-icon="mdi-import" variant="text" @click="$refs.fileInput.click()">
        Importer
      </v-btn>
      <v-btn prepend-icon="mdi-export" variant="text" @click="exportAllProjects">
        Exporter tout
      </v-btn>
    </v-app-bar>

    <!-- Navigation drawer avec les projets -->
    <v-navigation-drawer v-model="drawer" elevation="3" :rail="rail" @click="rail = false" permanent>
      <v-list-item :prepend-avatar="avatarImage"
        :title="rail ? '' : (themeStore.mode === 'ctf' ? 'CTF' : 'OSINT') + ' NotePad'">
        <template v-slot:append>
          <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item to="/" :active="route.path === '/'" prepend-icon="mdi-home">
          <v-list-item-title v-if="!rail">Accueil</v-list-item-title>
        </v-list-item>

        <v-list-item to="/techniques" :active="route.path === '/techniques'" prepend-icon="mdi-book">
          <v-list-item-title v-if="!rail">Techniques</v-list-item-title>
        </v-list-item>

        <v-list-item to="/privesc" :active="route.path === '/privesc'" prepend-icon="mdi-lock">
          <v-list-item-title v-if="!rail">Privilege Escalation</v-list-item-title>
        </v-list-item>
      </v-list>



      <v-list-item class="mt-2">
        <v-btn block color="primary" prepend-icon="mdi-plus" @click="showNewProjectDialog = true">
          <span v-if="!rail">Nouveau Projet</span>
        </v-btn>
      </v-list-item>

      <v-divider class="my-2"></v-divider>

      <v-list v-if="projects.length > 0" density="compact" nav>
        <v-list-item v-for="project in projects" :key="project.id" :value="project"
          :active="currentProject?.id === project.id" @click="selectProject(project)"
          :active-color="'#FF5252'" style="color: #ffffff">
          <template v-slot:title>
            <span style="color: #ffffff">{{ project.name }}</span>
          </template>
          <template v-slot:prepend>
            <v-icon style="color: #ffffff" :icon="currentProject?.id === project.id ? 'mdi-folder-open' : 'mdi-folder'"></v-icon>
          </template>
          <template v-slot:append>
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn icon="mdi-dots-vertical" variant="text" style="color: #ffffff" density="compact" v-bind="props" @click.stop></v-btn>
              </template>
              <v-list>
                <v-list-item @click="deleteProject(project.id)">
                  <template v-slot:prepend>
                    <v-icon color="error">mdi-delete</v-icon>
                  </template>
                  <v-list-item-title class="text-error">Delete</v-list-item-title>
                </v-list-item>
                <v-list-item @click="exportProject(project)">
                  <template v-slot:prepend>
                    <v-icon>mdi-export</v-icon>
                  </template>
                  <v-list-item-title>Exporter</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-list-item>
      </v-list>

      <!-- Bouton pour créer un nouveau projet -->


    </v-navigation-drawer>

    <!-- Contenu principal -->
    <v-main class="d-flex flex-column fill-height">

      <router-view></router-view>
    </v-main>

    <!-- Dialog pour créer un nouveau projet -->
    <v-dialog v-model="showNewProjectDialog" max-width="500px">
      <v-card>
        <v-card-title>
          Nouveau Projet
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="newProjectName" label="Nom du Projet" variant="outlined" hide-details autofocus
            @keyup.enter="createProject"></v-text-field>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn color="error" variant="text" @click="showNewProjectDialog = false">
            Annuler
          </v-btn>
          <v-btn color="primary" @click="createProject" :disabled="!newProjectName.trim()">
            Creer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProjectStore } from '@/stores/project'
import { useThemeStore } from '@/stores/theme'
import avatarImage from '@/assets/logo.png';

const router = useRouter()
const route = useRoute()
const projectStore = useProjectStore()
const themeStore = useThemeStore()

// Gestion du mode OSINT/CTF
const isOsintMode = computed({
  get: () => themeStore.mode === 'osint',
  set: (value) => themeStore.toggleMode()
})
const drawer = ref(true)
const rail = ref(false)
const showNewProjectDialog = ref(false)
const newProjectName = ref('')

const currentProject = computed(() => projectStore.currentProject)
const projects = computed(() => projectStore.projects)

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




const fileInput = ref(null)

const importProject = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  try {
    const content = await file.text()
    const importData = JSON.parse(content)

    // Vérifier la version
    if (!importData.version) {
      throw new Error('Format de fichier invalide : version manquante')
    }

    // Restaurer les images dans le localStorage
    if (importData.images) {
      Object.entries(importData.images).forEach(([key, value]) => {
        localStorage.setItem(key, value)
      })
    }

    // Déterminer si c'est un projet unique ou une sauvegarde complète
    if (importData.project) {
      // Import d'un projet unique
      projectStore.projects.push(importData.project)
      projectStore.saveProjects()
      selectProject(importData.project)
      alert('Projet importé avec succès')
    } else if (importData.projects) {
      // Import d'une sauvegarde complète
      importData.projects.forEach(project => {
        projectStore.projects.push(project)
      })
      projectStore.saveProjects()
      alert(`${importData.projects.length} projets importés avec succès`)
    } else {
      throw new Error('Format de fichier invalide : aucun projet trouvé')
    }

    // Réinitialiser l'input file
    event.target.value = ''
  } catch (error) {
    console.error('Erreur lors de l\'importation:', error)
    alert('Erreur lors de l\'importation : ' + error.message)
  }
}

const exportProject = (project) => {
  if (!project) return

  try {
    // Récupérer les zones du projet
    const projectData = {
      ...project,
      zones: Object.entries(project.zones || {}).reduce((acc, [id, zone]) => ({
        ...acc,
        [id]: {
          ...zone,
          notes: zone.notes || ''
        }
      }), {})
    }

    // Récupérer les images utilisées dans ce projet
    const projectImages = {}
    const imageKeys = Object.keys(localStorage).filter(key =>
      key.startsWith('image_') &&
      Object.values(projectData.zones).some(zone =>
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

    downloadJson(exportData, `${projectData.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`)
  } catch (error) {
    console.error('Error exporting project:', error)
    alert('Erreur lors de l\'export du projet')
  }
}

const exportAllProjects = () => {
  try {
    const allProjects = projectStore.projects
    if (!allProjects || allProjects.length === 0) {
      alert('Aucun projet à exporter')
      return
    }

    // Récupérer toutes les images utilisées
    const allImages = {}
    Object.keys(localStorage)
      .filter(key => key.startsWith('image_'))
      .forEach(key => {
        allImages[key] = localStorage.getItem(key)
      })

    const exportData = {
      projects: allProjects,
      images: allImages,
      version: '1.0'
    }

    downloadJson(exportData, `CTFNotePad_backup_${new Date().toISOString().split('T')[0]}.json`)
  } catch (error) {
    console.error('Error exporting all projects:', error)
    alert('Erreur lors de l\'export des projets')
  }
}

const downloadJson = (data, filename) => {
  const jsonString = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}



</script>

<style>
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

.v-list-item--active {
  background-color: rgb(var(--v-theme-primary)) !important;
  opacity: 0.25;
}

.v-list-item--active .v-list-item-title {
  color: #FFFFFF !important;
}

.v-list-item {
  color: #FFFFFF !important;
}

.v-list-item:hover {
  background-color: rgb(var(--v-theme-primary)) !important;
  opacity: 0.7;
}
</style>
