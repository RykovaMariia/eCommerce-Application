<script setup lang="ts">
import path from '@assets/images/login/login.jpg'
import LoginForm from '@pages/LoginPage/components/LoginForm.vue'
import Breadcrumb from '@components/breadcrumbs/Breadcrumb.vue'

const items = [
  {
    title: 'Main',
    disabled: false,
    href: '/',
  },
  {
    title: 'Login',
    disabled: true,
    href: '/login',
  },
]
</script>

<template>
  <v-container class="container">
    <Breadcrumb :items="items" />
    <div class="login-card">
      <v-col>
        <h1 class="login-title">Login</h1>
        <LoginForm />
      </v-col>
      <v-img class="login-image" :aspect-ratio="1" :src="path" cover></v-img>
    </div>
  </v-container>
</template>

<style scoped lang="scss">
@use '@/styles/constants.scss';
@use '@/styles/mixins.scss';

.container {
  @include mixins.media-mobile {
    padding: 0;
  }
  display: flex;
  flex-direction: column;
  max-width: 1440px;
}

.login-title {
  margin: 1rem auto;
  font-size: 36px;
  color: constants.$color-primary;
  text-align: center;
}

.login-card {
  overflow: hidden;
  display: flex;
  justify-content: center;

  border: 1px solid constants.$color-primary;
  border-radius: 7px;
}

.login-image {
  @include mixins.media-tablet {
    display: none;
  }
  max-width: 60%;
}
</style>
