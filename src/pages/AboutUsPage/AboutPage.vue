<script setup lang="ts">
import IconRSSLogo from '@components/icons/IconRSSLogo.vue'
import AboutCard from './component/AboutCard.vue'
const ourInfo = [
  {
    name: 'Maria',
    imageSrc:
      'https://lh3.googleusercontent.com/pw/AP1GczMUohtjgqjz7wdrkG2F41R1a9ba-z3Yq-XtrPvY24KeAtHZjyRAOEmJFnFfI9VQ1BlNNfAT_qfjvHcx_uXZ3lcN2fO6CXYQIR3JWIRefUdazgpvzi_pzuptTfV89nJP-mWerlPJiNxMeZRyfUMGzmcLlnB8qrIR4i6t_Ib0tlQE-px9zugNcMo5Pe-2rbRFjwfcLLDVXJfGuk1xgZ9DmJEUsjTcmaAQczTjdt3gARWsDUIgg1KelcDRV7T3o2qm90Xom-omL_Y6YTMLNTQI2hbDABPxdEhlNDy_epPwxAtWJqH9DEKdiLYCoCKv8nwGvImaS8WfTe--h3ypU55JHTwEBnJNSBq5R6yfkjULf3VQ4XjRYyRRPkkb9XvfxsU0dMJhAk2sU9xh62VkICSJApySn944sxZ8p76k-vaPPPkXDJ0P8weXYu8S6ur5U76zj2eJTxk1N5IDqiufGGZpa6_IM8oK0EAB1QMP_KdRE8AKcUyHhQoAERqEACerYAQ3HHO1NLkQ6B_eT2q-3ZYKbIVWveulstHSSt19SYKYZ-Kho8qqiMYm_UMcIHZSuZvELpu5YovUN05E5oCHFAse530PjcUB6s4zWBbiBBhAsOQz76eQ7eB4yUXjRyNO1JJWUq9pPwxvoeiVGm7FtQcDqPZMrjRVEoV0B463GVneITJ76f-wVQGteboKkkH0SHG6OymwPx3Ru3OrCycMv16i3vfx2gewdSuKnqq_uNToaWyhX9Qc7TK3zZxqrfp-8MLgT2RRrztOvpmG_QEafpQYwi4cy3CtaZJyFMZOgoPA1VGlrFztH9sUOYRIFcRSkRaFdEZykxrhilpaBmj4inUGg8veaNbzwpEqfouvepWjEYgOuBt7SjtPdcnxpXP1a3sq5Gzy4YMOFGFXV5ribWQCkQLzyw=w1031-h1375-s-no-gm?authuser=0',
    role: 'Team lead / Frontend developer',
    bio: 'A meticulous perfectionist with a keen eye for detail',
    contributions: 'Configuring the repository and task board, header, catalog page, routing, cart page, products service',
    githubLink: 'https://github.com/rykovamariia',
  },
  {
    name: 'Julia',
    imageSrc: 'https://avatars.githubusercontent.com/u/25349576?v=4',
    role: 'Frontend developer',
    bio: 'A passionate and enthusiastic developer who is always eager to learn new technologies and techniques',
    contributions: 'Footer, profile, 404 pages, API client service, a lot of work with SDK, adding product to cart',
    githubLink: 'https://github.com/yuliyavoronovich',
  },
  {
    name: 'Karina',
    imageSrc:
      'https://lh3.googleusercontent.com/a/ACg8ocLWno28AHmrcPaNB_CsGCDlBifKR1jmQQBv2uKoyAGhGTgNz04CoSNTLTF09SPI2DUz9-2JqCqlwVAOVCY_ryc67fp9n6NS=s576-c-no',
    role: 'Frontend developer',
    bio: 'Reliable and conscientious team member who consistently delivers high-quality work on time',
    contributions: '  Configuration project, main, login, registration, product and about us pages',
    githubLink: 'https://github.com/chickenmcnuggetss',
  },
]
</script>

<template>
  <v-col>
    <h1>About us</h1>
    <v-col class="container">
      Hello! You are on the website of our e-commerce application. We were able to manage this
      interesting and exciting challenge due to the coordination of team members and a clear
      division of responsibilities. Daily meetings and code reviews help us detect bugs early on and
      optimize the code. It has been a wonderful journey full of new knowledge. We would like to
      express our gratitude to
      <a href="https://github.com/teleuzi"
        >Yauheni (aka Teleuzi aka 801 aka TheBestMentorEver aka Expert)</a
      >
    </v-col>
    <v-col
      style="padding: 1rem 0"
      v-for="({ name, role, imageSrc, bio, contributions, githubLink }, n) in ourInfo"
      :key="name"
      
    >
      <AboutCard
        :name="name"
        :role="role"
        :bio="bio"
        :imageSrc="imageSrc"
        :contributions="contributions"
        :githubLink="githubLink"
        :indexNumber="n"
      />
    </v-col>
    <v-col class="container">
      <a href="https://rs.school"><IconRSSLogo /></a>
    </v-col>
  </v-col>
</template>

<style lang="scss" scoped>
.container {
  padding: 1rem 0;
}
</style>
