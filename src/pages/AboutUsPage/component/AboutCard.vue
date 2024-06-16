<script setup lang="ts">
import IconGithub from '@components/icons/IconGithub.vue'

const props = defineProps<{
  name: string
  role: string
  bio: string
  imageSrc: string
  contributions: string
  githubLink: string
  stylePreference: boolean
}>()
</script>

<template>
  <div class="d-flex flex-wrap card-wrapper" :class="{ card: props.stylePreference }">
    <v-col class="d-flex image-container" :class="{ 'justify-md-end': props.stylePreference }"
      ><v-img :src="props.imageSrc" class="image" cover></v-img
    ></v-col>
    <v-col class="wrapper">
      <div
        class="d-flex justify-space-between"
        :class="{ 'justify-md-end ga-4': props.stylePreference }"
      >
        <h2 class="name">{{ props.name }}</h2>
        <a :href="props.githubLink" class="github-link d-flex align-center"><IconGithub /></a>
      </div>
      <div class="info-container">
        <v-divider></v-divider>
      </div>
      <div class="flex-column">
        <div class="role">{{ props.role }}</div>
        <div><span class="title_bold">Bio:</span> {{ props.bio }}</div>
        <div><span class="title_bold">Contributions:</span> {{ props.contributions }}</div>
      </div>
    </v-col>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/constants.scss';
@use '@styles/mixins.scss';

.name {
  color: constants.$color-primary;
}

.image {
  max-width: 300px;
  max-height: 300px;
  border: 1px solid constants.$color-primary;
  border-radius: 6px;
}

.title_bold {
  font-weight: bold;
}

.info-container {
  padding: 0 0 0.7rem;
}

.role {
  padding: 0 0 0.7rem;
  font-size: 1.5rem;
}

.github-link {
  width: max-content;
  padding: auto 1rem;
}

.card {
  display: flex;
  flex-direction: row-reverse;
}

.image-container {
  min-width: 200px;
  max-width: 400px;
  padding: 0;
}

.wrapper {
  padding: 0 1rem;
}

@media screen and (390px <= width <= 1375px) {
  .wrapper {
    padding: 0;
  }
}

@include mixins.media-middle {
  .card-wrapper {
    flex-direction: column;
    justify-items: center;
  }

  .card {
    flex-direction: column;
  }
}
</style>
