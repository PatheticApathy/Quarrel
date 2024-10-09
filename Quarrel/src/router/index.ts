import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', 
      redirect: '/welcome' 
    },
    {
      path: '/welcome',
      name: 'IntroView',
      component: () => import('../views/IntroView.vue') 
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/LoginView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView 
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue') 
    }
  ]
})

export default router
