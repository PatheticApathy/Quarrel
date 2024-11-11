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
      path: '/create',
      name: 'create',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
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
    }
  ]
})

export default router
