import { useUserAuthStore } from '@/stores/userAuth'
import { createRouter, createWebHistory, type RouteLocationNormalizedLoaded } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@pages/MainPage/MainPage.vue'),
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@pages/MainPage/MainPage.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@pages/LoginPage/LoginPage.vue'),
      meta: { breadcrumb: 'Login' },
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('@pages/RegistrationPage/RegistrationPage.vue'),
      meta: { breadcrumb: 'Registration' },
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: () => import('@pages/CatalogPage/CatalogPage.vue'),
      meta: { breadcrumb: 'Catalog' },
      children: [
        {
          path: ':categoryId',
          name: 'category',
          component: () => import('@pages/CatalogPage/CatalogPage.vue'),
          props: true,
          meta: {
            breadcrumb: (route: RouteLocationNormalizedLoaded) => route.params.categoryId,
          },

          children: [
            {
              path: ':subCategoryId',
              name: 'subCategory',
              component: () => import('@pages/CatalogPage/CatalogPage.vue'),
              props: true,
              meta: {
                breadcrumb: (route: RouteLocationNormalizedLoaded) => route.params.subCategoryId,
              },
            },
          ],
        },
      ],
    },

    {
      path: '/product/:productId',
      name: 'productId',
      component: () => import('@pages/ProductPage/ProductPage.vue'),
      meta: {
        breadcrumb: (route: RouteLocationNormalizedLoaded) => route.params.productId,
      },
    },

    {
      path: '/about',
      name: 'about',
      component: () => import('@pages/AboutUsPage/AboutPage.vue'),
      meta: { breadcrumb: 'About us' },
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('@pages/FavoritesPage/FavoritesPage.vue'),
      meta: { breadcrumb: 'Favorites' },
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@pages/CartPage/CartPage.vue'),
      meta: { breadcrumb: 'Cart' },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@pages/ProfilePage/ProfilePage.vue'),
      meta: { breadcrumb: 'Profile' },
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => null,
    },
    { path: '/:pathMatch(.*)*', component: () => import('@pages/404Page/404Page.vue') },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login' && useUserAuthStore().isLoggedIn) {
    next({ name: 'main', replace: true })
  } else if (to.name === 'registration' && useUserAuthStore().isLoggedIn) {
    next({ name: 'main', replace: true })
  } else if (to.name === 'logout' && useUserAuthStore().isLoggedIn) {
    useUserAuthStore().logout()

    next({ name: 'main' })
  } else if (to.name === 'profile' && !useUserAuthStore().isLoggedIn) {
    next({ name: 'login', replace: true })
  } else {
    next()
  }
})

export default router
