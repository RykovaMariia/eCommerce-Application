<script setup lang="ts">
import IconLogo from '@components/icons/IconLogo.vue'
import { CATALOG_MENU } from '@/constants/constants'

const menuLinks = [
  {
    name: 'Catalog',
    href: '/catalog',
  },
  {
    name: 'About Us',
    href: '/about',
  },
]

const creationYear = '2024'
</script>
<template>
  <footer>
    <v-container class="container">
      <v-row class="footer-wrapper" justify="center">
        <v-col class="v-col-md-3 v-col-sm-6 logo">
          <IconLogo :isLight="true" />
          <div class="v-col-md-10 logo-text">
            Eco-friendly place, where sustainability meets style!
          </div>
        </v-col>

        <v-col class="v-col-md-3 v-col-sm-6 menu">
          <div class="footer-wrapper-title">Menu</div>
          <div v-for="(link, index) in menuLinks" :key="index">
            <RouterLink :to="link.href">{{ link.name }}</RouterLink>
          </div>
        </v-col>

        <v-col class="v-col-md-3 catalog">
          <div class="footer-wrapper-title">Catalog</div>
          <div v-for="(link, index) in CATALOG_MENU" :key="index">
            <RouterLink :to="link.href">{{ link.name }}</RouterLink>
          </div>
        </v-col>

        <v-col class="v-col-md-3 contacts">
          <div class="contact-link">
            <a href="tel:+380057 000 00 00"
              ><v-icon icon="mdi-phone" size="small"></v-icon>+380057 000 00 00</a
            >
          </div>
          <div class="contact-link">
            <a href="mailto:green_city@gmail.com"
              ><v-icon icon="mdi-email" size="small"></v-icon>green_city@gmail.com</a
            >
          </div>
          <div class="icons">
            <a href="https://www.instagram.com/"><v-icon icon="mdi-instagram"></v-icon></a>
            <a href="https://www.facebook.com"><v-icon icon="mdi-facebook"></v-icon></a>
            <a href="https://www.twitter.com"><v-icon icon="mdi-twitter"></v-icon></a>
          </div>
        </v-col>
      </v-row>
      <v-row class="footer-under-line" justify="center" no-gutters>
        <v-col>© {{ creationYear }}</v-col>

        <v-spacer></v-spacer>

        <v-col>RS School</v-col>
      </v-row>
    </v-container>
  </footer>
</template>

<style lang="scss" scoped>
@use '@styles/constants.scss';
@use '@/styles/mixins.scss';

.v-container.container {
  @include mixins.media-mobile {
    padding: 0 1rem;
  }
  padding: 0 4rem;
}

footer {
  @include mixins.media-middle {
    .logo {
      order: 1;
    }

    .contacts {
      order: 2;
      margin-top: 3.5rem;
      padding-left: 3rem;
    }

    .menu {
      order: 3;
    }

    .catalog {
      order: 4;
      padding-left: 3rem;
    }
  }

  @include mixins.media-mobile {
    .footer-wrapper {
      font-size: 0.8rem;
    }

    .logo,
    .contacts,
    .menu {
      flex: 0 0 50%;
      max-width: 50%;
    }

    .contacts,
    .catalog {
      padding-left: 0.5rem;
    }
  }
  margin-top: auto;
  padding: 3rem 0 1rem;

  color: constants.$color-text-light;

  background-color: constants.$color-primary;
  border-radius: 2rem 2rem 0.5rem 0.5rem;

  .footer-wrapper {
    position: relative;
    padding-bottom: 1rem;

    &::after {
      content: '';

      position: absolute;
      bottom: 0;
      left: 0;

      width: 100%;
      height: 1px;

      background-color: constants.$color-text-light;
    }

    .footer-wrapper-title {
      margin-bottom: 1rem;
      font-weight: bold;
    }

    .logo-text {
      padding: 0;
    }

    a {
      color: inherit;
      text-decoration: none;
      transition: 0.5s;

      &:hover {
        color: constants.$color-text-placeholder;
      }
    }

    .contact-link {
      a {
        display: flex;
        gap: 0.2rem;
        align-items: center;
      }
    }

    .icons {
      cursor: pointer;

      display: flex;
      gap: 0.3rem;

      margin-top: 0.2rem;

      transition: 0.5s;

      .v-icon:hover {
        color: constants.$color-text-placeholder;
      }
    }

    .logo svg {
      width: 5rem;
      height: 5rem;
    }
  }

  .footer-under-line {
    padding-top: 1rem;
    font-size: 0.75rem;
  }
}
</style>
