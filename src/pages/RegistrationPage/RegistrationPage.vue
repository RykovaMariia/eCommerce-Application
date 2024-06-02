<script setup lang="ts">
import RegistrationForm from '@/pages/RegistrationPage/components/RegistrationForm.vue'
</script>

<template>
  <v-container class="container">
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
