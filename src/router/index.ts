// Composables
import { createRouter, createWebHistory, useRoute } from 'vue-router'

// const test = {
//   template: () => import('@/components/routeTesr.vue'),
// };

const routes = [
  {
    path: '/',
    component: () => import('@/components/MovieCard.vue'),
  //   children: [
  //     {
  //       path: '',
  //       name: 'Home',
  //       // route level code-splitting
  //       // this generates a separate chunk (about.[hash].js) for this route
  //       // which is lazy-loaded when the route is visited.
  //       component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  //     },
  //   ],
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
