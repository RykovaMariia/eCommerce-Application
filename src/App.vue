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
import ScrollToTopButton from './components/scroll-to-top-button/ScrollToTopButton.vue'
import { useLoadingStore } from './stores/loading'
import IconZero from './components/icons/IconZero.vue'

const alert = useAlertStore()
const loadingStore = useLoadingStore()

loadingStore.setLoading(true)

const { isOpenAlert } = storeToRefs(useAlertStore())
const { isLoading } = storeToRefs(useLoadingStore())

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

Promise.all([cartService.setAnonymousSession(), favoritesService.setAnonymousSession()])
  .then(() => {
    loadingStore.setLoading(false)
  })
  .catch((error: Error) => {
    loadingStore.setLoading(false)
    alert.show(`Error: ${error.message}`, 'warning')
  })
</script>

<template>
  <v-app>
    <Header />
    <v-main>
      <Breadcrumbs />
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <!-- eslint-disable-next-line vue/require-toggle-inside-transition -->
          <div class="d-flex page-container">
            <component :is="Component" />
          </div>
        </transition>
      </router-view>
      <ScrollToTopButton />
    </v-main>
    <Footer />
    <AlertWindow v-if="isOpenAlert" />
    <v-overlay :persistent="true" v-model="isLoading" class="d-flex align-center justify-center">
      <IconZero :is-loading="true" />
    </v-overlay>
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

.page-container {
  flex-direction: column;
  height: 100%;
}
</style>
