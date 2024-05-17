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
      component: () => import('@pages/Cart.vue'),
    },
    { path: '/:pathMatch(.*)*', component: () => import('@pages/404Page.vue') },
  ],
})

export default router
