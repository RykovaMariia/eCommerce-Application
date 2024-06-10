<script setup lang="ts"></script>

<template>
  <v-number-input
    :reverse="false"
    controlVariant="split"
    label=""
    :hideInput="false"
    variant="outlined"
    :min="1"
    max-width="7rem"
    placeholder="1"
    density="compact"
    readonly
    hide-details="auto"
  ></v-number-input>
</template>

<style lang="scss">
.v-btn--icon .v-icon.mdi-minus,
.v-btn--icon .v-icon.mdi-plus {
  --v-icon-size-multiplier: 0.7;
}

.v-number-input .v-btn--icon.v-btn--density-default {
  width: calc(var(--v-btn-height));
}
</style>
