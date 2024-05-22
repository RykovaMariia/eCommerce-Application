import { userAuth } from '@/stores/userAuth'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@pages/MainPage.vue'),
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@pages/MainPage.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@pages/LoginPage/LoginPage.vue'),
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('@pages/RegistrationPage/RegistrationPage.vue'),
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: () => import('@pages/CatalogPage.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@pages/AboutPage.vue'),
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('@pages/FavoritesPage.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@pages/CartPage.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@pages/ProfilePage.vue'),
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => null,
    },
    { path: '/:pathMatch(.*)*', component: () => import('@pages/404Page.vue') },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login' && userAuth().isLoggedIn) {
    next({ name: 'main', replace: true })
  } else if (to.name === 'registration' && userAuth().isLoggedIn) {
    next({ name: 'main', replace: true })
  } else if (to.name === 'logout' && userAuth().isLoggedIn) {
    userAuth().logout()
    next({ name: 'main' })
  } else if (to.name === 'profile' && !userAuth().isLoggedIn) {
    next({ name: 'login', replace: true })
  } else next()
})

export default router
