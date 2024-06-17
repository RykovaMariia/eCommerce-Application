<script setup lang="ts">
import Header from '@components/core/Header.vue'
import Footer from '@components/core/Footer.vue'
import Breadcrumbs from '@/components/breadcrumbs/Breadcrumbs.vue'
import { useAlertStore } from '@/stores/alert'
import { storeToRefs } from 'pinia'
import AlertWindow from '@components/alertWindow/AlertWindow.vue'
import { customerService } from './services/customerService'
import { useUserAuthStore } from './stores/userAuth'
import router from './router'
import { cartService } from './services/cartService'
import { localStorageService } from './services/storageService'
import { favoritesService } from './services/favoritesService'
const { isOpenAlert } = storeToRefs(useAlertStore())

const alert = useAlertStore()

const refreshToken = localStorageService.getData('token')?.refreshToken ?? ''
const TOKEN_ERROR_MESSAGE = 'The refresh token was not found'

if (refreshToken) {
  customerService.user().catch((error: Error) => {
    if (!error.message.includes(TOKEN_ERROR_MESSAGE)) {
      return
    }
    alert.show(`Error: The token has expired. Please re-authorize`, 'warning')
    useUserAuthStore().logout()
    router.replace({ name: 'login' })
  })
}

cartService.setAnonymousSession()
favoritesService.setAnonymousSession()
</script>

<template>
  <v-app>
    <Header />
    <v-main>
      <Breadcrumbs />
      <div class="content-wrapper">
      <RouterView/>
      </div>
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

.content-wrapper {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
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
