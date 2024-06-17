<script setup lang="ts">
import IconLogo from '@components/icons/IconLogo.vue'
import iconLeaf from '@assets/images/main/icon-leaf.svg'
import iconGift from '@assets/images/main/icon-gift.svg'
import iconRocket from '@assets/images/main/icon-rocket.svg'
import iconLicense from '@assets/images/main/icon-license.svg'
import { useCategoriesStore } from '@/stores/categories'
import { storeToRefs } from 'pinia'
import AdvantageCard from '@pages/MainPage/components/AdvantageCard.vue'
import CategoryCard from '@pages/MainPage/components/CategoryCard.vue'
import { RouterLink } from 'vue-router'
import { computed } from 'vue'

const intervalDurationCarousel = 6000

const carouselImages = [
  'https://zerowastestore.com/cdn/shop/files/zero-waste-products-hero.jpg?v=1673063098&width=2000',
  'https://cdn.shopify.com/s/files/1/2806/9936/t/71/assets/feb2023_banner_beddingandbath_websize-1677783445347.jpg?v=1677783446',
  'https://cdn.shopify.com/s/files/1/2806/9936/t/71/assets/pf-96b79d63--bannerdishbrush.png?v=1632257175',
] as const

const titleGreeting = ['Welcome', 'Sustainability and style', 'Discover organic products'] as const

const advantages = [
  {
    iconSrc: iconLeaf,
    text: 'Eco friendly goods',
  },
  {
    iconSrc: iconGift,
    text: 'Eco packaging',
  },
  {
    iconSrc: iconRocket,
    text: 'Fast delivery',
  },
  {
    iconSrc: iconLicense,
    text: 'Certificated products',
  },
] as const

const { categoriesLinks } = storeToRefs(useCategoriesStore())

const categories = computed(() => categoriesLinks.value.slice(1))
</script>

<template>
  <div class="title">
    <span class="title_upper-line">Green city style</span>
    <span class="title_bottom-line">Eco goods store</span>
  </div>
  <div class="wrapper">
    <v-carousel
      cycle
      :interval="intervalDurationCarousel"
      class="carousel"
      :show-arrows="false"
      :touch="true"
    >
      <v-carousel-item v-for="(url, index) in carouselImages" :key="url" :src="url" cover>
        <v-col class="carousel__carousel-item-wrapper">
          <div class="carousel__carousel-text">{{ titleGreeting[index] }}</div>
          <RouterLink to="/catalog" class="carousel__link"
            >Go to catalog <v-icon icon="mdi-chevron-right"></v-icon
          ></RouterLink>
        </v-col>
      </v-carousel-item>
    </v-carousel>
  </div>

  <div class="advantages-wrapper">
    <div v-for="{ iconSrc, text } in advantages" :key="iconSrc">
      <AdvantageCard :iconSrc="iconSrc" :text="text" />
    </div>
  </div>

  <div class="wrapper">
    <div class="promocodes">
      <div class="promocodes__text d-flex flex-column justify-center">
        <div>Get your promo code:</div>
        <div class="promocodes__container">
          <div class="promocodes__icon">
            <IconLogo :isLight="true" />
          </div>
          <div class="promocodes__names">
            <div>UTIANELOX - 10% for all</div>
            <div>THE-BEST-MENTOR-YAUHENI - 80.1% for Bedding</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <h2 class="categories__title">Categories</h2>
  <div class="categories__container">
    <div v-for="link in categories" :key="link.parent.name">
      <RouterLink :to="link.parent.href">
        <CategoryCard :categoryTitle="link.parent.name" :imageSource="link.parent.description" />
      </RouterLink>
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
  line-height: 100%;
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
  padding: 2.5rem 0;
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

    background: linear-gradient(90deg, constants.$color-background-opacity 10%, transparent);
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
        color: constants.$color-text-light;
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
    line-height: 110%;
    color: constants.$color-text-light;
    text-transform: uppercase;
  }

  &__names {
    font-size: 3rem;
  }

  &__container {
    display: flex;
    gap: 2rem;
    align-items: center;
    justify-content: end;
  }

  &__icon svg {
    width: 4rem;
    height: 4rem;
  }
}

@include mixins.media-tablet {
  .title {
    font-size: 3rem;
  }

  .categories {
    &__title {
      font-size: 1.9rem;
    }

    &__container {
      gap: 0.5rem;
    }
  }

  .promocodes {
    padding: 1.9rem;

    &__text {
      font-size: 2.7rem;
    }

    &__names {
      font-size: 2.4rem;
    }

    &__container {
      display: flex;
      gap: 1.6rem;
      align-items: center;
      justify-content: end;
    }

    &__icon svg {
      width: 4rem;
      height: 4rem;
    }
  }
}

@include mixins.media-middle {
  .title {
    font-size: 2.8rem;

    &_bottom-line {
      text-align: left;
    }
  }

  .advantages-wrapper {
    justify-content: center;
  }

  .categories {
    &__container {
      align-items: center;
      justify-content: center;
    }
  }

  .carousel {
    &__carousel-text {
      font-size: 2.8rem;
    }

    &__link {
      font-size: 1rem;
    }

    &__carousel-item-wrapper {
      width: 100%;
      padding: 3rem;
      background-color: transparent;
    }
  }

  .promocodes {
    padding: 1.2rem;

    &__text {
      font-size: 2rem;
    }

    &__names {
      font-size: 1.6rem;
    }

    &__icon svg {
      display: none;
    }
  }
}

@include mixins.media-mobile {
  .title {
    font-size: 2rem;
  }

  .wrapper {
    padding: 2rem 0;
  }

  .carousel {
    &__carousel-text {
      font-size: 2.6rem;
    }

    &__carousel-item-wrapper {
      width: 100%;
      padding: 2rem;
    }
  }

  .promocodes {
    &__text {
      font-size: 1.4rem;
    }

    &__names {
      font-size: 1.2rem;
    }
  }
}

@include mixins.media-mini-mobile {
  .title {
    font-size: 1.8rem;
  }

  .categories {
    &__title {
      font-size: 1.8rem;
    }
  }

  .carousel {
    &__carousel-text {
      font-size: 2rem;
    }

    &__carousel-item-wrapper {
      width: 100%;
      padding: 1.3rem;
    }
  }
}
</style>
