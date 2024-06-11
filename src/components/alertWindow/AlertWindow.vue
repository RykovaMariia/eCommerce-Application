<script setup lang="ts">
import { useAlertStore } from '@/stores/alert'

const alert = useAlertStore()

const closeAlert = () => alert.hide()
</script>

<template>
  <v-alert
    closable
    :text="alert.messageInfo?.message"
    position="fixed"
    class="alert-window"
    @click:close="closeAlert"
    :type="alert.messageInfo?.type"
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
