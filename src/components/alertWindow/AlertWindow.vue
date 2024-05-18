<script setup lang="ts">
interface AlertProps {
  textContent?: string
}
const props = defineProps<AlertProps>()
</script>

<template>
  <v-banner
      lines="three"
    >
      <v-banner-text>
        {{ props.textContent }}
      </v-banner-text>

      <template v-slot:actions>
        <v-btn>Action</v-btn>
      </template>
    </v-banner>
</template>