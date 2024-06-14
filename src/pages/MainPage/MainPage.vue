<script setup lang="ts">
import IconLeaf from '@components/icons/IconLeaf.vue'
import IconGift from '@components/icons/IconGift.vue'
import IconRocket from '@components/icons/IconRocket.vue'
import IconLicense from '@components/icons/IconLicense.vue'
import IconLogo from '@components/icons/IconLogo.vue'
import { useCategoriesStore } from '@/stores/categories'
import { storeToRefs } from 'pinia'
import AdvantageCard from '@pages/MainPage/components/AdvantageCard.vue'
import CategoryCard from '@pages/MainPage/components/CategoryCard.vue'
import { RouterLink } from 'vue-router'

const { categoriesLinks } = storeToRefs(useCategoriesStore())

const INTERVAL_DURATION = 6000

const carouselImages = [
  './src/assets/images/main/main-carousel1.jpg',
  'https://cdn.shopify.com/s/files/1/2806/9936/t/71/assets/feb2023_banner_beddingandbath_websize-1677783445347.jpg?v=1677783446',
  'https://cdn.shopify.com/s/files/1/2806/9936/t/71/assets/zws_banner_collection_oralhygiene-1673304608529.jpg?v=1673304632',
] as const

const titleGreeting = ['Welcome', 'Sustainability and style', 'Discover organic products'] as const

const advantages = [
  { icon: IconLeaf, text: 'Eco friendly goods' },
  {
    icon: IconGift,
    text: 'Eco packaging',
  },
  {
    icon: IconRocket,
    text: 'Fast delivery',
  },
  {
    icon: IconLicense,
    text: 'Certificated products',
  },
] as const
</script>

<template>
  <div class="title">
    <div class="title_upper-line">Green city style</div>
    <div class="title_bottom-line">Eco goods store</div>
  </div>
  <div class="wrapper">
    <v-carousel
      cycle
      :interval="INTERVAL_DURATION"
      class="carousel"
      :show-arrows="false"
      :touch="true"
    >
      <v-carousel-item v-for="(url, n) in carouselImages" :key="url" :src="url" cover>
        <v-col class="carousel__carousel-item-wrapper">
          <h1 class="carousel__title-greeting" v-if="n === 0">{{ titleGreeting[n] }}</h1>
          <div class="carousel__carousel-text" v-else>{{ titleGreeting[n] }}</div>
          <RouterLink to="/catalog" class="carousel__link"
            >Go to catalog <v-icon icon="mdi-chevron-right"></v-icon
          ></RouterLink>
        </v-col>
      </v-carousel-item>
    </v-carousel>
  </div>

  <div class="advantages-wrapper">
    <div v-for="{ icon, text } in advantages" :key="text">
      <AdvantageCard :Icon="icon" :text="text" />
    </div>
  </div>

  <div class="wrapper">
    <h2 class="categories__title">Categories</h2>
    <div class="categories__container">
      <div v-for="(link, index) in categoriesLinks.slice(1)" :key="index">
        <RouterLink :to="link.parent.href">
          <CategoryCard :categoryTitle="link.parent.name" :imageSource="link.parent.description" />
        </RouterLink>
      </div>
    </div>
  </div>

  <div class="promocodes">
    <div class="promocodes__text d-flex flex-column justify-center">
      <div>Get your promo code:</div>
      <div class="promocodes__container">
        <div class="promocodes__icon">
          <IconLogo :isLight="true" />
        </div>
        <div class="promocodes__names">
          <div>UTIANELOX - <span class="promocodes__discount">10%</span></div>
          <div>THE-BEST-MENTOR-YAUHENI - <span class="promocodes__discount">80.1%</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/constants.scss';
@use '@styles/mixins.scss';

.title {
  display: flex;
  flex-direction: column;

  font-family: constants.$font-heading;
  font-size: 4rem;
  color: constants.$color-primary;
  text-transform: uppercase;

  &_upper-line {
    text-align: left;
  }

  &_bottom-line {
    text-align: right;
  }
}

.wrapper {
  padding: 3rem 0;
}

.carousel {
  font-family: constants.$font-heading;
  border: 1px solid constants.$color-primary;
  border-radius: 10px;

  &__carousel-item-wrapper {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-around;

    width: 50%;
    height: 100%;
    padding: 5rem;

    background: linear-gradient(90deg, constants.$color-secondary 30%, transparent);
  }

  &__title-greeting {
    font-size: 4rem;
    color: constants.$color-text-dark;
  }

  &__carousel-text {
    font-size: 3rem;
    color: constants.$color-text-dark;
  }

  &__link {
    font-family: constants.$font-base;
    font-size: 1.2rem;
    text-decoration: underline;
    transition: 0.3s;

    @media (hover: hover) {
      &:hover {
        color: constants.$color-secondary;
        transition: 0.3s;
      }
    }
  }
}

::v-deep(.v-carousel__controls) {
  color: constants.$color-primary;
  background: transparent;
}

::v-deep(.v-carousel__controls__item .v-icon) {
  opacity: 0.8;
}

.advantages-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  justify-content: space-between;
}

.categories {
  &__title {
    padding-bottom: 1rem;
    color: constants.$color-primary;
  }

  &__container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.9rem;
    justify-content: space-between;
  }
}

.promocodes {
  padding: 3rem;
  background-color: constants.$color-primary;
  border-radius: 10px;

  &__text {
    font-family: constants.$font-heading;
    font-size: 3.6rem;
    color: constants.$color-text-light;
    text-transform: uppercase;
  }

  &__names {
    font-size: 3rem;
  }

  &__container {
    display: flex;
    gap: 1rem;
    justify-content: end;
  }

  &__icon svg {
    width: 4rem;
    height: 4rem;
  }

  &__discount {
    color: constants.$color-secondary;
  }
}

@include mixins.media-mobile {
  .carousel {
    &__title-greeting,
    &__carousel-text {
      font-size: 2rem;
    }

    &__carousel-item-wrapper {
      width: 100%;
      padding: 2rem;
    }
  }

  .promocodes {
    &__text {
      font-size: 2rem;
    }

    &__icon svg {
      width: 3rem;
      height: 3rem;
    }

    &__names {
      font-size: 1.6rem;
    }
  }
}

@include mixins.media-tablet {
  .categories {
    &__container {
      align-items: center;
      justify-content: center;
    }
  }

  .advantages-wrapper {
    justify-content: center;
  }
}

@include mixins.media-middle {
  .title {
    font-size: 3rem;
  }

  .carousel {
    &__title-greeting,
    &__carousel-text {
      font-size: 3rem;
    }

    &__link {
      font-size: 1rem;
    }

    &__carousel-item-wrapper {
      width: 50%;
      padding: 4rem;
    }
  }
}
</style>
