<script setup lang="ts"></script>

<template>
  <v-number-input
    :reverse="false"
    controlVariant="split"
    label=""
    :hideInput="false"
    variant="outlined"
    :min="1"
    placeholder="1"
    density="compact"
    readonly
    hide-details="auto"
  ></v-number-input>
</template>

<style lang="scss">
@use '@/styles/mixins.scss';

.v-number-input {
  @include mixins.media-tablet {
    max-width: 5rem;
  }
  max-width: 7rem;
}

.v-number-input .v-field__input {
  @include mixins.media-tablet {
    font-size: 0.9rem;
  }
}

.v-number-input .v-field {
  @include mixins.media-tablet {
    --v-field-input-padding-top: 0;
    --v-field-input-padding-bottom: 0;
  }
}

.v-btn--icon .v-icon.mdi-minus,
.v-btn--icon .v-icon.mdi-plus {
  --v-icon-size-multiplier: 0.7;

  @include mixins.media-tablet {
    --v-icon-size-multiplier: 0.55;
  }
}

.v-number-input .v-btn--icon.v-btn--density-default {
  @include mixins.media-tablet {
    width: 1.6rem;
  }
  width: calc(var(--v-btn-height));
}
</style>
