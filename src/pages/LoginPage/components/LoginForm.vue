<script setup lang="ts">
import Button from '@components/buttons/Button.vue'
import Input from '@components/inputs/Input.vue'
import { InputLabel } from '@/enums/inputLabel'
import { InputType } from '@/enums/inputType'
import { reactive } from 'vue'
import type { UserLoginData } from '@/interfaces/userData'
import { authService } from '@/services/authService'

const userLoginData = {
  email: '',
  password: '',
}

const userData: UserLoginData = reactive({ ...userLoginData })

function login() {
  if (userData.email && userData.password) {
    authService.login(userData)
  }
}
</script>

<template>
  <v-form class="login-form" @submit.prevent="login">
    <Input
      :label="InputLabel.Email"
      placeholder="user@example.com"
      :type="InputType.Text"
      v-model="userData.email"
    />
    <Input
      :label="InputLabel.Password"
      placeholder=""
      :type="InputType.Password"
      v-model="userData.password"
      icon="mdi-eye-closed"
    />
    <Button textContent="Login" classes="secondary" buttonType="submit" />
  </v-form>
</template>
