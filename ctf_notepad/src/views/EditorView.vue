<!--
================================================================================
 Fichier : CTF NotePad.vue
 Description :
  Ce composant Vue.js représente une interface d’édition et de gestion de notes
  pour un projet de type "Capture The Flag" (CTF). Il permet aux utilisateurs de
  créer, organiser et gérer des notes pour différents projets de hacking éthique.

 Fonctionnalités principales :
  - Interface réactive gérée avec Vue.js 3 et Composition API.
  - Sélection ou création de projets avec une structure organisée en zones.
  - Barre d'outils permettant l'exportation du projet en JSON ou PDF.
  - Gestion dynamique des zones :
    - Drag & Drop des zones grâce à "vuedraggable".
    - Création, suppression et sélection de zones.
    - Zones statiques (préconfigurées) et zones personnalisées.
  - Éditeur Markdown intégré avec "EasyMDE" :
    - Édition et prévisualisation en Markdown.
    - Gestion des images collées (stockage en localStorage).
  - Gestion d'une checklist interactive par zone :
    - Ajout/suppression d'items de la checklist.
    - Sauvegarde automatique de l'état des items cochés.
  - Prévisualisation globale de toutes les zones combinées.
  - Mode sombre et clair avec prise en charge du thème Vuetify.
  - Exportation :
    - JSON (incluant les notes et checklist de chaque zone).
    - PDF (avec mise en page optimisée et prise en charge des images).

 Technologies utilisées :
  - Vue.js 3 (Composition API)
  - Vuetify (composants UI)
  - EasyMDE (éditeur Markdown)
  - vuedraggable (drag & drop des zones)
  - html2pdf.js (export PDF)
  - marked.js (rendu Markdown)

 Auteur : Psyko
 Date : 24.02.2025
================================================================================
-->

<template>
  <div class="d-flex flex-column fill-height">
    <!-- Message d'accueil si aucun projet n'est sélectionné -->
    <div v-if="!currentProject" class="d-flex align-center justify-center flex-grow-1">
      <v-card variant="text" class="text-center">
        <v-card-text>
          <v-icon size="64" color="primary" icon="mdi-folder-plus"></v-icon>
          <div class="text-h5 mt-4">Welcome to CTF NotePad</div>
          <div class="text-body-1 mt-2">Create or select a project to start taking notes</div>
        </v-card-text>
      </v-card>
    </div>

    <!-- Interface d'édition quand un projet est sélectionné -->
    <template v-else>
      <!-- Barre d'outils principale -->
      <v-toolbar density="compact" flat class="border-b">
        <v-toolbar-title class="font-weight-bold">{{ currentProject.name }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <div class="toolbar">
          <v-btn prepend-icon="mdi-export" variant="text" @click="exportProject"
            :disabled="!projectStore.currentProject">
            Export JSON
          </v-btn>
          <v-btn prepend-icon="mdi-file-pdf-box" variant="text" @click="exportToPdf"
            :disabled="!projectStore.currentProject">
            Export PDF
          </v-btn>
        </div>
      </v-toolbar>

      <!-- Contenu principal: zones (gauche) + éditeur (droite) -->
      <div class="d-flex flex-grow-1">
        <!-- Panneau latéral avec les zones -->
        <v-navigation-drawer permanent location="left" class="zone-nav">
          <v-list>
            <draggable v-model="zonesList" item-key="id" handle=".handle">
              <template #item="{ element: zone }">
                <v-list-item :title="zone.name" :active="currentZone?.id === zone.id" @click="selectZone(zone)"
                  class="d-flex align-center">
                  <template v-slot:prepend>
                    <v-icon class="handle" icon="mdi-drag" size="small" />
                  </template>
                  <template v-slot:append>
                    <v-btn v-if="!isStaticZone(zone.id)" icon="mdi-delete" variant="text" size="small" color="error"
                      @click.stop="deleteZone(zone)" />
                  </template>
                </v-list-item>
              </template>
            </draggable>

            <v-divider class="my-2" />

            <v-list-item>
              <v-btn block color="primary" prepend-icon="mdi-plus" @click="addNewZone">
                Ajouter une zone
              </v-btn>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>

        <!-- Zone d'édition -->
        <div v-if="currentZone" class="editor-container">


          <!-- Checklist -->
          <div class="checklist-container pa-2">
            <div class="d-flex align-center mb-2">
              <v-btn prepend-icon="mdi-plus" variant="text" @click="addChecklistItem">
                Ajouter un item
              </v-btn>
            </div>
            <v-list class="checklist-list">
              <v-list-item v-for="(item, index) in checklist" :key="index"
                :class="{ 'text-decoration-line-through': item.checked }" class="checklist-item">
                <template v-slot:prepend>
                  <v-checkbox v-model="item.checked" hide-details density="compact" @change="saveContent"
                    class="mt-1"></v-checkbox>
                </template>
                <v-list-item-title class="flex-grow-1 d-flex align-center">
                  <v-text-field v-model="item.text" hide-details density="compact" variant="plain"
                    placeholder="Entrer votre item ici ..." @blur="saveContent"
                    class="checklist-input flex-grow-1"></v-text-field>
                </v-list-item-title>
                <template v-slot:append>
                  <v-btn icon="mdi-delete" variant="text" density="compact" color="error"
                    @click="removeChecklistItem(index)" class="mt-1"></v-btn>
                </template>
              </v-list-item>
            </v-list>
          </div>

          <!-- Éditeur -->
          <div class="editor-wrapper">
            <textarea id="editor"></textarea>
          </div>
        </div>

        <!-- Zone de prévisualisation -->
        <div class="preview-zone">
          <v-toolbar density="compact" class="border-b mb-4">
            <v-toolbar-title>Prévisualisation</v-toolbar-title>
          </v-toolbar>
          <div class="preview-content" v-html="allZonesContent"></div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useProjectStore } from '@/stores/project'
import EasyMDE from 'easymde'
import { marked } from 'marked'
import draggable from 'vuedraggable'
import html2pdf from 'html2pdf.js/dist/html2pdf.bundle.min'
import 'easymde/dist/easymde.min.css'


marked.setOptions({
  breaks: true,
  headerIds: false,
  mangle: false,
  html: true
})


const darkThemeStyles = `
.v-theme--dark .editor-wrapper .CodeMirror,
.v-theme--dark .editor-wrapper .CodeMirror-scroll,
.v-theme--dark .editor-wrapper .CodeMirror-sizer,
.v-theme--dark .editor-wrapper .CodeMirror-gutter,
.v-theme--dark .editor-wrapper .CodeMirror-gutters,
.v-theme--dark .editor-wrapper .CodeMirror-linenumber,
.v-theme--dark .editor-wrapper .CodeMirror-lines,
.v-theme--dark .editor-wrapper .CodeMirror-line,
.v-theme--dark .editor-wrapper .CodeMirror textarea {
  background-color: var(--v-theme-surface) !important;
  color: var(--v-theme-on-surface) !important;
  caret-color: var(--v-theme-on-surface) !important;
}

.v-theme--dark .editor-wrapper .CodeMirror-cursor {
  border-color: var(--v-theme-on-surface) !important;
}

.v-theme--dark .editor-wrapper .CodeMirror-selected {
  background: rgba(255, 255, 255, 0.1) !important;
}

.v-theme--dark .editor-wrapper .editor-preview {
  background-color: var(--v-theme-surface) !important;
  color: var(--v-theme-on-surface) !important;
}

.v-theme--dark .editor-wrapper .CodeMirror-focused .CodeMirror-selected {
  background: rgba(255, 255, 255, 0.2) !important;
}
`


const styleSheet = document.createElement('style')
styleSheet.textContent = darkThemeStyles
document.head.appendChild(styleSheet)

const projectStore = useProjectStore()
const currentZone = ref(null)
let easyMDE = null

const currentProject = computed(() => projectStore.currentProject)


const checklist = computed({
  get: () => currentZone.value?.checklist || [],
  set: (newValue) => {
    if (currentZone.value) {
      currentZone.value.checklist = newValue
      projectStore.updateZoneChecklist(currentZone.value.id, newValue)
    }
  }
})


const allZonesContent = computed(() => {
  if (!projectStore.currentProject?.zones) return ''
  return Object.values(projectStore.currentProject.zones)
    .map(zone => {
      const contentWithImages = replaceStoredImages(zone.notes || '')
      const content = marked(contentWithImages)
      const checklistHtml = zone.checklist?.length
        ? `<div class="zone-checklist">
            <h3>Checklist</h3>
            <ul>
              ${zone.checklist.map(item =>
          `<li class="${item.checked ? 'checked' : ''}">
                  ${item.checked ? '✓' : '☐'} ${item.text}
                </li>`
        ).join('')}
            </ul>
          </div>`
        : ''
      return `<div class="zone-section">
        <h2 class="zone-title">${zone.name}</h2>
        <div class="zone-content">
          ${content}
          ${checklistHtml}
        </div>
      </div>`
    })
    .join('')
})

const renderedContent = computed(() => {
  if (!currentZone.value?.notes) return ''
  return marked(currentZone.value.notes)
})

const saveContent = () => {
  if (!currentZone.value) return

  const content = easyMDE?.value()
  if (content !== undefined) {
    projectStore.updateZoneNotes(currentZone.value.id, content)
  }
}

const selectZone = (zone) => {
  currentZone.value = zone
  if (easyMDE) {
    easyMDE.value(zone.notes || '') // Réinitialise le contenu avec les notes de la nouvelle zone
  }
  initializeEditor() // Réinitialise l'éditeur avec le nouveau contenu
}

const staticZones = [
  { id: 'recon', name: 'Recon' },
  { id: 'exploit', name: 'Exploit' },
  { id: 'privesc', name: 'Privesc' },
  { id: 'flags', name: 'Flags' }
]


const zonesList = computed({
  get: () => {
    if (!projectStore.currentProject?.zones) return []
    return Object.values(projectStore.currentProject.zones)
  },
  set: (newList) => {
    if (!projectStore.currentProject) return
    const newZones = {}
    newList.forEach(zone => {
      newZones[zone.id] = zone
    })
    projectStore.currentProject.zones = { ...newZones }
    saveContent()
  }
})

const addNewZone = () => {
  if (!projectStore.currentProject) return

  const zoneName = prompt('Nom de la zone:')
  if (!zoneName) return

  const newZone = {
    id: 'custom_' + Date.now().toString(),
    name: zoneName,
    notes: '',
    checklist: []
  }

  projectStore.currentProject.zones = {
    ...projectStore.currentProject.zones,
    [newZone.id]: newZone
  }

  currentZone.value = newZone
  saveContent()
}

const deleteZone = (zone) => {
  if (!projectStore.currentProject || !zone) return

  if (staticZones.some(sz => sz.id === zone.id)) {
    alert('Les zones par défaut ne peuvent pas être supprimées')
    return
  }

  if (confirm(`Êtes-vous sûr de vouloir supprimer la zone "${zone.name}" ?`)) {
    const { [zone.id]: removed, ...remainingZones } = projectStore.currentProject.zones
    projectStore.currentProject.zones = { ...remainingZones }

    if (currentZone.value?.id === zone.id) {
      const firstZone = Object.values(remainingZones)[0]
      currentZone.value = firstZone || null
    }

    saveContent()
  }
}

const isStaticZone = (zoneId) => staticZones.some(sz => sz.id === zoneId)


const cleanupEditor = () => {
  if (easyMDE) {
    easyMDE.toTextArea()
    easyMDE = null
  }
}


const storeImage = async (file) => {
  try {
    const reader = new FileReader()
    return new Promise((resolve, reject) => {
      reader.onload = (e) => {
        const base64Data = e.target.result
        const imageName = `stored:img_${Date.now()}`
        localStorage.setItem(imageName, base64Data)
        resolve(imageName)
      }
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsDataURL(file)
    })
  } catch (error) {
    console.error('Error storing image:', error)
    throw error
  }
}

const replaceStoredImages = (content) => {
  if (!content) return ''
  return content.replace(/!\[([^\]]*)\]\(stored:([^)]+)\)/g, (match, alt, key) => {
    const imageData = localStorage.getItem(key)
    return imageData ? `![${alt}](${imageData})` : match
  })
}

const handleImagePaste = async (e) => {
  const items = (e.clipboardData || e.originalEvent.clipboardData).items
  for (const item of items) {
    if (item.type.indexOf('image') === 0) {
      e.preventDefault()
      const file = item.getAsFile()
      try {
        const imageName = await storeImage(file)
        const imageMarkdown = `![${file.name || 'Pasted image'}](stored:${imageName})`
        easyMDE.codemirror.replaceSelection(imageMarkdown)
        saveContent()
      } catch (error) {
        console.error('Error handling pasted image:', error)
      }
      break
    }
  }
}


const initializeEditor = () => {
  cleanupEditor()

  const editorElement = document.getElementById('editor')
  if (!editorElement) return

  const isDarkTheme = document.body.classList.contains('v-theme--dark')

  easyMDE = new EasyMDE({
    element: editorElement,
    autofocus: true,
    spellChecker: false,
    status: false,
    toolbar: [
      'bold', 'italic', 'heading',
      '|', 'quote', 'unordered-list', 'ordered-list',
      '|', 'link', 'image', 'table',
      '|', 'code', 'redo',
      '|', 'guide'
    ],
    previewRender: (plainText) => {
      const contentWithImages = replaceStoredImages(plainText)
      return marked(contentWithImages)
    }
  })


  if (isDarkTheme) {
    easyMDE.codemirror.setOption('theme', 'monokai')


    const cm = easyMDE.codemirror
    cm.getWrapperElement().style.setProperty('background-color', 'var(--v-theme-surface)', 'important')


    cm.setOption('styles', {
      '.CodeMirror': {
        'background-color': 'var(--v-theme-surface) !important',
        'color': '#FFFFFF !important'
      },
      '.CodeMirror-scroll': {
        'background-color': 'var(--v-theme-surface) !important'
      },
      '.CodeMirror pre': {
        'color': '#FFFFFF !important'
      },
      '.CodeMirror textarea': {
        'background-color': 'var(--v-theme-surface) !important',
        'color': '#FFFFFF !important'
      }
    })
  }

  if (currentZone.value?.notes) {
    easyMDE.value(currentZone.value.notes)
  }

  easyMDE.codemirror.on('change', () => {
    saveContent()
  })

  easyMDE.codemirror.on('paste', async (_, e) => {
    const items = (e.clipboardData || e.originalEvent.clipboardData).items
    for (const item of items) {
      if (item.type.indexOf('image') === 0) {
        e.preventDefault()
        const file = item.getAsFile()
        try {
          const imageName = await storeImage(file)
          const imageMarkdown = `![${file.name || 'Pasted image'}](stored:${imageName})`
          easyMDE.codemirror.replaceSelection(imageMarkdown)
          saveContent()
        } catch (error) {
          console.error('Error handling pasted image:', error)
        }
        break
      }
    }
  })
}

const getZoneIcon = (zoneName) => {
  switch (zoneName.toLowerCase()) {
    case 'recon': return 'mdi-magnify'
    case 'exploit': return 'mdi-bug'
    case 'privesc': return 'mdi-ladder'
    case 'flags': return 'mdi-flag'
    default: return 'mdi-note'
  }
}

function addChecklistItem() {
  if (currentZone.value) {
    const newItem = { text: '', checked: false }
    checklist.value = [...checklist.value, newItem]
    saveContent()
  }
}

function removeChecklistItem(index) {
  const newChecklist = checklist.value.filter((_, i) => i !== index)
  checklist.value = newChecklist
  saveContent()
}

const exportProject = () => {
  if (!projectStore.currentProject) {
    console.error('No project selected')
    return
  }

  try {

    const projectData = {
      ...projectStore.currentProject,
      zones: Object.values(projectStore.currentProject.zones || {}).map(zone => ({
        id: zone.id,
        name: zone.name,
        notes: zone.notes || '',
        checklist: zone.checklist || []
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

const exportToPdf = async () => {
  if (!projectStore.currentProject) return

  try {

    const wrapper = document.createElement('div')
    wrapper.style.backgroundColor = '#1a1f2c'
    wrapper.style.padding = '20px'
    wrapper.style.margin = '0'
    wrapper.style.position = 'relative'


    const content = document.createElement('div')
    content.className = 'pdf-content'
    content.style.color = '#FFFFFF'
    content.style.backgroundColor = '#1a1f2c'


    const title = document.createElement('h1')
    title.textContent = projectStore.currentProject.name
    title.style.fontSize = '28px'
    title.style.marginBottom = '30px'
    title.style.textAlign = 'center'
    title.style.color = '#ff3333'
    title.style.pageBreakAfter = 'avoid'
    title.style.textTransform = 'uppercase'
    title.style.letterSpacing = '2px'
    content.appendChild(title)


    for (const zone of Object.values(projectStore.currentProject.zones)) {

      const zoneTitle = document.createElement('h2')
      zoneTitle.textContent = zone.name
      zoneTitle.style.fontSize = '24px'
      zoneTitle.style.marginTop = '30px'
      zoneTitle.style.marginBottom = '20px'
      zoneTitle.style.color = '#FFFFFF'
      zoneTitle.style.padding = '10px'
      zoneTitle.style.border = '2px solid #FFFFFF'
      zoneTitle.style.borderRadius = '4px'
      zoneTitle.style.pageBreakAfter = 'avoid'
      content.appendChild(zoneTitle)


      if (zone.notes) {
        const notesDiv = document.createElement('div')
        notesDiv.style.color = '#FFFFFF'
        notesDiv.style.marginBottom = '20px'


        const notesWithImages = replaceStoredImages(zone.notes)


        const tempDiv = document.createElement('div')
        tempDiv.innerHTML = marked(notesWithImages)


        const allElements = tempDiv.getElementsByTagName('*')
        for (let i = 0; i < allElements.length; i++) {
          const el = allElements[i]
          el.style.color = '#FFFFFF'

          if (el.tagName === 'IMG') {
            el.style.maxWidth = '100%'
            el.style.height = 'auto'
            el.style.display = 'block'
            el.style.margin = '10px auto'
            el.style.pageBreakInside = 'avoid'
            el.style.maxHeight = '500px'
            el.style.objectFit = 'contain'
          }

          if (el.tagName === 'CODE' || el.tagName === 'PRE') {
            el.style.backgroundColor = '#2e3440'
            el.style.padding = '8px'
            el.style.borderRadius = '4px'
            el.style.fontFamily = 'Courier New, monospace'
            el.style.pageBreakInside = 'avoid'
          }
        }

        notesDiv.innerHTML = tempDiv.innerHTML
        content.appendChild(notesDiv)
      }


      if (zone.checklist?.length) {
        const checklistTitle = document.createElement('h3')
        checklistTitle.textContent = 'Checklist'
        checklistTitle.style.fontSize = '20px'
        checklistTitle.style.marginTop = '20px'
        checklistTitle.style.marginBottom = '15px'
        checklistTitle.style.color = '#FFFFFF'
        checklistTitle.style.pageBreakAfter = 'avoid'
        content.appendChild(checklistTitle)

        const list = document.createElement('ul')
        list.style.listStyleType = 'none'
        list.style.padding = '0'
        list.style.margin = '15px 0 25px'
        list.style.color = '#FFFFFF'

        zone.checklist.forEach(item => {
          const li = document.createElement('li')
          li.style.color = '#FFFFFF'
          li.style.marginBottom = '8px'
          li.style.display = 'flex'
          li.style.alignItems = 'center'
          li.innerHTML = `
            <span style="margin-right: 10px; font-size: 1.2em;">
              ${item.checked ? '✓' : '☐'}
            </span>
            <span style="flex: 1;">${item.text}</span>
          `
          list.appendChild(li)
        })

        content.appendChild(list)
      }


      if (zone !== Object.values(projectStore.currentProject.zones).slice(-1)[0]) {
        const separator = document.createElement('hr')
        separator.style.border = 'none'
        separator.style.margin = '30px 0'
        content.appendChild(separator)
      }
    }

    wrapper.appendChild(content)


    const opt = {
      margin: 0,
      filename: `${projectStore.currentProject.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`,
      image: {
        type: 'jpeg',
        quality: 0.98
      },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: true,
        backgroundColor: '#0b1b23'
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait',
        compress: true
      },
      pagebreak: { mode: 'avoid-all' }
    }


    await html2pdf().set(opt).from(wrapper).save()

  } catch (error) {
    console.error('Error exporting to PDF:', error)
  }
}

const insertImage = async (file) => {
  if (easyMDE && file) {
    try {
      const imageName = await storeImage(file)
      const imageMarkdown = `![${file.name || 'Image'}](stored:${imageName})`
      easyMDE.codemirror.replaceSelection(imageMarkdown)
      saveContent()
    } catch (error) {
      console.error('Error inserting image:', error)
    }
  }
}


onBeforeUnmount(() => {
  cleanupEditor()
})


onMounted(() => {
  if (projectStore.currentProject) {
    const zones = { ...projectStore.currentProject.zones }
    let modified = false

    staticZones.forEach(zone => {
      if (!zones[zone.id]) {
        zones[zone.id] = { ...zone }
        modified = true
      }
    })

    if (modified) {
      projectStore.currentProject.zones = { ...zones }
      saveContent()
    }


    if (!currentZone.value && Object.keys(zones).length > 0) {
      currentZone.value = Object.values(zones)[0]
    }
  }
})
</script>

<style>
/* Styles globaux pour EasyMDE */
.EasyMDEContainer {
  display: flex !important;
  flex-direction: column !important;
  height: 100% !important;
  width: 100% !important;
  min-height: 0 !important;
}

.EasyMDEContainer .CodeMirror {
  flex: 1 1 auto !important;
  height: auto !important;
  min-height: 0 !important;
}

.EasyMDEContainer .editor-toolbar {
  flex: 0 0 auto !important;
  border: none !important;
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity)) !important;
  background-color: var(--v-theme-surface);
}

.editor-preview-side {
  display: none !important;
}

.CodeMirror-scroll {
  min-height: 0 !important;
  height: 100% !important;
}

/* Styles pour le thème sombre */
:deep(.v-theme--dark) .editor-wrapper .CodeMirror {
  background-color: var(--v-theme-surface) !important;
  color: #FFFFFF !important;
}

:deep(.v-theme--dark) .editor-wrapper .CodeMirror-cursor {
  border-left-color: #FFFFFF !important;
}

:deep(.v-theme--dark) .editor-wrapper .CodeMirror-selected {
  background-color: rgba(255, 255, 255, 0.2) !important;
}

:deep(.v-theme--dark) .editor-wrapper .editor-preview {
  background-color: var(--v-theme-surface) !important;
  color: #FFFFFF !important;
}

:deep(.v-theme--dark) .editor-wrapper .editor-toolbar button {
  color: #FFFFFF !important;
}

:deep(.v-theme--dark) .editor-wrapper .editor-toolbar button:hover,
:deep(.v-theme--dark) .editor-wrapper .editor-toolbar button.active {
  background-color: var(--v-theme-surface-variant);
  border-color: rgba(var(--v-border-color), var(--v-border-opacity));
}

/* Styles pour le thème clair */
:deep(.v-theme--light) .editor-wrapper .CodeMirror {
  background-color: #FFFFFF;
  color: #000000;
}

:deep(.v-theme--light) .editor-wrapper .CodeMirror-cursor {
  border-left: 2px solid black;
}

:deep(.v-theme--light) .editor-wrapper .CodeMirror-selected {
  background: rgba(0, 0, 0, 0.1);
}

:deep(.v-theme--light) .editor-wrapper .editor-preview {
  background-color: #FFFFFF;
  color: #000000;
}

:deep(.v-theme--light) .editor-wrapper .editor-toolbar button {
  color: #000000 !important;
}

:deep(.v-theme--light) .editor-wrapper .editor-toolbar button:hover,
:deep(.v-theme--light) .editor-wrapper .editor-toolbar button.active {
  background-color: #f0f0f0;
  border-color: #ddd;
}

.editor-wrapper :deep(.editor-toolbar) {
  background-color: var(--v-theme-surface);
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-bottom: none;
  border-radius: 4px;
}

.editor-wrapper :deep(.editor-toolbar i.separator) {
  border-left: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-right: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.toolbar {
  padding: 8px;
  display: flex;
  gap: 8px;
  align-items: center;
  background-color: var(--v-theme-surface);
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

/* Styles pour le PDF */
.pdf-content {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #FFFFFF;
  max-width: 210mm;
  /* Largeur A4 */
  margin: 0 auto;
  padding: 20px;
  background-color: #1a1f2c;
}

.pdf-content h1 {
  font-size: 28px;
  margin-bottom: 30px;
  text-align: center;
  color: #ff3333;
  page-break-after: avoid;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.pdf-content h2 {
  font-size: 24px;
  margin-top: 30px;
  margin-bottom: 20px;
  color: #FFFFFF;
  padding: 10px;
  border: 2px solid #FFFFFF;
  border-radius: 4px;
  page-break-after: avoid;
}

.pdf-content h3 {
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 15px;
  color: #FFFFFF;
  page-break-after: avoid;
}

.pdf-content .zone-content {
  margin-bottom: 20px;
  color: #FFFFFF;
}

.pdf-content pre {
  background-color: #2a2f3c;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  margin: 10px 0;
  page-break-inside: avoid;
  white-space: pre-wrap;
  color: #FFFFFF;
}

.pdf-content code {
  font-family: 'Courier New', monospace;
  background-color: #2a2f3c;
  padding: 2px 4px;
  border-radius: 2px;
  color: #FFFFFF;
}

.checklist {
  list-style-type: none;
  padding-left: 20px;
  margin: 15px 0 25px;
  color: #FFFFFF;
}

.checklist li {
  margin-bottom: 8px;
  page-break-inside: avoid;
  color: #FFFFFF;
}

.page-break {
  page-break-after: always;
  height: 0;
}

@media print {
  .page-break {
    height: 0;
    page-break-after: always;
  }
}

.zone-nav {
  min-width: 200px !important;
  max-width: 300px !important;
}

.fill-height {
  flex: 1;
  min-height: 0;
}

.border-b {
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.border-r {
  border-right: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.editor-layout {
  display: flex;
  height: 100%;
  width: 100%;
  min-height: 0;
  gap: 16px;
}

.editor-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  border-right: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.editor-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  background-color: var(--v-theme-surface);
  border-radius: 4px;
}

.preview-zone {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background-color: var(--v-theme-surface);
  border-radius: 4px;
}

.preview-content img {
  max-width: 100%;
  height: auto;
}

.checklist-container {
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.checklist-list {
  max-height: 200px;
  overflow-y: auto;
}

.checklist-item {
  padding: 4px !important;
}

.checklist-input {
  padding-top: 0 !important;
  margin-top: 0 !important;
}

.checklist-input :deep(.v-field__input) {
  min-height: 32px !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.zone-checklist {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.zone-checklist ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.zone-checklist li {
  padding: 0.25rem 0;
}

.zone-section {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 4px;
}

.zone-title {
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(var(--v-border-color), var(--v-border-opacity));
  font-size: 1.5rem;
  font-weight: bold;
}

.zone-content {
  min-height: 50px;
}
</style>
