<script setup lang="ts">
import Button from '@components/buttons/Button.vue'
import Input from '@components/inputs/Input.vue'
import { InputLabel } from '@/enums/inputLabel'
import { InputType } from '@/enums/inputType'
import { reactive } from 'vue'
import type { UserLoginData } from '@/interfaces/userData'
import { clientService } from '@/api/ClientService'
import { userAuth } from '@/stores/authStore'
import { tokenData } from '@/api/TokenInfo'
import { localStorageService } from '@/services/storageService'
import { alertStore } from '@/stores/alertStore'

const isAlert = alertStore()

const userLoginData = {
  email: '',
  password: '',
}

const userData: UserLoginData = reactive({ ...userLoginData })

function login() {
  if (userData.email && userData.password) {
    try {
      const userClientData = clientService
        .getApiRoot(clientService.getPasswordFlowClient(userData.email, userData.password))
        .me()
        .get()
        .execute()
        userClientData
        .then((data) => {
          console.warn(data.body)
          userAuth().toogleAuthState()
          console.warn(tokenData.get())
          localStorageService.saveData('token', tokenData.get())
        })
        .catch((error: Error) => {
          console.warn(error.message)
          isAlert.setTrue()
          isAlert.$patch((state) => {
            state.message = error.message
            state.type = 'warning'
          })
        })
    } catch (e) {
      console.error(e)
    }
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
