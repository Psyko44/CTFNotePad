<template>
  <div class="d-flex flex-column fill-height">
    <v-toolbar density="compact" flat class="border-b">
      <v-toolbar-title class="text-error font-weight-bold">Checklists prédéfinies</v-toolbar-title>
      <v-toolbar-title class="text-error font-weight-bold">Sélectionner une zone avant de générer la checklist</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            color="error"
            v-bind="props"
            variant="outlined"
            class="font-weight-bold"
          >
            {{ selectedZone ? availableZones.find(z => z.id === selectedZone)?.name : 'Sélectionner une zone' }}
            <v-icon right>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list bg-color="grey-darken-3">
          <v-list-item
            v-for="zone in availableZones"
            :key="zone.id"
            :value="zone.id"
            @click="selectedZone = zone.id"
          >
            <v-list-item-title :class="{'text-error': selectedZone === zone.id}">
              {{ zone.name }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>

    <div class="d-flex flex-wrap pa-4 gap-4">
      <!-- Cards pour chaque type de checklist -->
      <v-card v-for="type in checklistTypes" :key="type" width="300" class="checklist-card">
        <v-card-title class="text-capitalize">
          {{ getChecklist(type).name }}
        </v-card-title>

        <v-card-text>
          <v-expansion-panels>
            <v-expansion-panel v-for="(section, index) in getChecklist(type).items" :key="index">
              <v-expansion-panel-title style="color: #ffffff;">{{ section.text }}</v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-list density="compact">
                  <v-list-item v-for="(item, itemIndex) in section.items" :key="itemIndex">
                    <v-list-item-title style="color: #FFFFFF;">{{ item }}</v-list-item-title>
                    <template v-slot:append>
                      <v-btn icon="mdi-plus" size="small" variant="text"
                            @click="addToChecklist(item)"
                            :disabled="!selectedZone">
                      </v-btn>
                    </template>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>

        <v-card-actions>
          <v-btn block color="primary" @click="addAllToChecklist(type)" :disabled="!selectedZone">
            Ajouter toute la checklist
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useChecklistStore } from '@/stores/checklists'
import { useProjectStore } from '@/stores/project'

const checklistStore = useChecklistStore()
const projectStore = useProjectStore()

const selectedZone = ref(null)
const checklistTypes = computed(() => checklistStore.getAllTypes())
const getChecklist = (type) => checklistStore.getChecklist(type)

const availableZones = computed(() => {
  if (!projectStore.currentProject) return []
  return Object.entries(projectStore.currentProject.zones).map(([key, zone]) => ({
    id: key,  // Utiliser la clé comme ID au lieu de zone.id
    name: zone.name
  }))
})

const addToChecklist = (item) => {
  if (!selectedZone.value) {
    alert('Veuillez sélectionner une zone')
    return
  }

  projectStore.addChecklistItem({
    text: item,
    checked: false
  }, selectedZone.value)
}

const addAllToChecklist = (type) => {
  if (!selectedZone.value) {
    alert('Veuillez sélectionner une zone')
    return
  }

  const checklist = getChecklist(type)
  checklist.items.forEach(section => {
    section.items.forEach(item => {
      projectStore.addChecklistItem({
        text: item,
        checked: false
      }, selectedZone.value)
    })
  })
}

</script>

<style scoped>
.checklist-card {
  transition: transform 0.2s;

}
.checklist-card:hover {
  transform: translateY(-2px);
}

/* Ajout des styles pour les titres */
:deep(.v-list-item-title) {
  white-space: normal !important;
  overflow: visible !important;
  text-overflow: unset !important;
  word-wrap: break-word !important;
  color: #FFFFFF;
}

:deep(.v-expansion-panel-title) {
  white-space: normal !important;
  min-height: unset !important;
  padding: 8px 16px !important;
  color: #FF5252;
}

:deep(.v-expansion-panel-text__wrapper) {
  padding: 8px !important;
}

:deep(.v-list-item) {
  min-height: unset !important;
  padding: 4px 8px !important;
}
</style>
