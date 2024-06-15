<script setup lang="ts">
import ProductInCart from './components/ProductInCart.vue'
import ClearCartDialog from './components/ClearCartDialog.vue'
import Input from '@/components/inputs/Input.vue'
import Button from '@/components/buttons/Button.vue'
import { computed, ref, watch, type Ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import { getPriceAccordingToFractionDigits } from '@/utils/formatPrice'
import IconHeart from '@/components/icons/IconHeart.vue'
import { cartApiService } from '@/services/cartApiService'
import { useAlertStore } from '@/stores/alert'
import Price from '@/components/price/Price.vue'
import type { CartLineItem } from '@/interfaces/cartLineItem'

const { cart } = storeToRefs(useCartStore())

const promoCode = ref('')

function applyPromoCode() {
  if (cart.value) {
    cartApiService
      .applyPromoCode(cart.value.id, cart.value.version, promoCode.value)
      .then(({ body }) => {
        useCartStore().setCart(body)
      })
      .catch((error: Error) => {
        useAlertStore().show(error.message, 'warning')
      })
  }
}

const cartLineItem: Ref<CartLineItem[] | undefined> = ref()

const totalPriceWithoutDiscount = ref(0)

const totalPrice = computed(() => getPriceAccordingToFractionDigits(cart.value?.totalPrice))

watch(
  () => cart,
  () => {
    if (cart.value?.totalLineItemQuantity) {
      totalPriceWithoutDiscount.value = 0
      cartLineItem.value = cart.value.lineItems.map((lineItem) => {
        const {
          name,
          variant,
          price,
          discountedPricePerQuantity,
          productSlug,
          productId,
          quantity,
          id,
        } = lineItem

        totalPriceWithoutDiscount.value += getPriceAccordingToFractionDigits(price.value, quantity)

        return {
          name: name['en-GB'],
          srcImg: variant.images?.length ? variant.images?.[0].url : '',
          price: getPriceAccordingToFractionDigits(price.value, quantity),
          discountedPrice: getPriceAccordingToFractionDigits(
            discountedPricePerQuantity.length
              ? discountedPricePerQuantity[0].discountedPrice.value
              : price.discounted?.value,
            quantity,
          ),
          productSlug: productSlug?.['en-GB'] ?? '',
          productId,
          quantity,
          lineItemId: id,
          attributes: variant.attributes,
          variantId: variant.id,
        }
      })
    }
  },
  { deep: true, immediate: true },
)
</script>

<template>
  <div v-if="cart?.totalLineItemQuantity">
    <ProductInCart
      v-for="{
        name,
        srcImg,
        price,
        discountedPrice,
        productSlug,
        productId,
        quantity,
        lineItemId,
        attributes,
        variantId,
      } in cartLineItem"
      :key="lineItemId"
      :srcImg
      :name
      :price
      :discountedPrice
      :productSlug
      :product-id="productId"
      :quantity
      :lineItemId
      :attributes
      :variantId
    />
    <div class="d-flex cart-total">
      <v-form @submit.prevent="applyPromoCode">
        <div class="d-flex promo-code">
          <Input
            class="promo-code-input"
            label="Enter promo code:"
            placeholder="Your promo code"
            v-model="promoCode"
            isHideDetails="auto"
          />
          <Button textContent="Apply" color="primary" buttonType="submit" :disabled="!promoCode" />
        </div>
      </v-form>
      <div class="total-price">
        Total:
        <Price
          :isWithDiscount="totalPriceWithoutDiscount !== totalPrice"
          :price="parseFloat(totalPriceWithoutDiscount.toFixed(2))"
          :priceWithDiscount="totalPrice"
        />
      </div>
    </div>
    <v-col class="clear-cart"> <ClearCartDialog /></v-col>
  </div>
  <div v-else class="d-flex empty-cart">
    <IconHeart class="icon-heart" />
    <div class="title">The cart is empty</div>
    <div>
      It's time to add something:
      <RouterLink class="catalog-link" to="/catalog">Go to catalog</RouterLink>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use '@/styles/mixins.scss';

.cart-total {
  @include mixins.media-tablet {
    padding: 1rem 0;
  }

  @include mixins.media-mobile {
    justify-content: end;
  }
  flex-wrap: wrap;
  gap: 1rem 3rem;
  align-items: center;
  justify-content: space-between;

  padding: 2rem;
}

.promo-code-input {
  @include mixins.media-tablet {
    width: 12.5rem;
  }
  width: 20rem;
  padding: 0;
}

.v-form {
  @include mixins.media-mobile {
    display: flex;
    width: 100%;
  }
}

.promo-code {
  gap: 1rem;
  align-items: center;
  justify-content: center;
}

.total-price {
  @include mixins.media-tablet {
    font-size: 1.3rem;
  }
  font-size: 1.5rem;
}

.clear-cart {
  @include mixins.media-tablet {
    padding: 1rem 0;
  }
  display: flex;
  justify-content: end;
  padding: 1rem 2rem;
}

.empty-cart {
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.icon-heart {
  margin-bottom: 1.4rem;
}

.title {
  font-size: 1.4rem;
  opacity: 0.7;
}

.catalog-link {
  text-decoration: underline;
}
</style>
