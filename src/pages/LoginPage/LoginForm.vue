<script setup lang="ts">
import TheButton from '@components/buttons/TheButton.vue'
import TheInput from '@components/input/TheInput.vue'
</script>

<template>
  <v-form class="login-form">
    <TheInput label="Email" placeholder="user@example.com" type="text" />
    <TheInput label="Password" placeholder="" type="password" icon="mdi-eye-closed" />
    <TheButton textContent="Login" classes="secondary" buttonType="submit" />
  </v-form>
</template>

