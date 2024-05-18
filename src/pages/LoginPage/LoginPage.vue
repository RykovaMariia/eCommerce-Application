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

.container {
  display: flex;
  flex-direction: column;
  max-width: 1440px;

  @media screen and (width <= 768px) {
    padding: 0;
  }
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

  margin: 0 10%;

  border: 1px solid constants.$color-primary;
  border-radius: 7px;
}

.login-image {
  max-width: 60%;

  @media screen and (width <= 1024px) {
    display: none;
  }
}
</style>
