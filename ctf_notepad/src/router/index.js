import { createRouter, createWebHistory } from 'vue-router'
import EditorView from '@/views/EditorView.vue'
import TechniquesView from '../views/TechniquesView.vue'
import PrivEscView from '../views/PrivEscView.vue'
import ShellsView from '../views/ShellsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/editor'
    },
    {
      path: '/editor',
      name: 'editor',
      component: EditorView
    },
    {
      path: '/techniques',
      name: 'techniques',
      component: TechniquesView
    },
    {
      path: '/privesc',
      name: 'privesc',
      component: PrivEscView
    },
    {
      path: '/shells',
      name: 'shells',
      component: ShellsView
    }
  ]
})

export default router
