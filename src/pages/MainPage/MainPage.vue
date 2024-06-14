<script setup lang="ts">
import CarouselImage1 from '@assets/images/main/main-carousel1.jpg'
import CarouselImage2 from '@assets/images/main/main-carousel2.jpg'
import CarouselImage3 from '@assets/images/main/main-carousel3.jpg'
import Kitchen from '@assets/images/main/kitchen.jpg'
import BathBody from '@assets/images/main/bathBody.jpg'
import Bedding from '@assets/images/main/bedding.jpg'
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

const carouselImages = [CarouselImage1, CarouselImage2, CarouselImage3] as const

const categoryImages = [Kitchen, BathBody, Bedding] as const

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
    <v-carousel :interval="INTERVAL_DURATION" class="carousel" :show-arrows="false" :touch="true">
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
          <CategoryCard :categoryTitle="link.parent.name" :imageSource="categoryImages[index]" />
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
  border: 1px solid constants.$color-primary;
  border-radius: 10px;
  font-family: constants.$font-heading;

  &__carousel-item-wrapper {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-around;

    width: 50%;
    height: 100%;
    padding: 5rem;

    background-color: constants.$color-background-opacity;
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
