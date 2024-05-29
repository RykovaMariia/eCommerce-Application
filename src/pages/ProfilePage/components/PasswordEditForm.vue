<script setup lang="ts">
import Input from '@components/inputs/Input.vue'
import Button from '@components/buttons/Button.vue'
import { InputType } from '@/enums/inputType'
import { InputLabel } from '@/enums/inputLabel'
import { customerService } from '@/services/customerService'
import { alertStore } from '@/stores/alertStore'
import { userAuth } from '@/stores/userAuth'
import type { SubmitEventPromise } from 'vuetify'
import { ref, type Ref } from 'vue'
import type { UserPasswordsData } from '@/interfaces/userData'

const alert = alertStore()

async function submit(submitEventPromise: SubmitEventPromise) {
  const { valid } = await submitEventPromise
  if (valid) updatePassword()
}

let userPasswords: Ref<UserPasswordsData> = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

function updatePassword() {
  customerService
    .updatePassword(userPasswords)
    .then((result) => {
      alert.show(`Password changed successfully`, 'success')
      userAuth().customerVersion = result.body.version
    })
    .catch((error: Error) => {
      if (error.message === 'The given current password does not match.')
        alert.show(`Error: Your current password is not correct`, 'warning')
      else alert.show(`Error: ${error.message}`, 'warning')
    })
}

let isError = ref(false)

function setMessageClass() {
  const messageClass = {
    'message-incorrect': isError.value,
    'message-correct': !isError.value,
  }
  return messageClass
}

function setButtonState() {
  const state = {
    disabled: isError.value,
  }
  return state
}

function provePassword() {
  if (!userPasswords.value.confirmPassword || !userPasswords.value.newPassword) return
  else {
    if (userPasswords.value.newPassword !== userPasswords.value.confirmPassword) {
      isError.value = true
    } else {
      isError.value = false
    }
  }
}
</script>

<template>
  <v-form class="login-form" ref="form" @submit.prevent="submit">
    <Input
      :label="InputLabel.CurrentPassword"
      placeholder=""
      :type="InputType.Password"
      icon="mdi-eye-closed"
      v-model="userPasswords.currentPassword"
      class="registration-input"
    />
    <Input
      :label="InputLabel.NewPassword"
      placeholder=""
      :type="InputType.Password"
      icon="mdi-eye-closed"
      v-model="userPasswords.newPassword"
      class="registration-input"
      @input="provePassword"
    />
    <Input
      :label="InputLabel.ConfirmPassword"
      placeholder=""
      :type="InputType.Password"
      icon="mdi-eye-closed"
      class="registration-input"
      v-model="userPasswords.confirmPassword"
      @input="provePassword"
    />

    <v-col class="message" :class="setMessageClass()"> Passwords do not match </v-col>

    <v-col class="col-button-link">
      <Button
        textContent="Save"
        classes="secondary"
        buttonType="submit"
        :class="setButtonState()"
      />
    </v-col>
  </v-form>
</template>

<style scoped lang="scss">
@use '@styles/constants.scss';

.message {
  padding: 0 12px;

  font-size: 0.8rem;
  color: constants.$color-sale;
  text-align: right;

  transition: 0.5s;
}

.message-correct {
  visibility: hidden;
}

.message-incorrect {
  visibility: visible;
}

.disabled {
  pointer-events: none;
  background: constants.$color-text-placeholder;
}
</style>