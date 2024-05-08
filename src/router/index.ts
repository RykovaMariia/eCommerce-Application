import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('@pages/MainPage.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@pages/LoginPage.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@pages/RegisterPage.vue'),
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: () => import('@pages/CatalogPage.vue'),
    },
    {
      path: '/about',
      name: 'catalog',
      component: () => import('@pages/AboutPage.vue'),
    },
  ],
})

export default router
