<script setup lang="ts">
import NumberInput from '@components/inputs/NumberInput.vue'
import { localStorageService } from '@/services/storageService'
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart'
import type { Attribute, ShoppingListLineItem } from '@commercetools/platform-sdk'
import IconNoImg from '@components/icons/IconNoImg.vue'
import { cartApiService } from '@/services/cartApiService'
import Price from '@components/price/Price.vue'
import { favoritesService } from '@/services/favoritesService'
import { useFavoritesStore } from '@/stores/favorites'
import { favoritesApiService } from '@/services/favoritesApiService'
import { useAlertStore } from '@/stores/alert'

const props = defineProps<{
  srcImg: string
  name: string
  price: number
  discountedPrice?: number
  productSlug: string
  productId: string
  quantity: number
  lineItemId: string
  attributes?: Attribute[]
  variantId: number
}>()

const alert = useAlertStore()
const { favorites } = storeToRefs(useFavoritesStore())
const quantity = ref(props.quantity)
const isAddedInFavorites = ref(isProductInFavorites())

function isProductInFavorites() {
  if (!favorites.value?.lineItems) {
    return false
  }
  return favoritesService.isProductInFavorites(favorites.value?.lineItems, props.productId)
}

const href = { name: 'productId', params: { productId: props.productSlug } }

const passProductId = () => {
  localStorageService.saveData('productId', props.productId)
}

const { cart } = storeToRefs(useCartStore())

function updateQuantity() {
  if (cart.value) {
    cartApiService
      .changeProductQuantity({
        id: cart.value.id,
        version: cart.value.version,
        lineItemId: props.lineItemId,
        quantity: quantity.value,
      })
      .then(({ body }) => useCartStore().setCart(body))
  }
}

function removeLineItem() {
  if (cart.value) {
    cartApiService
      .removeLineItem({
        id: cart.value.id,
        version: cart.value.version,
        lineItemId: props.lineItemId,
      })
      .then(({ body }) => useCartStore().setCart(body))
  }
}

const heartIcon = computed(() => {
  return isAddedInFavorites.value ? 'mdi-heart' : 'mdi-heart-outline'
})

function clickHeart() {
  if (!isAddedInFavorites.value) {
    isAddedInFavorites.value = true
    favoritesService
      .addProductToFavoritesList(props.productId, favorites.value)
      .catch((error: Error) => {
        alert.show(`Error: ${error.message}`, 'warning')
      })
  } else {
    isAddedInFavorites.value = false
    const favoritesLineItemId = favoritesService.getLineIdByProduct(
      useFavoritesStore().favorites?.lineItems as ShoppingListLineItem[],
      props.productId,
      props.variantId,
    )
    if (favorites.value?.id) {
      favoritesApiService
        .removeLineItemFromFavorites({
          id: favorites.value.id,
          version: favorites.value.version,
          lineItemId: favoritesLineItemId ?? '',
        })
        .then(({ body }) => {
          useFavoritesStore().setFavorites(body)
        })
        .catch((error: Error) => {
          alert.show(`Error: ${error.message}`, 'warning')
        })
    }
  }
}
</script>
<template>
  <v-card elevation="0" variant="text" class="d-flex product-in-cart">
    <RouterLink :to="href" @click="passProductId">
      <v-img v-if="srcImg" :src="srcImg" cover></v-img>
      <IconNoImg v-if="!srcImg" class="no-img" />
    </RouterLink>

    <v-col class="product-info">
      <div class="d-flex product-title">
        <v-card-title>{{ name }}</v-card-title>
        <div class="d-flex icons">
          <v-card-actions
            ><v-btn icon @click="clickHeart">
              <v-icon color="primary">{{ heartIcon }}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-card-actions
            ><v-btn icon @click="removeLineItem">
              <v-icon color="primary">mdi-trash-can-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </div>
      </div>
      <div>
        <div v-for="{ name, value } in attributes" :key="name">{{ name }}: {{ value[0].key }}</div>
      </div>
      <div class="d-flex product-prices">
        <NumberInput v-model="quantity" @update:modelValue="updateQuantity" />
        <v-card-text
          ><Price
            :isWithDiscount="!!discountedPrice"
            :price="price"
            :priceWithDiscount="discountedPrice"
        /></v-card-text>
      </div>
    </v-col>
  </v-card>

  <v-divider class="divider" color="primary" opacity="0.4" thickness="2"></v-divider>
</template>

<style lang="scss" scoped>
@use '@/styles/constants.scss';
@use '@/styles/mixins.scss';

.product-in-cart {
  @include mixins.media-tablet {
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    padding: 1rem 0;
  }

  gap: 3rem;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.v-img {
  @include mixins.media-tablet {
    width: 150px;
    height: 150px;
  }

  flex: 0 0 auto;

  width: 200px;
  height: 200px;

  border: 1px solid constants.$color-primary;
  border-radius: 10px;

  &:hover {
    color: constants.$color-text-dark;

    ::v-deep(.v-img__img--cover) {
      transform: scale(1.1);
    }
  }
}

::v-deep(.v-img__img--cover) {
  transform: scale(1);
  transition: all 0.6s ease 0s;
}

.no-img {
  @include mixins.media-tablet {
    width: 150px;
    height: 150px;
  }
  flex: 0 0 auto;

  width: 200px;
  height: 200px;
  padding: 3.5rem;

  border: 1px solid constants.$color-primary;
  border-radius: 10px;
}

.product-info {
  @include mixins.media-tablet {
    justify-content: start;
  }

  @include mixins.media-mini-mobile {
    min-width: 20rem;
  }

  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;

  min-width: 25rem;
}

.product-title {
  align-items: center;
  justify-content: space-between;
}

.v-card-title {
  @include mixins.media-tablet {
    max-width: 18rem;
    font-size: 1.2rem;
  }

  @include mixins.media-mini-mobile {
    font-size: 1.1rem;
  }

  @include mixins.media-mini-mobile {
    max-width: 14rem;
  }

  max-width: 28rem;
  padding: 0.5rem 0;

  font-size: 1.7rem;
  color: constants.$color-primary;
  white-space: normal;
}

.v-card-actions {
  @include mixins.media-tablet {
    width: 2rem;
    height: 2rem;
  }

  @include mixins.media-mini-mobile {
    width: 1.7rem;
    height: 1.7rem;
  }
  padding: 0;
}

.v-btn {
  @include mixins.media-tablet {
    width: 2rem;
    height: 2rem;
  }

  @include mixins.media-mini-mobile {
    width: 1.7rem;
    height: 1.7rem;
  }
}

.v-card-text {
  @include mixins.media-tablet {
    font-size: 1.2rem;
  }

  flex-grow: 0;
  font-size: 1.5rem;
}

.product-prices {
  align-items: center;
  justify-content: space-between;
}

.divider {
  @include mixins.media-tablet {
    margin: 0;
  }
  margin-right: 1rem;
  margin-left: 15.6rem;
}
</style>
