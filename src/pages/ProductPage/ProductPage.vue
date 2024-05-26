<script setup lang="ts">
  import { productService } from '@/services/productService';
  import { onMounted, reactive } from 'vue'
  import Button from '@/components/buttons/Button.vue';
  import { ref } from 'vue'
  let model = reactive({ 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' })
  let key = ref(1)

  const product: Product = reactive({
    
  })

  onMounted(() => {
    productService
    .getProduct()
    .then((data) => {
      return data;
    })
    .catch((error: Error) => {
      console.warn(`Error: ${error.message}`, 'warning')
    })
  })
</script>

<template>
    <v-sheet class="mx-auto" max-width="500" max-height="400px">
      <v-sheet height="200">
        <div class="d-flex fill-height align-center justify-center">
          <h3>Selected {{ key }}</h3>
        </div>
      </v-sheet>
      <v-slide-group v-model="key">
        <v-slide-group-item v-for="n in model" :key="n" v-slot="{toggle}">
          <v-card :class="['ma-4']" height="100" width="100" @click="toggle">
            <div class="d-flex fill-height align-center justify-center"></div>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
    <v-col>
      <h2>Title</h2>
      <v-col>Description</v-col>
      <Button />
    </v-col>
</template>