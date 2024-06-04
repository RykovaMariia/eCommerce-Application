<script setup lang="ts">
import Button from '@components/buttons/Button.vue'
import Input from '@components/inputs/Input.vue'
import { InputType } from '@/enums/inputType'
import { reactive } from 'vue'

const props = defineProps<{
  priceRange: string[]
}>()

const emit = defineEmits(['priceFilterUpdated'])

const priceData = reactive({
  from: '',
  to: '',
})

function submit() {
  if (!priceData.from || +priceData.from < +props.priceRange[0]) {
    priceData.from = props.priceRange[0]
  }

  if (
    !priceData.to ||
    (+priceData.to > +props.priceRange[1] && +priceData.to < +props.priceRange[0])
  ) {
    priceData.to = props.priceRange[1]
  }

  emit('priceFilterUpdated', priceData)
}

defineExpose({})
</script>

<template>
  <v-form class="login-form" @submit.prevent="submit">
    <div class="d-flex">
      <Input
        label="From"
        :type="InputType.Number"
        v-model="priceData.from"
        isHideDetails
        isClearable
      />
      <Input label="to" :type="InputType.Number" v-model="priceData.to" isHideDetails isClearable />
      <Button textContent="Go" classes="secondary" buttonType="submit" />
    </div>
  </v-form>
</template>

<style lang="scss" scoped>
.d-flex {
  gap: 1rem;
  align-items: center;
  justify-content: center;
}
</style>
