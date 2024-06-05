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

const props = defineProps<{
  email: string
}>()

const alert = alertStore()

const passwordForm: Ref<HTMLFormElement | undefined> = ref()

async function submit(submitEventPromise: SubmitEventPromise) {
  const { valid } = await submitEventPromise
  if (valid) updatePassword()
}

const userPasswords: Ref<UserPasswordsData> = ref({
  email: props.email,
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const resetForm = () => {
  if (passwordForm.value) {
    passwordForm.value.reset()
  }
}

function updatePassword() {
  customerService
    .updatePassword(userPasswords.value)
    .then((result) => {
      alert.show(`Password changed successfully`, 'success')
      userAuth().customerVersion = result.body.version
      userAuth().login()
      resetForm()
    })
    .catch((error: Error) => {
      if (error.message === 'The given current password does not match.')
        alert.show(`Error: Your current password is not correct`, 'warning')
      else alert.show(`Error: ${error.message}`, 'warning')
    })
}

const isError = ref(false)

function isShowMessage() {
  return isError.value
}

function setButtonState() {
  return {
    disabled: isError.value,
  }
}

function provePassword() {
  if (!userPasswords.value.confirmPassword || !userPasswords.value.newPassword) return
  else {
    isError.value = userPasswords.value.newPassword !== userPasswords.value.confirmPassword
  }
}
</script>

<template>
  <v-form class="password-form" ref="passwordForm" @submit.prevent="submit">
    <v-col>
      <Input
        :label="InputLabel.CurrentPassword"
        placeholder=""
        :type="InputType.Password"
        icon="mdi-eye-closed"
        v-model="userPasswords.currentPassword"
        class="registration-input"
        is-validation
      />
      <Input
        :label="InputLabel.NewPassword"
        placeholder=""
        :type="InputType.Password"
        icon="mdi-eye-closed"
        v-model="userPasswords.newPassword"
        class="registration-input"
        @input="provePassword"
        is-validation
      />
      <Input
        :label="InputLabel.ConfirmPassword"
        placeholder=""
        :type="InputType.Password"
        icon="mdi-eye-closed"
        class="registration-input"
        v-model="userPasswords.confirmPassword"
        @input="provePassword"
        is-validation
      />

      <v-col class="message" v-show="isShowMessage()"> Passwords do not match </v-col>

      <v-col class="col-button-link">
        <Button
          textContent="Save"
          classes="secondary"
          buttonType="submit"
          :class="setButtonState()"
        />
      </v-col>
    </v-col>
  </v-form>
</template>

<style scoped lang="scss">
@use '@styles/constants.scss';

.password-form {
  max-width: 650px;
}

.message {
  padding: 0 12px;

  font-size: 0.8rem;
  color: constants.$color-sale;
  text-align: right;

  transition: 0.5s;
}

.disabled {
  pointer-events: none;
  background: constants.$color-text-placeholder;
}
</style>
