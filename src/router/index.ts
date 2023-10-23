// Composables
import { createRouter, createWebHistory, useRoute } from 'vue-router'

// const test = {
//   template: () => import('@/components/routeTesr.vue'),
// };

const routes = [
  {
    path: '/',
    component: () => import('@/components/MovieCard.vue'),
  },
  {
    path: '/test/:id',
    name: 'movies',
    component: () => import('@/components/routeTesr.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
