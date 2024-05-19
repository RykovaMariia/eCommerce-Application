<script setup lang="ts">
import Button from '@components/buttons/Button.vue'
import Input from '@components/inputs/Input.vue'
import { InputLabel } from '@/enums/inputLabel'
import { InputType } from '@/enums/inputType'
import { reactive } from 'vue'
import type { UserLoginData } from '@/interfaces/userData'
import { authService } from '@/services/authService'
import { userAuth } from '@/stores/authStore'
import { alertStore } from '@/stores/alertStore'
import router from '@/router'

const alert = alertStore()

const userLoginData = {
  email: '',
  password: '',
}

const userData: UserLoginData = reactive({ ...userLoginData })

function login() {
  if (!userData.email || !userData.password) return
  else {
    authService
      .login(userData)
      .then(() => {
        userAuth().toogleAuthState()
        router.replace({ name: 'main' })
      })
      .catch((error: Error) => {
        alert.setTrue()
        alert.$patch((state) => {
          state.message = error.message
          state.type = 'warning'
        })
      })
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
    <v-col class="col-button-link">
      <Button textContent="Login" classes="secondary" buttonType="submit" />
      <RouterLink class="link_redirect" to="/registration">create new account</RouterLink>
    </v-col>
  </v-form>
</template>

<style lang="scss" scoped>
.col-button-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>
