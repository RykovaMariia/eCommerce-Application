<script setup lang="ts">
import IconRSSLogo from '@components/icons/IconRSSLogo.vue'
import AboutCard from './component/AboutCard.vue'
import { OUR_INFO } from '@/constants/constants';
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
      class="container"
      v-for="({ name, role, imageSrc, bio, contributions, githubLink }, n) in OUR_INFO"
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
