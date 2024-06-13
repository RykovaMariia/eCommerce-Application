<script setup lang="ts">
import CarouselImage1 from '@assets/images/main/main-carousel1.jpg'
import CarouselImage2 from '@assets/images/main/main-carousel2.jpg'
import CarouselImage3 from '@assets/images/main/main-carousel3.jpg'
import IconRocket from '@components/icons/IconRocket.vue'
import Button from '@components/buttons/Button.vue'
import { useCategoriesStore } from '@/stores/categories'
import { storeToRefs } from 'pinia'

const { categoriesLinks } = storeToRefs(useCategoriesStore())

const INTERVAL_DURATION = 6000

const carouselImages = [CarouselImage1, CarouselImage2, CarouselImage3]

const titleGreeting = ['Welcome', 'Sustainability and style', 'Discover organic products']
</script>

<template>
  <div class="title">
    <div class="title_upper-line">Green city style</div>
    <div class="title_bottom-line">Eco goods store </div>
  </div>
  <div class="carousel-wrapper">
    <v-carousel
      cycle
      :interval="INTERVAL_DURATION"
      class="carousel"
      :show-arrows="false"
      :touch="true"
    >
      <v-carousel-item v-for="(url, n) in carouselImages" :key="url" :src="url" cover>
        <v-col class="wrapper">
          <div class="container">
            <h1 class="title-greeting" v-if="n === 0">{{ titleGreeting[n] }}</h1>
            <div class="carousel-text" v-else>{{ titleGreeting[n] }}</div>
            <Button
              textContent="Go to catalog"
              to="/catalog"
              color="secondary"
              size="large"
              class="button"
              append-icon="mdi-chevron-right"
            />
          </div>
        </v-col>
      </v-carousel-item>
    </v-carousel>
  </div>

  <IconRocket />

  <v-col>
    <h2>Categories</h2>
    <div v-for="(link, index) in categoriesLinks" :key="index" class="category">
      <RouterLink :to="link.parent.href">{{ link.parent.name }}</RouterLink>
    </div>
  </v-col>
  <!-- <div class="links">
    <RouterLink to="/login">Login</RouterLink>
    <RouterLink to="/registration">Registration</RouterLink>
    <RouterLink to="/catalog">Catalog</RouterLink>
    <RouterLink to="/profile">Profile</RouterLink>
    <RouterLink to="/cart">Cart</RouterLink>
    <RouterLink to="/about">About us</RouterLink>
    <RouterLink to="/favorites">Favorites</RouterLink>
    <RouterLink to="/product">Product</RouterLink>
  </div> -->
</template>

<style lang="scss" scoped>
@use '@/styles/constants.scss';

.title {
  display: flex;
  flex-direction: column;
  font-family: constants.$font-heading;
  color: constants.$color-primary;
  font-size: 4rem;
  text-transform: uppercase;

  &_upper-line {
    text-align: left;
  }

  &_bottom-line {
    text-align: right;
  }
}

.links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;

  a {
    max-width: max-content;
  }
}

.carousel-wrapper {
  padding: 1rem 0;
}

.carousel {
  border: 1px solid constants.$color-primary;
  border-radius: 10px;
}

::v-deep(.v-carousel__controls) {
  color: constants.$color-primary;
  background: transparent;
}

::v-deep(.v-carousel__controls__item .v-icon) {
  opacity: 0.8;
}

.container {
  padding: 0;
  color: constants.$color-text-light;
  border-radius: 10px;
}

.wrapper {
  display: flex;
  align-items: end;
  width: 50rem;
  height: 100%;
  padding: 5rem;
}

.title-greeting {
  font-size: 4rem;
  font-family: constants.$font-base;
  color: constants.$color-text-dark;
}

.carousel-text {
  color: constants.$color-text-dark;
  font-size: 3rem;
  font-family: constants.$font-base;
}
</style>
