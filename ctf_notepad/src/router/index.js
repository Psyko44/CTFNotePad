import { createRouter, createWebHistory } from 'vue-router'
import EditorView from '@/views/EditorView.vue'
import HomeView from '@/views/HomeView.vue'
import TechniquesView from '../views/TechniquesView.vue'
import PrivEscView from '../views/PrivEscView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
      path: '/checklists',
      name: 'checklists',
      component: () => import('../views/ChecklistsView.vue')
    }
  ]
})

export default router
