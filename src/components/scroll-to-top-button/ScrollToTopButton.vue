<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'

const scrollPositionThreshold = 200

const showButton = ref(false)

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleScroll = () => {
  showButton.value = window.scrollY > scrollPositionThreshold
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <v-fab
    v-if="showButton"
    icon="mdi-chevron-up"
    @click="scrollToTop"
    color="secondary"
    class="button"
  />
</template>

<style lang="scss" scoped>
@use '@styles/mixins.scss';

.button {
  @include mixins.media-tablet {
    right: 6rem;
    bottom: 4rem;
  }

  @include mixins.media-mini-mobile {
    right: 4rem;
    bottom: 3rem;
  }
  position: fixed;
  z-index: 1000;
  right: 8rem;
  bottom: 8rem;
}
</style>
