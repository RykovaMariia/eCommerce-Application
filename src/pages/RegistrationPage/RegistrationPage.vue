<script setup lang="ts">
import RegistrationForm from '@/pages/RegistrationPage/components/RegistrationForm.vue'
import Breadcrumb from '@components/breadcrumbs/Breadcrumb.vue'
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
    <Breadcrumb :items="items" />
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

.container {
  margin: 3rem auto;
}

.registration-card {
  border: 1px solid constants.$color-primary;
  border-radius: 6px;
}

.registration-title {
  font-size: 36px;
  color: constants.$color-primary;
}
</style>
