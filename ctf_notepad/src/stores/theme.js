import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const mode = ref('ctf') // 'ctf' ou 'osint'

  // Mettre à jour le thème quand le mode change
  watch(mode, (newMode) => {
    document.documentElement.setAttribute('data-mode', newMode)
  }, { immediate: true })

  // Charger le mode sauvegardé
  const savedMode = localStorage.getItem('app_mode')
  if (savedMode) {
    mode.value = savedMode
  }

  // Changer le mode
  function toggleMode() {
    mode.value = mode.value === 'ctf' ? 'osint' : 'ctf'
    localStorage.setItem('app_mode', mode.value)
  }

  return {
    mode,
    toggleMode
  }
})
