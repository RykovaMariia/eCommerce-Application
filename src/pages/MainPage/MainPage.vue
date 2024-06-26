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
        <v-col class="carousel-item-wrapper">
          <div class="carousel-text">{{ titleGreeting[index] }}</div>
          <RouterLink to="/catalog" class="link"
            >Go to catalog <v-icon icon="mdi-chevron-right"></v-icon
          ></RouterLink>
        </v-col>
      </v-carousel-item>
    </v-carousel>
  </div>

  <div class="advantages-container">
    <div v-for="{ iconSrc, text } in advantages" :key="iconSrc" class="advantages-wrapper">
      <AdvantageCard :iconSrc="iconSrc" :text="text" />
    </div>
  </div>

  <div class="wrapper">
    <div class="promocodes">
      <div class="promocodes-text d-flex flex-column justify-center">
        <div>Get your promo code:</div>
        <div class="promocodes-container">
          <div class="promocodes-icon">
            <IconLogo :isLight="true" />
          </div>
          <div class="promocodes-names">
            <div>UTIANELOX - 10% for all</div>
            <div>THE-BEST-MENTOR-YAUHENI - 80.1% for Bedding</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <h2 class="categories-title">Categories</h2>
  <div class="categories-container">
    <div v-for="link in categories" :key="link.parent.name" class="category-wrapper">
      <CategoryCard
        :categoryTitle="link.parent.name"
        :imageSource="link.parent.description"
        :to="link.parent.href"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/constants.scss';
@use '@styles/mixins.scss';

.title {
  @include mixins.media-tablet {
    font-size: 3rem;
  }

  @include mixins.media-middle {
    font-size: 2.8rem;

    &_bottom-line {
      text-align: left;
    }
  }

  @include mixins.media-mobile {
    font-size: 2rem;
  }

  @include mixins.media-mini-mobile {
    font-size: 1.8rem;
  }

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
  @include mixins.media-mobile {
    padding: 2rem 0;
  }
  padding: 2.5rem 0;
}

.carousel {
  font-family: constants.$font-heading;
  border: 1px solid constants.$color-primary;
  border-radius: 10px;
}

.carousel-item-wrapper {
  @include mixins.media-middle {
    width: 100%;
    padding: 3rem;
    background-color: transparent;
  }

  @include mixins.media-mobile {
    padding: 2rem;
  }

  @include mixins.media-mini-mobile {
    padding: 1.3rem;
  }
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-around;

  width: 50%;
  height: 100%;
  padding: 5rem;

  background: linear-gradient(90deg, constants.$color-background-opacity 10%, transparent);
}

.title-greeting {
  font-size: 4rem;
  color: constants.$color-text-dark;
}

.carousel-text {
  @include mixins.media-middle {
    font-size: 2.8rem;
  }

  @include mixins.media-mobile {
    font-size: 2.6rem;
  }

  @include mixins.media-mini-mobile {
    font-size: 2rem;
  }

  font-size: 3rem;
  color: constants.$color-text-dark;
}

.link {
  @include mixins.media-middle {
    font-size: 1rem;
  }
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

::v-deep(.v-carousel__controls) {
  color: constants.$color-primary;
  background: transparent;
}

::v-deep(.v-carousel__controls__item .v-icon) {
  opacity: 0.8;
}

.advantages-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
}

.advantages-wrapper {
  flex-grow: 1;
}

.categories-title {
  @include mixins.media-tablet {
    font-size: 1.9rem;
  }

  @include mixins.media-mini-mobile {
    font-size: 1.8rem;
  }
  padding-bottom: 1rem;
  color: constants.$color-primary;
}

.categories-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;
}

.promocodes {
  @include mixins.media-tablet {
    padding: 1.9rem;
  }

  @include mixins.media-middle {
    padding: 1.2rem;
  }
  padding: 3rem;
  background-color: constants.$color-primary;
  border-radius: 10px;
}

.promocodes-text {
  @include mixins.media-tablet {
    font-size: 2.7rem;
  }

  @include mixins.media-middle {
    font-size: 2rem;
  }

  @include mixins.media-mobile {
    font-size: 1.4rem;
  }

  font-family: constants.$font-heading;
  font-size: 3.6rem;
  line-height: 110%;
  color: constants.$color-text-light;
}

.promocodes-names {
  @include mixins.media-tablet {
    font-size: 2.4rem;
  }

  @include mixins.media-middle {
    font-size: 1.6rem;
  }

  @include mixins.media-mobile {
    font-size: 1.2rem;
  }
  font-size: 3rem;
}

.promocodes-container {
  @include mixins.media-tablet {
    gap: 1.6rem;
  }
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: end;
}

.promocodes-icon svg {
  @include mixins.media-middle {
    display: none;
  }
  width: 4rem;
  height: 4rem;
}

.category-wrapper {
  flex-grow: 1;
}
</style>
