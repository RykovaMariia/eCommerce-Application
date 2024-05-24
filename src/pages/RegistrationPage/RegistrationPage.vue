<script setup lang="ts">
import RegistrationForm from '@/pages/RegistrationPage/components/RegistrationForm.vue'
import Breadcrumb from '@components/breadcrumbs/Breadcrumb.vue'
const items = [
  {
    title: 'Main',
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
    <v-col class="page-card">
      <v-col>
        <h1>Registration</h1>
      </v-col>
      <RegistrationForm />
    </v-col>
  </v-container>
</template>

<style scoped lang="scss">
@use '@/styles/constants.scss';
</style>
