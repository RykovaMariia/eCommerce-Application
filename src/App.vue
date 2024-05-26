<script setup lang="ts">
import Header from '@components/core/Header.vue'
import Footer from '@components/core/Footer.vue'
import { alertStore } from '@/stores/alertStore'
import { storeToRefs } from 'pinia'
import AlertWindow from '@components/alertWindow/AlertWindow.vue'
import { productService } from './services/productService'
const { isOpenAlert } = storeToRefs(alertStore())
productService.getProduct();
</script>

<template>
  <v-app>
    <Header />
    <v-main>
      <RouterView />
    </v-main>
    <Footer />
    <AlertWindow v-if="isOpenAlert" />
  </v-app>
</template>

<style lang="scss" scoped>
@use '@styles/constants.scss';
@use '@styles/mixins.scss';

header {
  @include mixins.media-tablet {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
  max-width: 1440px;
  margin: auto;
}

header .wrapper {
  @include mixins.media-tablet {
    display: flex;
    flex-wrap: wrap;
    place-items: flex-start;
  }
}

.logo {
  @include mixins.media-tablet {
    margin: 0 2rem 0 0;
  }
  display: block;
  margin: 0 auto 2rem;
}

nav {
  @include mixins.media-tablet {
    margin-top: 1rem;
    margin-left: -1rem;
    padding: 1rem 0;

    font-size: 1rem;
    text-align: left;
  }
  width: 100%;
  margin-top: 2rem;
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: constants.$color-text-dark;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
