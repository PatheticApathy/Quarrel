import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/welcome',
      name: 'IntroView',
      component: () => import('../views/IntroView.vue')
    },
    {
      path: '/',
      name: 'navbar',
      component: () => import('../views/NavBarView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/explore',
      name: 'explore',
      component: () => import('../views/ExploreView.vue')
    },
    {
      path: '/messages',
      name: 'messages',
      component: () => import('../views/MessagesView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/LoginView.vue')
    },
    {
      path: '/edit-profile',
      name: 'edit profile',
      component: () => import('../views/EditProfileView.vue')
    }
  ]
})

export default router
