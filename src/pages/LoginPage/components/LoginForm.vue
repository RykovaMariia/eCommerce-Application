<script setup lang="ts">
import Button from '@components/buttons/Button.vue'
import Input from '@components/inputs/Input.vue'
import { InputLabel } from '@/enums/inputLabel'
import { InputType } from '@/enums/inputType'
import { reactive } from 'vue'
import type { UserLoginData } from '@/interfaces/userData'

const userLoginData = {
  email: '',
  password: '',
}

const userData: UserLoginData = reactive({ ...userLoginData })
</script>

<template>
  <v-form class="login-form">
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
