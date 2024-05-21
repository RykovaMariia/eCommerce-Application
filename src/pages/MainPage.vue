<script setup lang="ts"></script>

<template>
  <h1>Main</h1>
  <div class="links">
    <RouterLink to="/login">Login</RouterLink>
    <RouterLink to="/registration">Registration</RouterLink>
    <RouterLink to="/catalog">Catalog</RouterLink>
    <RouterLink to="/profile">Profile</RouterLink>
    <RouterLink to="/cart">Cart</RouterLink>
    <RouterLink to="/about">About us</RouterLink>
    <RouterLink to="/favorites">Favorites</RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  
  a {
    max-width: max-content;
  }
}
</style>
