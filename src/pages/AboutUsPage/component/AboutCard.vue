<script setup lang="ts">
const props = defineProps<{
  name: string
  role: string
  imageSrc: string
  description: string
  githubLink: string
}>()
</script>

<template>
  <div class="d-flex">
    <v-img :src="props.imageSrc" class="image" height="70svh" cover aspect-ratio="16/9"></v-img>
    <v-col>
      <h2 class="name">{{ props.name }}</h2>
      <div class="info-container">
        <v-divider></v-divider>
      </div>
      <div class="d-flex flex-column justify-center">
        <div class="role">{{ props.role }}</div>
        <div>{{ props.description }}</div>
        <a :href="props.githubLink">My github</a>
      </div>
    </v-col>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/constants.scss';

.name {
  color: constants.$color-primary;
}

.image {
  border: 1px solid constants.$color-primary;
  border-radius: 6px;
}

.info-container {
  padding: 0 0 0.7rem;
}

.role {
  font-size: 1.5rem;
  padding: 0 0 0.7rem;
}
</style>
