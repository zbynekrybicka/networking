import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TemataView from '../views/TemataView.vue'
import KontaktyView from '../views/KontaktyView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/temata/:id?',
    name: 'temataView',
    component: TemataView,
  },
  {
    path: '/kontakty/:id?',
    name: 'kontaktyView',
    component: KontaktyView,
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
