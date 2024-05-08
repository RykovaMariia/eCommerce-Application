<script setup lang="ts">
import TheFooter from '@/components/core/TheFooter.vue'
import LoginPage from './pages/LoginPage.vue'
</script>

<template>
  <LoginPage />
  <TheFooter />
</template>

<style lang="scss" scoped>
@use '@styles/constants.scss';

header {
  max-width: 1440px;
  margin: auto;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
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

@media (width >= 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    flex-wrap: wrap;
    place-items: flex-start;
  }

  nav {
    margin-top: 1rem;
    margin-left: -1rem;
    padding: 1rem 0;

    font-size: 1rem;
    text-align: left;
  }
}
</style>
