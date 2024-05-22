<script setup lang="ts">
import { alertStore } from '@/stores/alertStore'

const alert = alertStore()

const closeAlert = () => alert.setFalse()
</script>

<template>
  <v-alert
    closable
    :text="alert.message"
    position="fixed"
    class="alert-window"
    @click:close="closeAlert"
    :type="alert.type"
  ></v-alert>
</template>

<style scoped lang="scss">
.alert-window {
  z-index: 1;
  right: 0.5rem;
  bottom: 0.5rem;
  border-radius: 10px;
}
</style>
