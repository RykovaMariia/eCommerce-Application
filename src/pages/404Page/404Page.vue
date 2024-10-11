<script setup lang="ts">
import Button from '@/components/buttons/Button.vue'
import IconFour from '@components/icons/IconFour.vue'
import IconZero from '@components/icons/IconZero.vue'
</script>

<template>
  <v-container class="container">
    <h1 class="title"><IconFour /><IconZero /><IconFour /></h1>
    <div class="heading-text">Oops! Page is not found.</div>
    <Button to="/main" textContent="Go to main" color="primary" size="large"></Button>
  </v-container>
</template>

<style lang="scss" scoped>
@use '@styles/constants.scss';
@use '@styles/mixins.scss';

.container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;

  height: 100%;
  padding: 4rem 0;

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

@include mixins.media-middle {
  footer {
    margin-top: 1rem;
  }

  .heading-text {
    font-size: 1rem;
  }
}
</style>
