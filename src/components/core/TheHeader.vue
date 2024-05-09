<script lang="ts" setup>
import HoverMenu from '../hover-menu/HoverMenu.vue'
import IconLogo from '../icons/IconLogo.vue'

const accountMenu = [
  { text: 'Login', href: '/login' },
  { text: 'Register', href: '/register' },
]

const infoReference = [
  { text: 'About us', href: '/about' },
  { text: 'Contacts', href: '/' },
]

const catalogMenu = [
  { text: 'Organic cosmetic', href: '/catalog' },
  { text: 'Hygiene products', href: '/catalog' },
  { text: 'Shoppers', href: '/catalog' },
  { text: 'Eco dishes', href: '/catalog' },
  { text: 'Gift sets', href: '/catalog' },
]
</script>

<template>
  <v-toolbar class="toolbar">
    <HoverMenu :menu-items="catalogMenu" menu-trigger-text="Catalog" />

    <v-list class="nav-list">
      <v-list-item v-for="item in infoReference" :key="item.href"
        ><a :href="item.href">{{ item.text }}</a></v-list-item
      >
    </v-list>

    <v-spacer></v-spacer>
    <IconLogo />
    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-heart-outline</v-icon>
    </v-btn>

    <HoverMenu :menu-items="accountMenu" menu-trigger-icon="mdi-account-outline" />

    <v-btn icon>
      <v-icon>mdi-basket-outline</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<style lang="scss" scoped>
@use '../../styles/constants.scss';

.toolbar {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: constants.$color-opacity;
  border-bottom: 2px solid constants.$color-primary;
}

:deep(.v-toolbar__content) {
  overflow: visible;
  height: 100px !important;
  padding: 0 10px 0 20px;
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
  gap: 20px;

  padding: 0;

  font-size: 1rem;

  background-color: constants.$color-opacity;

  .v-list-item {
    padding: 0;
  }
}
</style>
