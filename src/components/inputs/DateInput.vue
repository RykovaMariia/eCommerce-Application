<script setup lang="ts">
import { chooseRules } from '@/utils/chooseRules'
import { getMaxTime } from '@/utils/dateUtils'
import { computed } from 'vue'
import { yearToShow } from '@/constants/constants'

const props = defineProps<{
  label: string
  type: string
}>()

const dateOfBirth = defineModel()

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
    v-model="dateOfBirth"
    prepend-icon=""
    :readonly="true"
  ></v-date-input>
</template>
