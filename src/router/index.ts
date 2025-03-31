import { createRouter, createWebHistory } from 'vue-router'
import IconsPage from '../views/IconsPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'icons',
      component: IconsPage
    }
  ]
})

export default router
