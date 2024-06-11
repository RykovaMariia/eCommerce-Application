<script setup lang="ts">
interface ButtonProps {
  textContent?: string
  classes?: string
  buttonType?: string
  size?: string
  to?: string
}
const props = withDefaults(defineProps<ButtonProps>(), {
  buttonType: 'button',
  size: 'default',
})
</script>

<template>
  <v-btn
    variant="flat"
    :class="props.classes"
    :type="props.buttonType"
    :size="props.size"
    :to="props.to"
  >
    {{ props.textContent }}
  </v-btn>
</template>

<style lang="scss" scoped>
@use '@styles/constants.scss';

.v-btn {
  background: constants.$color-secondary;
  border-radius: 6px;
}

.v-btn--variant-flat {
  font-size: 16px;
  color: constants.$color-text-light;
  text-transform: none;
}

.primary {
  color: constants.$color-text-light;
  text-transform: capitalize;
  background-color: constants.$color-primary;
}

.secondary {
  background-color: constants.$color-secondary;
}
</style>
