<script setup lang="ts">
import { computed, ref } from 'vue'
import { chooseRules } from '@/utils/chooseRules'
import { InputLabel } from '@/enums/inputLabel'

const props = defineProps<{
  label: string
  type: string
  placeholder?: string
  icon?: string
  disabled?: boolean
}>()

const data = defineModel()

const rules = computed(() => chooseRules(props.type, props.label))
const marker = ref(true)
function togglePassword() {
  marker.value = !marker.value
}
const fieldType = computed(() =>
  props.label === InputLabel.Password ||
  InputLabel.CurrentPassword ||
  InputLabel.NewPassword ||
  InputLabel.ConfirmPassword
    ? marker.value
      ? props.type
      : 'text'
    : props.type,
)
const innerIcon = computed(() =>
  props.label === InputLabel.Password ||
  InputLabel.CurrentPassword ||
  InputLabel.NewPassword ||
  InputLabel.ConfirmPassword
    ? marker.value
      ? props.icon
      : 'mdi-eye-outline'
    : '',
)
</script>

<template>
  <v-col>
    <v-text-field
      :label="props.label"
      :placeholder="props.placeholder"
      :rules="rules"
      :type="fieldType"
      :append-inner-icon="innerIcon"
      @click:append-inner="togglePassword()"
      variant="outlined"
      :disabled="$props.disabled"
      v-model="data"
      base-color="on-surface"
      color="on-surface"
      density="comfortable"
    ></v-text-field>
  </v-col>
</template>

<style scoped lang="scss">
@use '@styles/constants.scss';

.v-field-label {
  font-size: 16px;
}
</style>
