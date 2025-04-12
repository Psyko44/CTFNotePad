<template>
  <div class="home-container pa-4">
    <v-row>
      <!-- En-tête -->
      <v-col cols="12" class="text-center mb-6">
        <h1 class="text-h3 mb-2">{{ themeStore.mode === 'ctf' ? 'CTF' : 'OSINT' }} NotePad</h1>
        <p class="text-subtitle-1">Gérez vos notes {{ themeStore.mode === 'ctf' ? 'de CTF' : 'd\'OSINT' }} efficacement</p>
      </v-col>

      <!-- Bouton Nouveau Projet -->
      <v-col cols="12" class="text-center mb-6">
        <v-btn color="primary" size="large" prepend-icon="mdi-plus" @click="showNewProjectDialog = true">
          Nouveau Projet
        </v-btn>
      </v-col>

      <!-- Liste des projets -->
      <v-col cols="12">
        <v-row>
          <!-- Carte pour chaque projet -->
          <v-col v-for="project in projects" :key="project.id" cols="12" sm="6" md="4" lg="3">
            <v-card class="project-card" :elevation="2" @click="openProject(project)" hover>
              <v-card-title class="text-truncate">
                {{ project.name }}
              </v-card-title>

              <!-- Statistiques du projet -->
              <v-card-text>
                <div class="d-flex align-center mb-2">
                  <v-icon icon="mdi-folder-outline" class="mr-2" />
                  <span>{{ Object.keys(project.zones || {}).length }} zones</span>
                </div>

                <!-- Progression des checklists -->
                <div class="d-flex align-center mb-2">
                  <v-icon icon="mdi-checkbox-marked" class="mr-2" />
                  <span>{{ getChecklistProgress(project) }}</span>
                </div>

                <!-- Date de dernière modification -->
                <div class="d-flex align-center">
                  <v-icon icon="mdi-clock-outline" class="mr-2" />
                  <span>{{ formatDate(project.lastModified) }}</span>
                </div>
              </v-card-text>

              <!-- Actions -->
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon="mdi-pencil" variant="text" size="small" @click.stop="openProject(project)">
                  <v-tooltip activator="parent" location="top">
                    Éditer
                  </v-tooltip>
                </v-btn>
                <v-btn icon="mdi-delete" variant="text" size="small" color="error" @click.stop="confirmDelete(project)">
                  <v-tooltip activator="parent" location="top">
                    Supprimer
                  </v-tooltip>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <!-- Message si aucun projet -->
          <v-col v-if="!projects.length" cols="12" class="text-center">
            <v-icon size="64" color="grey" icon="mdi-folder-outline"></v-icon>
            <div class="text-h6 mt-4 text-grey">Aucun projet pour le moment</div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-dialog v-model="showNewProjectDialog" max-width="500px">
  <v-card>
    <v-card-title>Nouveau Projet</v-card-title>
    <v-card-text>
      <v-text-field v-model="newProjectName" label="Nom du projet" variant="outlined" hide-details autofocus></v-text-field>
    </v-card-text>
    <v-card-actions class="pa-4">
      <v-spacer></v-spacer>
      <v-btn color="error" variant="text" @click="showNewProjectDialog = false">
        Annuler
      </v-btn>
      <v-btn color="primary" @click="createProject" :disabled="!newProjectName.trim()">
        Créer
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

    <!-- Dialog de confirmation de suppression -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title>Confirmer la suppression</v-card-title>
        <v-card-text>
          Voulez-vous vraiment supprimer le projet "{{ projectToDelete?.name }}" ?
          Cette action est irréversible.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="text" @click="deleteDialog = false">
            Annuler
          </v-btn>
          <v-btn color="error" variant="flat" @click="deleteProject">
            Supprimer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>



<script setup>
import { useThemeStore } from '../stores/theme'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProjectStore } from '@/stores/project'

const router = useRouter()
const projectStore = useProjectStore()
const themeStore = useThemeStore()
const showNewProjectDialog = ref(false)
const newProjectName = ref('')

// État local
const deleteDialog = ref(false)
const projectToDelete = ref(null)

// Liste des projets
const projects = computed(() => {
  return Object.values(projectStore.projects || {}).sort((a, b) => {
    return new Date(b.lastModified) - new Date(a.lastModified)
  })
})

const createProject = () => {
  if (newProjectName.value.trim()) {
    const project = projectStore.createProject(newProjectName.value)
    showNewProjectDialog.value = false
    newProjectName.value = ''
    // Vous pouvez aussi naviguer vers la page d'édition :
    router.push('/editor')
  }
}

// Fonctions
const createNewProject = () => {
  projectStore.createNewProject()
  router.push('/editor')
}

const openProject = (project) => {
  projectStore.currentProject = project
  projectStore.loadProject(project)  // Charge le projet avec les zones par défaut
  router.push('/editor')
}

const confirmDelete = (project) => {
  projectToDelete.value = project
  deleteDialog.value = true
}

const deleteProject = () => {
  if (projectToDelete.value) {
    projectStore.deleteProject(projectToDelete.value.id)
    deleteDialog.value = false
    projectToDelete.value = null
  }
}

const getChecklistProgress = (project) => {
  let total = 0
  let completed = 0

  Object.values(project.zones || {}).forEach(zone => {
    if (zone.checklist) {
      total += zone.checklist.length
      completed += zone.checklist.filter(item => item.checked).length
    }
  })

  if (total === 0) return 'Pas de checklist'
  return `${completed}/${total} tâches`
}

const formatDate = (date) => {
  if (!date) return 'Jamais modifié'
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<style scoped>
.project-card {
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
}
</style>
