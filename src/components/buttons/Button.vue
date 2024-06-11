<script setup lang="ts">
interface ButtonProps {
  textContent?: string
  buttonType?: string
  btnVariant?: 'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain'
  size?: 'x-small ' | 'small' | 'default' | 'large' | 'x-large'
  to?: string
}
const props = withDefaults(defineProps<ButtonProps>(), {
  size: 'default',
  btnVariant: 'flat',
})
</script>

<template>
  <v-btn :variant="btnVariant" :type="props.buttonType" :size="props.size" :to="props.to">
    {{ props.textContent }}
  </v-btn>
</template>

<style lang="scss" scoped>
@use '@styles/constants.scss';

.v-btn {
  text-transform: none;
  border-radius: 6px;
  font-size: 16px;
}
</style>
