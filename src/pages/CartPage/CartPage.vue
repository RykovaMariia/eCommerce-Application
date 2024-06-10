<script setup lang="ts">
import ProductInCart from '@/components/productIn-cart/ProductInCart.vue'
import Input from '@/components/inputs/Input.vue'
import Button from '@/components/buttons/Button.vue'
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import { FULL_PERCENTAGE } from '@/constants/constants'
import { getPriceAccordingToFractionDigits } from '@/utils/formatPrice'

const { cart } = storeToRefs(useCartStore())

const promocode = ref('')
</script>

<template>
  <div v-if="cart?.totalLineItemQuantity">
    <ProductInCart
      v-for="{
        name,
        variant,
        totalPrice,
        price,
        productSlug,
        productId,
        quantity,
        id,
      } in cart.lineItems"
      :key="name['en-GB']"
      :srcImg="variant.images?.[0].url ?? ''"
      :name="name['en-GB']"
      :price="getPriceAccordingToFractionDigits(totalPrice)"
      :discountedPrice="getPriceAccordingToFractionDigits(price.discounted?.value)"
      :productSlug="productSlug?.['en-GB'] ?? ''"
      :product-id="productId"
      :quantity="quantity"
      :lineItemId="id"
    />

    <div class="d-flex cart-total">
      <v-form>
        <div class="d-flex promocode">
          <Input
            class="promocode-input"
            label="Enter your promo code:"
            placeholder="Your promo code"
            v-model="promocode"
            isHideDetails="auto"
          />
          <Button
            textContent="Apply"
            variant="outlined"
            classes="primary"
            buttonType="submit"
            :disabled="!promocode"
          />
        </div>
      </v-form>
      <div class="total-price">Total: €{{ cart.totalPrice.centAmount / FULL_PERCENTAGE }}</div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use '@styles/constants.scss';

.cart-total {
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
}

.promocode-input {
  width: 20rem;
  padding: 0;
}

.promocode {
  gap: 1rem;
  align-items: center;
  justify-content: center;
}

.total-price {
  font-size: 1.7rem;
}
</style>
