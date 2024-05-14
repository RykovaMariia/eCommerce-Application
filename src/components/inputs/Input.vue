<script setup lang="ts">
import { computed, ref } from 'vue'
import { chooseRules } from '@/utils/chooseRules'

const props = defineProps<{
  label: string
  placeholder?: string
  type: string
  icon?: string
  disabled?: boolean
}>()

const rules = computed(() => chooseRules(props.type, props.label))
const marker = ref(true)
function togglePassword() {
  marker.value = !marker.value
}
const fieldType = computed(() =>
  props.label === 'Password' ? (marker.value ? props.type : 'text') : props.type,
)
const innerIcon = computed(() =>
  props.label === 'Password' ? (marker.value ? props.icon : 'mdi-eye-outline') : '',
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
    ></v-text-field>
  </v-col>
</template>

<style scoped lang="scss">
@use '@styles/constants.scss';

.v-field-label {
  font-size: 16px;
}
</style>
