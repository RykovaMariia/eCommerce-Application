<script setup lang="ts">
import { chooseRules } from '@/utils/chooseRules'
import { computed } from 'vue'

const props = defineProps<{
  type: string
  label: string
  items: string[]
}>()

const rules = computed(() => chooseRules(props.type, props.label))
</script>

<template>
  <v-autocomplete
    :label="label"
    :items="props.items"
    :rules="rules"
    variant="outlined"
    density="comfortable"
  ></v-autocomplete>
</template>
