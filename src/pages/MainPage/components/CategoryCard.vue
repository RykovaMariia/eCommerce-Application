<script setup lang="ts">
const props = defineProps<{
  categoryTitle: string
  imageSource: string
}>()
</script>

<template>
  <v-img class="category__card" :src="props.imageSource" cover aspect-ratio="1.2">
    <div class="category__title">{{ props.categoryTitle }}</div>
  </v-img>
</template>

<style lang="scss" scoped>
@use '@/styles/constants.scss';
@use '@styles/mixins.scss';

.category {
  &__card {
    display: flex;
    align-items: end;

    width: 20rem;

    border: 1px solid constants.$color-primary;
    border-radius: 10px;
  }

  &__title {
    max-width: 50%;
    padding: 0.3rem;

    font-size: 1rem;
    color: constants.$color-text-light;
    text-align: center;
    text-transform: capitalize;

    background-color: constants.$color-primary;
    border-top-right-radius: 10px;
  }
}

@media screen and (1024px <= width) {
  .category {
    &__card {
      max-width: 26svw;
    }
  }
}

@include mixins.media-tablet {
  .category {
    &__card {
      max-width: 15rem;
    }
  }
}

@include mixins.media-middle {
  .category {
    &__card {
      width: 13rem;
    }

    &__title {
      padding: 0.2rem;
      font-size: 0.7rem;
    }
  }
}

@include mixins.media-mobile {
  .category {
    &__card {
      width: 8.5rem;
    }

    &__title {
      max-width: 100%;
      border-radius: 0;
    }
  }
}
</style>
