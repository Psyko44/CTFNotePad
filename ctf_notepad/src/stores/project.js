import { defineStore } from 'pinia'
import { ref } from 'vue'

const STORAGE_KEY = 'ctf_notepad_projects'

export const useProjectStore = defineStore('project', () => {
  const currentProject = ref(null)
  const projects = ref([])

  // Sauvegarder les projets dans localStorage
  const saveProjects = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects.value))
    } catch (error) {
      console.error('Error saving projects:', error)
    }
  }

  // Créer un nouveau projet
  const createProject = (name) => {
    const newProject = {
      id: Date.now().toString(),
      name,
      created_at: new Date().toISOString(),
      timer: {
        elapsedTime: 0,  // temps écoulé en secondes
        isRunning: false,
        startTime: null
      },
      zones: {
        recon: { id: 'recon', name: 'Recon', notes: '', checklist: [], timeSpent: 0 },
        exploit: { id: 'exploit', name: 'Exploit', notes: '', checklist: [], timeSpent: 0 },
        privesc: { id: 'privesc', name: 'Privesc', notes: '', checklist: [], timeSpent: 0 },
        flags: { id: 'flags', name: 'Flags', notes: '', checklist: [], timeSpent: 0 }
      }
    }
    projects.value.push(newProject)
    saveProjects()
    return newProject
  }

  // Charger un projet
  const loadProject = (project) => {
    // S'assurer que le projet a toutes les zones par défaut
    const defaultZones = {
      recon: { id: 'recon', name: 'Recon', notes: '', checklist: [], timeSpent: 0 },
      exploit: { id: 'exploit', name: 'Exploit', notes: '', checklist: [], timeSpent: 0 },
      privesc: { id: 'privesc', name: 'Privesc', notes: '', checklist: [], timeSpent: 0 },
      flags: { id: 'flags', name: 'Flags', notes: '', checklist: [], timeSpent: 0 }
    }

    // Fusionner les zones existantes avec les zones par défaut
    project.zones = {
      ...defaultZones,
      ...project.zones
    }

    currentProject.value = project
  }

  // Sélectionner un projet
  const selectProject = (project) => {
    currentProject.value = project
  }

  // Mettre à jour le nom d'un projet
  const updateProjectName = (name) => {
    if (!currentProject.value) return
    currentProject.value.name = name
    saveProjects()
  }

  // Mettre à jour les notes d'une zone
  const updateZoneNotes = (zoneId, notes) => {
    if (!currentProject.value?.zones) return
    const zone = currentProject.value.zones[zoneId]
    if (zone) {
      zone.notes = notes
      saveProjects()
    }
  }

  // Mettre à jour la checklist d'une zone
  const updateZoneChecklist = (zoneId, checklist) => {
    if (!currentProject.value?.zones) return
    const zone = currentProject.value.zones[zoneId]
    if (zone) {
      zone.checklist = checklist
      saveProjects()
    }
  }

  // Mettre à jour le temps passé dans une zone
  const updateZoneTimeSpent = (zoneId, timeSpent) => {
    if (!currentProject.value?.zones) return
    const zone = currentProject.value.zones[zoneId]
    if (zone) {
      zone.timeSpent = timeSpent
      saveProjects()
    }
  }

  // Charger les projets
  const loadProjects = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const loadedProjects = JSON.parse(saved)
        // S'assurer que chaque projet a les zones par défaut
        loadedProjects.forEach(project => {
          if (!project.zones) {
            project.zones = {}
          }
          if (!project.timer) {
            project.timer = {
              elapsedTime: 0,
              isRunning: false,
              startTime: null
            }
          }
          const defaultZones = {
            recon: { id: 'recon', name: 'Recon', notes: '', checklist: [], timeSpent: 0 },
            exploit: { id: 'exploit', name: 'Exploit', notes: '', checklist: [], timeSpent: 0 },
            privesc: { id: 'privesc', name: 'Privesc', notes: '', checklist: [], timeSpent: 0 },
            flags: { id: 'flags', name: 'Flags', notes: '', checklist: [], timeSpent: 0 }
          }
          project.zones = {
            ...defaultZones,
            ...project.zones
          }
        })
        projects.value = loadedProjects
      }
    } catch (error) {
      console.error('Error loading projects:', error)
    }
  }

  // Supprimer un projet
  const deleteProject = (projectId) => {
    const index = projects.value.findIndex(p => p.id === projectId)
    if (index !== -1) {
      projects.value.splice(index, 1)
      if (currentProject.value?.id === projectId) {
        currentProject.value = null
      }
      saveProjects()
    }
  }

  const updateProjectTimer = (timerData) => {
    if (!currentProject.value) return;
    currentProject.value.timer = timerData;
    saveProjects();
  }

  // Exporter un projet
  const exportProject = (project) => {
    try {
      const projectData = JSON.stringify(project, null, 2)
      const blob = new Blob([projectData], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${project.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error exporting project:', error)
      throw error
    }
  }

  // Importer un projet
  const importProject = async (file) => {
    try {
      const text = await file.text()
      const project = JSON.parse(text)
      if (!project.name || !project.zones) {
        throw new Error('Invalid project format')
      }
      project.id = Date.now().toString()
      projects.value.push(project)
      saveProjects()
      return project
    } catch (error) {
      console.error('Error importing project:', error)
      throw error
    }
  }

  const addChecklistItem = (item, zoneId) => {
    if (!currentProject.value) return
    const zone = currentProject.value.zones[zoneId]
    if (zone) {
      if (!zone.checklist) zone.checklist = []
      zone.checklist.push(item)
      saveProjects()
    }
  }

  // Charger les projets au démarrage
  loadProjects()

  return {
    currentProject,
    projects,
    createProject,
    loadProject,
    selectProject,
    updateProjectName,
    updateZoneNotes,
    updateZoneChecklist,
    updateZoneTimeSpent,
    updateProjectTimer,
    saveProjects,
    loadProjects,
    deleteProject,
    exportProject,
    importProject,
    addChecklistItem
  }
})
