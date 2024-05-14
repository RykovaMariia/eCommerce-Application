<script setup lang="ts">
import TheButton from '@components/buttons/TheButton.vue'
import TheInput from '@components/inputs/TheInput.vue'
import { InputLabel } from '@/enums/inputLabel';
import { InputType } from '@/enums/inputType';
</script>

<template>
  <v-form class="login-form">
    <TheInput :label="InputLabel.Email" placeholder="user@example.com" :type="InputType.Text" />
    <TheInput :label="InputLabel.Password" placeholder="" :type="InputType.Password" icon="mdi-eye-closed" />
    <TheButton textContent="Login" classes="secondary" buttonType="submit" />
  </v-form>
</template>
