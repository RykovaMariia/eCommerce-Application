<script setup lang="ts">
import { chooseRules } from '@/utils/chooseRules'
import { getMaxTime } from '@/utils/dateUtils'
import { computed } from 'vue'

const props = defineProps<{
  label: string
  type: string
}>()

const emit = defineEmits({
  setInput(inputData: string) {
    return new Date(inputData).toDateString()
  },
})

const yearToShow = '2000'

const rules = computed(() => chooseRules(props.type, props.label))
</script>

<template>
  <v-date-input
    :label="props.label"
    :max="getMaxTime()"
    :year="yearToShow"
    :type="props.type"
    :rules="rules"
    variant="outlined"
    prepend-icon=""
    @update:modelValue="emit('setInput', $event)"
    :readonly="true"
  ></v-date-input>
</template>
