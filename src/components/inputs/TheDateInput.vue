<script setup lang="ts">
import { chooseRules } from '@/utils/choose-rules'
import { getMaxTime } from '@/utils/max-time'
import { computed } from 'vue'

const props = defineProps<{
  label: string
  type: string
}>()

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
  ></v-date-input>
</template>
