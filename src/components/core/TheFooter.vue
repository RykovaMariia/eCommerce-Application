<script setup lang="ts">
import IconlogoWhite from '@components/icons/IconlogoWhite.vue'
const menuLinks = [
  {
    name: 'Catalog',
    href: '/catalog',
  },
  {
    name: 'About Us',
    href: '/about',
  },
  {
    name: 'Contact',
    href: '/contacts',
  },
]
const catalogLinks = [
  {
    name: 'Organic cosmetic',
    href: '/catalog',
  },
  {
    name: 'Hygiene products',
    href: '/catalog',
  },
  {
    name: 'Eco dishes',
    href: '/catalog',
  },
  {
    name: 'Shoppers',
    href: '/catalog',
  },
  {
    name: 'Gift sets',
    href: '/catalog',
  },
]
</script>
<template>
  <footer>
    <v-container class="container">
      <v-row class="footer-wrapper" justify="center" no-gutters>
        <v-col class="v-col-md-3">
          <v-slot class="logo"><IconlogoWhite /></v-slot>
          <div class="v-col-md-10 logo-text">
            Eco-friendly place, where sustainability meets style!
          </div>
        </v-col>

        <v-col>
          <div class="footer-wrapper-title">Menu</div>
          <div v-for="(link, index) in menuLinks" :key="index">
            <a :href="link.href">{{ link.name }}</a>
          </div>
        </v-col>

        <v-col>
          <div class="footer-wrapper-title">Catalog</div>
          <div v-for="(link, index) in catalogLinks" :key="index">
            <a :href="link.href">{{ link.name }}</a>
          </div>
        </v-col>

        <v-col class="v-col-md-3">
          <div class="contact-link">
            <a href="tel:+380057 000 00 00"
              ><v-icon icon="mdi-phone" size="x-small"></v-icon>+380057 000 00 00</a
            >
          </div>
          <div class="contact-link">
            <a href="mailto:green_city@gmail.com"
              ><v-icon icon="mdi-email" size="x-small"></v-icon>green_city@gmail.com</a
            >
          </div>
          <div class="icons">
            <a href="https://www.instagram.com/"
              ><v-icon icon="mdi-instagram" size="small"></v-icon
            ></a>
            <a href="https://www.facebook.com"
              ><v-icon icon="mdi-facebook" size="small"></v-icon
            ></a>
            <a href="https://www.twitter.com"><v-icon icon="mdi-twitter" size="small"></v-icon></a>
          </div>
        </v-col>
      </v-row>
      <v-row class="footer-under-line" justify="center" no-gutters>
        <v-col>© {{ new Date().getFullYear() }}</v-col>

        <v-spacer></v-spacer>

        <v-col>RS School</v-col>
      </v-row>
    </v-container>
  </footer>
</template>

<style lang="scss" scoped>
@use '@styles/constants.scss';

footer {
  margin-top: auto;
  padding: 3rem 0 1rem;

  color: constants.$color-text-light;

  background-color: constants.$color-primary;
  border-radius: 2rem 2rem 0.5rem 0.5rem;

  .footer-wrapper {
    position: relative;
    gap: 1rem;
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
    padding-top: 0.5rem;
    font-size: 0.75rem;
  }
}
</style>
