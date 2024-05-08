<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  label: string
  placeholder?: string
  type: string
  icon?: string
}>()

const rules = {
  required: (value: string) => {
    return !!value || 'Field is required'
  },
  email: (value: string) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const spaces = value.match(/\s+/g) === null
    return (
      (pattern.test(value) && spaces) ||
      'Invalid e-mail. Please enter your e-mail in the format: example@gmail.com'
    )
  },
  password: (value: string) => {
    const pattern =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>/?[\]\\|`~])(?!.*^\s)(?!.*\s$).{8,}$/
    return (
      pattern.test(value) ||
      'Invalid password. Password must be at least 8 characters long,\n contain at least one uppercase letter,\n at least one lowercase letter,\n at least one digit,\n at least one special character,\n must not contain leading or trailing whitespace.'
    )
  },
}

function chooseRules(type: string, label: string) {
  if (type === 'text' && label === 'Email') {
    return [rules.required, rules.email]
  }
  if (type === 'password') {
    return [rules.required, rules.password]
  }
  return [rules.required]
}

let marker = ref(true)
function togglePassword() {
  marker.value = !marker.value
}
</script>

<template>
  <v-col>
    <v-text-field
      :label="$props.label"
      :placeholder="$props.placeholder"
      :rules="chooseRules($props.type, $props.label)"
      :type="$props.label === 'Password' ? (marker ? $props.type : 'text') : $props.type"
      :append-inner-icon="
        $props.label === 'Password' ? (marker ? $props.icon : 'mdi-eye-outline') : ''
      "
      @click:append-inner="togglePassword()"
      variant="outlined"
    ></v-text-field>
  </v-col>
</template>

<style lang="scss">
@use '../../styles/constants.scss';

.v-field-label {
  font-size: 16px;
}
</style>
