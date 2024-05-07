<script setup lang="ts">
import IconFour from '@components/icons/IconFour.vue'
import IconZero from '@components/icons/IconZero.vue'
</script>

<template>
  <v-container class="container">
    <h1 class="title"><IconFour /><IconZero /><IconFour /></h1>
    <div class="heading-text">Oops! Page is not found.</div>
    <v-btn class="btn" size="lg" variant="outlined" rounded="lg" text="Go to catalog" flat></v-btn>
  </v-container>
</template>

<style lang="scss" scoped>
@use '@styles/constants.scss';

.container {
  gap: 1rem;
  margin-top: 8rem;
  text-align: center;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
}

.heading-text {
  font-size: 2rem;
}

.btn {
  margin-top: 1rem;
  padding: 0.8rem 2rem;

  color: constants.$color-text-light;
  text-transform: none;

  background-color: constants.$color-secondary;
}
</style>
