<script setup lang="ts">
import Button from '@components/buttons/Button.vue'
import Input from '@components/inputs/Input.vue'
import { InputLabel } from '@/enums/inputLabel'
import { InputType } from '@/enums/inputType'
import { reactive } from 'vue'
import type { UserLoginData } from '@/interfaces/userData'
import { authService } from '@/services/authService'
import { userAuth } from '@/stores/userAuth'
import { useAlertStore } from '@/stores/alert'
import router from '@/router'
import type { SubmitEventPromise } from 'vuetify'

const alert = useAlertStore()

const userData: UserLoginData = reactive({
  email: '',
  password: '',
})

async function submit(submitEventPromise: SubmitEventPromise) {
  const { valid } = await submitEventPromise
  if (valid) {
    login()
  }
}

function login() {
  authService
    .login(userData)
    .then(() => {
      userAuth().login()
      router.replace({ name: 'main' })
    })
    .catch((error: Error) => {
      alert.show(`Error: ${error.message}`, 'warning')
    })
}
</script>

<template>
  <v-form class="login-form" @submit.prevent="submit">
    <Input
      :label="InputLabel.Email"
      placeholder="user@example.com"
      :type="InputType.Text"
      v-model="userData.email"
      is-validation
    />
    <Input
      :label="InputLabel.Password"
      placeholder=""
      :type="InputType.Password"
      v-model="userData.password"
      icon="mdi-eye-closed"
      is-validation
    />
    <v-col class="col-button-link">
      <Button textContent="Login" color="secondary" buttonType="submit" />
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
