<script setup lang="ts">
interface ButtonProps {
  textContent?: string
  classes?: string
  buttonType?: string
}
const props = withDefaults(defineProps<ButtonProps>(), {
  buttonType: 'button',
})
</script>

<template>
  <v-col>
    <v-btn variant="flat" :class="props.classes" :type="props.buttonType">
      {{ props.textContent }}
    </v-btn>
  </v-col>
</template>

<style lang="scss">
@use '@styles/constants.scss';

.v-btn {
  border-radius: 6px;
}

.v-btn__content {
  font-size: 16px;
  color: constants.$color-text-light;
  text-transform: none;
}

.primary {
  background-color: constants.$color-primary;
}

.secondary {
  background-color: constants.$color-secondary;
}
</style>
