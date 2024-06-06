<script lang="ts" setup>
import type { Link } from '@/interfaces/link'
import CollapsibleMenu from '@components/collapsible-menu/CollapsibleMenu.vue'
import { openBurgerStore } from '@/stores/openBurgerStore'
import { storeToRefs } from 'pinia'
import { categoriesStore } from '@/stores/categoriesStore'
import { ALL_PRODUCTS } from '@/constants/constants'

const store = openBurgerStore()

const { infoLinks, accountMenu } = defineProps<{
  infoLinks: Link[]
  accountMenu: Link[]
}>()

const { categoriesLinks } = storeToRefs(categoriesStore())
const allCategoriesLinks = [ALL_PRODUCTS, ...categoriesLinks.value]
</script>

<template>
  <v-navigation-drawer v-model="store.isOpenBurger" disable-resize-watcher>
    <v-list class="nav-list">
      <v-list-item v-for="link in infoLinks" :key="link.href" :to="link.href" variant="plain">{{
        link.name
      }}</v-list-item>
    </v-list>

    <CollapsibleMenu menuTriggerText="Catalog" :itemsWithSubItems="allCategoriesLinks" />

    <v-list class="nav-list-login">
      <v-list-item v-for="item in accountMenu" :key="item.href" :to="item.href" variant="plain">{{
        item.name
      }}</v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
@use '@styles/constants.scss';

.v-list {
  padding: 0;
}

.v-navigation-drawer {
  background-color: constants.$color-background-light;
  background-image: url('@assets/images/texture.png');
  background-size: 35%;
}

.nav-list-catalog {
  padding-left: 20px;
}

.v-list-item--density-default.v-list-item--one-line {
  padding: 1rem 2rem;
  color: constants.$color-text-dark;
}

.nav-list-login {
  display: flex;
  margin-top: 40px;
}
</style>
