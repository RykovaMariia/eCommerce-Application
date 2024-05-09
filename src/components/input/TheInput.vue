<script setup lang="ts">
import { ref } from 'vue'
import { chooseRules } from '@/utils/choose-rules'

defineProps<{
  label: string
  placeholder?: string
  type: string
  icon?: string
}>()

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

<style scoped lang="scss">
@use '../../styles/constants.scss';

.v-field-label {
  font-size: 16px;
}
</style>
