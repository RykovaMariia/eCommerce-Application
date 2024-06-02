<script setup lang="ts">
import path from '@assets/images/login/login.jpg'
import LoginForm from '@pages/LoginPage/components/LoginForm.vue'
</script>

<template>
  <v-container class="container">
    <div class="page-card login-card">
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
  text-align: center;
}

.login-card {
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.login-image {
  @include mixins.media-tablet {
    display: none;
  }
  max-width: 60%;
}
</style>
