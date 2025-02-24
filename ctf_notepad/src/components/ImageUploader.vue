<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ props }">
        <v-btn
          prepend-icon="mdi-image-plus"
          variant="text"
          v-bind="props"
        >
          Upload Image
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Upload Image</v-card-title>
        <v-card-text>
          <div
            class="upload-zone pa-4 rounded-lg text-center"
            :class="{ 'dragover': isDragover }"
            @dragover.prevent="isDragover = true"
            @dragleave.prevent="isDragover = false"
            @drop.prevent="handleDrop"
            @click="triggerFileInput"
          >
            <v-icon size="48" color="primary" icon="mdi-cloud-upload"></v-icon>
            <div class="text-body-1 mt-2">
              Drag and drop an image here or click to select
            </div>
          </div>
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            style="display: none"
            @change="handleFileSelect"
          >
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['image-selected'])
const dialog = ref(false)
const isDragover = ref(false)
const fileInput = ref(null)

const handleImage = (file) => {
  if (file && file.type.startsWith('image/')) {
    emit('image-selected', file)
    dialog.value = false
  }
}

const handleDrop = (e) => {
  isDragover.value = false
  const file = e.dataTransfer.files[0]
  handleImage(file)
}

const handleFileSelect = (e) => {
  const file = e.target.files[0]
  handleImage(file)
}

const triggerFileInput = () => {
  fileInput.value.click()
}
</script>

<style scoped>
.upload-zone {
  border: 2px dashed var(--v-border-color);
  cursor: pointer;
  transition: all 0.3s ease;
}

.upload-zone:hover {
  border-color: var(--v-primary-base);
  background-color: var(--v-surface-variant-base);
}

.upload-zone.dragover {
  border-color: var(--v-primary-base);
  background-color: var(--v-surface-variant-base);
}
</style>
