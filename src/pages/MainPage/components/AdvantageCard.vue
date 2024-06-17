<script setup lang="ts">
const props = defineProps<{
  text: string
  iconSrc: string
}>()
</script>

<template>
  <div class="advantages__container">
    <v-img :src="props.iconSrc" class="advantages__image"></v-img>
    <div>{{ props.text }}</div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/constants.scss';
@use '@styles/mixins.scss';

.advantages {
  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 15rem;
    padding: 1.5rem;

    border: 1px solid constants.$color-primary;
    border-radius: 10px;
  }

  &__image {
    width: 3rem;
    height: 3rem;
  }
}

@include mixins.media-desktop {
  .advantages {
    &__container {
      width: 13rem;
      padding: 1rem;
      font-size: 0.8rem;
    }

    &__image {
      width: 3rem;
      height: 3rem;
    }
  }
}

@include mixins.media-tablet {
  .advantages {
    &__container {
      width: 12rem;
      padding: 0.7rem;
      font-size: 0.8rem;
    }

    &__image {
      width: 2.5rem;
      height: 2.5rem;
    }
  }
}

@include mixins.media-middle {
  .advantages {
    &__container {
      width: 9.5rem;
      padding: 0.8rem;
      font-size: 0.8rem;
    }

    &__image {
      width: 2.4rem;
      height: 2.4rem;
    }
  }
}

@include mixins.media-mobile {
  .advantages {
    &__container {
      width: 8.5rem;
      padding: 0.6rem;
      font-size: 0.6rem;
    }

    &__image {
      width: 2rem;
      height: 2rem;
    }
  }
}
</style>
