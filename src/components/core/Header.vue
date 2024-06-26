<script lang="ts" setup>
import HoverMenu from '@components/hover-menu/HoverMenu.vue'
import IconLogo from '@components/icons/IconLogo.vue'
import BurgerMenu from '@components/core/BurgerMenu.vue'
import { useBurgerStore } from '@/stores/burger'
import { useUserAuthStore } from '@/stores/userAuth'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCategoriesStore } from '@/stores/categories'
import { categoryService } from '@/services/categoriesService'
import { useCartStore } from '@/stores/cart'
import { useAlertStore } from '@/stores/alert'

const userLinks = [
  { name: 'Profile', href: '/profile' },
  { name: 'Logout', href: '/logout' },
]

const authLinks = [
  { name: 'Login', href: '/login' },
  { name: 'Register', href: '/registration' },
] as const

const infoLinks = [{ name: 'About us', href: '/about' }] as const

const store = useBurgerStore()
const categoriesStore = useCategoriesStore()

const { isLoggedIn } = storeToRefs(useUserAuthStore())
const { cart } = storeToRefs(useCartStore())
const { categoriesLinks } = storeToRefs(categoriesStore)

const countProduct = computed(() => {
  return cart.value?.totalLineItemQuantity ?? 0
})

const accountMenu = computed(() => {
  if (isLoggedIn.value) {
    return userLinks
  }
  return authLinks
})

function openBurger() {
  store.toggleOpenState()
}

categoryService
  .getCategories()
  .then((value) => categoriesStore.setCategories(value))
  .catch((error: Error) => {
    useAlertStore().show(error.message, 'warning')
  })
</script>

<template>
  <v-app-bar class="toolbar" scroll-behavior="hide" flat height="100">
    <v-app-bar-nav-icon
      color="primary"
      v-if="$vuetify.display.mdAndDown"
      variant="text"
      @click="openBurger"
    ></v-app-bar-nav-icon>
    <HoverMenu
      v-if="$vuetify.display.lgAndUp"
      :menuItemsWithSubItems="categoriesLinks"
      menu-trigger-text="Catalog"
    />
    <v-list v-if="$vuetify.display.lgAndUp" class="nav-list">
      <v-list-item v-for="item in infoLinks" :key="item.href"
        ><RouterLink :to="item.href">{{ item.name }}</RouterLink></v-list-item
      >
    </v-list>

    <v-spacer></v-spacer>

    <RouterLink to="/main"><IconLogo :isWithText="true" /></RouterLink>

    <v-spacer></v-spacer>

    <v-btn icon to="/favorites" class="favorites">
      <v-icon>mdi-heart-outline</v-icon>
    </v-btn>

    <HoverMenu
      v-if="$vuetify.display.lgAndUp"
      :menu-items="accountMenu"
      menu-trigger-icon="mdi-account-outline"
    />

    <v-btn icon to="/cart">
      <v-badge
        v-if="countProduct > 0"
        color="secondary"
        :content="countProduct"
        offset-x="1"
        offset-y="-4"
        max="99"
      >
        <v-icon>mdi-basket-outline</v-icon>
      </v-badge>
      <v-icon v-else>mdi-basket-outline</v-icon>
    </v-btn>
  </v-app-bar>

  <BurgerMenu :account-menu="accountMenu" :info-links="infoLinks" />
</template>

<style lang="scss" scoped>
@use '@styles/constants.scss';

.v-app-bar.toolbar {
  padding: 0 2rem;
  background-image: url('@assets/images/texture.png');
  background-size: 35%;
  border-bottom: 1px solid constants.$color-primary;
}

.mdi-magnify,
.mdi-account-outline,
.mdi-heart-outline,
.mdi-menu-down,
.mdi-basket-outline {
  color: constants.$color-primary;
}

.button_register {
  background-color: constants.$color-secondary;
}

.nav-list {
  display: flex;
  gap: 3rem;

  padding-left: 3rem;

  font-size: 1rem;

  background-color: constants.$color-opacity;

  .v-list-item {
    padding: 0;
  }
}

::v-deep(.v-btn__overlay) {
  display: none;
}
</style>
