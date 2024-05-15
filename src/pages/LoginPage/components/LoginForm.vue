<script setup lang="ts">
import TheButton from '@components/buttons/TheButton.vue'
import TheInput from '@components/inputs/TheInput.vue'
import { InputLabel } from '@/enums/inputLabel'
import { InputType } from '@/enums/inputType'
import { reactive } from 'vue';

interface IUserLoginData {
  email: string;
  password: string;
}

const userLoginData = {
  email: '',
  password: '',
}

const userData: IUserLoginData = reactive({...userLoginData})
</script>

<template>
  <v-form class="login-form">
    <TheInput :label="InputLabel.Email" placeholder="user@example.com" :type="InputType.Text" v-model="userData.email"/>
    <TheInput
      :label="InputLabel.Password"
      placeholder=""
      :type="InputType.Password"
      v-model="userData.password"
      icon="mdi-eye-closed"
    />
    <TheButton textContent="Login" classes="secondary" buttonType="submit" />
  </v-form>
</template>
