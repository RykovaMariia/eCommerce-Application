<script setup lang="ts">
import { getApiRoot, projectKey } from '../api/BuildClient'
import { reactive, onMounted } from 'vue'

defineProps<{
  msg: string
}>()

let apiData = reactive({})

onMounted(() => {
  console.warn(projectKey)
  try {
    apiData = getApiRoot().withProjectKey({ projectKey }).get().execute()
  } catch (e) {
    console.error(e)
  }
})
</script>

<template>
  {{ apiData }}
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
    </h3>
  </div>
</template>

<style scoped>
h1 {
  position: relative;
  top: -10px;
  font-size: 2.6rem;
  font-weight: 500;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (width >= 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
