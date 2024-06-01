<script lang="ts" setup>
import HoverMenu from '@components/hover-menu/HoverMenu.vue'
import IconLogo from '@components/icons/IconLogo.vue'
import BurgerMenu from './BurgerMenu.vue'
import { openBurgerStore } from '@/stores/openBurgerStore'
import { userAuth } from '@/stores/userAuth'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { CATALOG_MENU } from '@/constants/constants'
import { getCategories } from '@/utils/getCategories'
import { categoriesStore } from '@/stores/categoriesStore'

const store = openBurgerStore()
const { isLoggedIn } = storeToRefs(userAuth())

const userLinks = [
  { name: 'Profile', href: '/profile' },
  { name: 'Logout', href: '/logout' },
]

const authLinks = [
  { name: 'Login', href: '/login' },
  { name: 'Register', href: '/registration' },
]

const accountMenu = computed(() => {
  if (isLoggedIn.value) {
    return userLinks
  }
  return authLinks
})

const infoLinks = [{ name: 'About us', href: '/about' }]

function openBurger() {
  store.toggleOpenState()
}

getCategories()
  .then((value) => categoriesStore().setCategories(value))
  .then(() => categoriesStore().getCategoriesLink())

const { categoriesLink } = storeToRefs(categoriesStore())
</script>

<template>
  <v-app-bar class="toolbar" scroll-behavior="hide" flat height="100">
    <v-app-bar-nav-icon
      color="primary"
      v-if="$vuetify.display.mdAndDown"
      variant="text"
      @click="openBurger"
    ></v-app-bar-nav-icon>
    <template v-if="categoriesLink.length">
      <HoverMenu
        v-if="$vuetify.display.lgAndUp"
        :menu-items="categoriesLink"
        menu-trigger-text="Catalog"
      />
    </template>
    <v-list v-if="$vuetify.display.lgAndUp" class="nav-list">
      <v-list-item v-for="item in infoLinks" :key="item.href"
        ><RouterLink :to="item.href">{{ item.name }}</RouterLink></v-list-item
      >
    </v-list>

    <v-spacer></v-spacer>

    <RouterLink to="/main"><IconLogo /></RouterLink>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon to="/favorites" class="favorites">
      <v-icon>mdi-heart-outline</v-icon>
    </v-btn>

    <HoverMenu
      v-if="$vuetify.display.lgAndUp"
      :menu-items="accountMenu"
      menu-trigger-icon="mdi-account-outline"
    />

    <v-btn icon to="/cart">
      <v-icon>mdi-basket-outline</v-icon>
    </v-btn>
  </v-app-bar>

  <BurgerMenu :account-menu="accountMenu" :catalog-menu="CATALOG_MENU" :info-links="infoLinks" />
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
</style>
