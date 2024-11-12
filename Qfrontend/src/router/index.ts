import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Replies from '../views/Replies.vue'

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
      path: '/create',
      name: 'create',
      component: () => import('../views/Create.vue')
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
      path: '/profile/:id',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/edit-profile',
      name: 'edit profile',
      component: () => import('../views/EditProfileView.vue')
    },
    {
      path: '/followers/:id',
      name: 'followers',
      component: () => import('../views/FollowersView.vue')
    },
    {
      path: '/following/:id',
      name: 'following',
      component: () => import('../views/FollowingView.vue')
    },
    {
      path: '/search/:query',
      name: 'search',
      component: () => import('../views/SearchView.vue')
    },
    {
      path: '/replies/:type/:id',
      name: 'replies',
      component: Replies
    }
  ]
})

export default router
