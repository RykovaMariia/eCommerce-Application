<script setup lang="ts">
defineProps<{
  textContent?: String
  classes?: String
  buttonType?: String
}>()
</script>

<template>
  <v-col>
    <v-btn variant="flat" :class="$props.classes" :type="$props.buttonType ?? 'button'">
      {{ textContent }}
    </v-btn>
  </v-col>
</template>

<style lang="scss">
@use '../../styles/constants.scss';

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
