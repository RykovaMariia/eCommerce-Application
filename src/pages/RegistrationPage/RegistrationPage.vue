<script setup lang="ts">
import RegistrationForm from '@pages/RegistrationPage/RegistrationForm.vue'
const items = [
  {
    title: 'Home',
    disabled: false,
    href: '/',
  },
  {
    title: 'Registration',
    disabled: true,
    href: '/registration',
  },
]
</script>

<template>
  <v-container class="container">
    <v-breadcrumbs :items="items"></v-breadcrumbs>
    <v-col class="registration-card">
      <v-col>
        <h1 class="registration-title">Registration</h1>
      </v-col>

      <RegistrationForm />
    </v-col>
  </v-container>
</template>

<style scoped lang="scss">
@use '@/styles/constants.scss';

.registration-card {
  margin: 1rem auto;
  border: 1px solid constants.$color-primary;
  border-radius: 6px;
}

.registration-title {
  margin: 0;
  font-size: 36px;
  color: constants.$color-primary;
}
</style>
