<script setup lang="ts">
import { FULL_PERCENTAGE } from '@/constants/constants'
import NumberInput from '../inputs/NumberInput.vue'
import { localStorageService } from '@/services/storageService'
import { ref } from 'vue'
import { cartService } from '@/services/cartService'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart'

const props = defineProps<{
  srcImg: string
  name: string
  price: number
  discountedPrice?: number
  productSlug: string
  productKey: string
  productId: string
  quantity: number
  lineItemId: string
}>()

const quantity = ref(props.quantity)

const href = { name: 'productId', params: { productId: props.productSlug } }

const passProductKey = () => {
  localStorageService.saveData('productKey', props.productKey)
}

const { cart } = storeToRefs(useCartStore())

function updateQuantity() {
  if (cart.value) {
    cartService
      .changeProductQuantity(cart.value.id, cart.value.version, props.lineItemId, quantity.value)
      .then(({ body }) => useCartStore().setCart(body))
  }
}
</script>
<template>
  <v-card elevation="0" variant="text" class="d-flex product-in-cart">
    <RouterLink :to="href" @click="passProductKey">
      <v-img height="200" width="200" :src="srcImg" cover></v-img
    ></RouterLink>

    <v-col class="product-info">
      <div class="d-flex product-title">
        <v-card-title>{{ name }}</v-card-title>
        <div class="d-flex icons">
          <v-card-actions
            ><v-btn icon>
              <v-icon color="primary">mdi-heart-outline</v-icon>
            </v-btn>
          </v-card-actions>
          <v-card-actions
            ><v-btn icon>
              <v-icon color="primary">mdi-trash-can-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </div>
      </div>
      <div class="d-flex">blablabla</div>
      <div class="d-flex product-prices">
        <NumberInput v-model="quantity" @update:modelValue="updateQuantity" />
        <v-card-text
          ><span class="price_discount" v-if="discountedPrice"
            >€{{ discountedPrice / FULL_PERCENTAGE }}&nbsp;</span
          >
          <span :class="discountedPrice ? 'line-through' : 'price'"
            >€{{ price / FULL_PERCENTAGE }}</span
          >
        </v-card-text>
      </div>
    </v-col>
  </v-card>

  <v-divider inset color="primary" opacity="0.4" thickness="2"></v-divider>
</template>

<style lang="scss" scoped>
@use '@/styles/constants.scss';

.product-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
}

.product-title {
  align-items: center;
  justify-content: space-between;
}

.product-in-cart {
  gap: 3rem;
  padding: 2rem;
}

::v-deep(.v-card__overlay) {
  display: none;
}

::v-deep(.v-img__img--cover) {
  transform: scale(1);
  transition: all 0.6s ease 0s;
}

.v-img {
  flex: 0 0 auto;
  border: 1px solid constants.$color-primary;
  border-radius: 10px;
}

.v-card-title {
  padding: 0.5rem 0;
  font-size: 1.7rem;
  color: constants.$color-primary;
  white-space: normal;
}

.v-card-text {
  flex-grow: 0;
  font-size: 1.6rem;
}

.product-prices {
  align-items: center;
  justify-content: space-between;
}

.price {
  flex-grow: 0;
  font-weight: 500;

  &_discount {
    color: constants.$color-sale;
  }
}

.discount {
  position: absolute;
  top: 1px;
  left: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 3.3rem;
  height: 4.1rem;
  padding-top: 10px;

  color: constants.$color-text-light;

  background-color: constants.$color-sale;
  border-radius: 0 0 10px 10px;
}

.line-through {
  color: constants.$color-text-dark;
  text-decoration: line-through;
  opacity: 0.8;
}

.v-card-actions {
  padding: 0;
}
</style>
