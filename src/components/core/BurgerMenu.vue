<script lang="ts" setup>
import CollapsibleMenu from '../collapsible-menu/CollapsibleMenu.vue'
import { openBurgerStore } from '@/stores/counter'

export interface Link {
  text: string
  href: string
}

const store = openBurgerStore()

const { catalogMenu, infoReference, accountMenu } = defineProps<{
  catalogMenu: Link[]
  infoReference: Link[]
  accountMenu: Link[]
}>()
</script>

<template>
  <v-navigation-drawer v-model="store.isOpenBurger">
    <v-list class="nav-list">
      <v-list-item v-for="item in infoReference" :key="item.href" :to="item.href" variant="plain">{{
        item.text
      }}</v-list-item>
    </v-list>

    <CollapsibleMenu title="Catalog" :items="catalogMenu" />

    <v-list class="nav-list-login">
      <v-list-item v-for="item in accountMenu" :key="item.href" :to="item.href" variant="plain">{{
        item.text
      }}</v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
@use '../../styles/constants.scss';

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
  margin-top: 40px;
  display: flex;
}
</style>
