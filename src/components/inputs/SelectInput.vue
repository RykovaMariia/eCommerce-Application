<script setup lang="ts">
import { chooseRules } from '@/utils/chooseRules'
import { computed } from 'vue'

const props = defineProps<{
  label: string
  items: string[]
  variant?:
    | 'underlined'
    | 'filled'
    | 'outlined'
    | 'plain'
    | 'solo'
    | 'solo-inverted'
    | 'solo-filled'
  isValidation?: boolean
  type?: string
  isChips?: boolean
  isClearable?: boolean
  isMultiple?: boolean
}>()

const rules = computed(() => chooseRules(props.type ?? '', props.label))

const data = defineModel<string | string[]>()
</script>

<template>
  <v-select
    :label="label"
    :items="props.items"
    :rules="isValidation ? rules : [true]"
    :variant="props.variant ? props.variant : 'outlined'"
    v-model="data"
    :chips="isChips"
    :clearable="isClearable"
    :multiple="isMultiple"
  ></v-select>
</template>
