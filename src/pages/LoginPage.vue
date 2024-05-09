<script setup lang="ts">
import TheButton from '@/components/buttons/TheButton.vue'
import TheInput from '@/components/input/TheInput.vue'
import path from '@/assets/images/login/login.jpg'
const items = [
  {
    title: 'Home',
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
    <v-breadcrumbs :items="items"></v-breadcrumbs>
    <div class="login-card">
      <v-col>
        <h1 class="login-title">Login</h1>
        <v-form class="login-form">
          <TheInput label="Email" placeholder="user@example.com" type="text" />
          <TheInput label="Password" placeholder="" type="password" icon="mdi-eye-closed" />

          <TheButton textContent="Login" classes="secondary" buttonType="submit" />
        </v-form>
      </v-col>
      <v-img class="login-image" :aspect-ratio="1" :src="path" cover></v-img>
    </div>
  </v-container>
</template>

<style scoped lang="scss">
@use '@/styles/constants.scss';

.v-breadcrumbs {
  color: constants.$color-text-breadcrumbs;
}

.container {
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  margin: 3rem auto;

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
