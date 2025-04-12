<template>
  <component :is="currentComponent" />
</template>

<script setup>
import { computed } from 'vue'
import { useThemeStore } from '../stores/theme'
import TechniquesView from '../views/TechniquesView.vue'
import TechniqueOsintView from '../views/TechniqueOsintView.vue'

const themeStore = useThemeStore()
const currentComponent = computed(() => 
  themeStore.mode === 'osint' ? TechniqueOsintView : TechniquesView
)
</script>
