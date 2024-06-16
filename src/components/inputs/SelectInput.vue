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
  isHideDetails?: boolean | 'auto'
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
    :hide-details="isHideDetails"
    :clearable="isClearable"
    :multiple="isMultiple"
    ><template v-if="isChips" v-slot:selection="{ item, index }">
      <v-chip v-if="index < 1">
        <span>{{ item.title }}</span>
      </v-chip>
      <span v-if="index === 1 && data" class="text-grey text-caption align-self-center">
        (+{{ data.length - 1 }} others)
      </span>
    </template></v-select
  >
</template>
