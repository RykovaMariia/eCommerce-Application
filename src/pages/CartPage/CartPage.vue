<script setup lang="ts">
import ProductInCart from '@/components/productIn-cart/ProductInCart.vue'
import Input from '@/components/inputs/Input.vue'
import Button from '@/components/buttons/Button.vue'
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import { getPriceAccordingToFractionDigits } from '@/utils/formatPrice'
import IconHeart from '@/components/icons/IconHeart.vue'

const { cart } = storeToRefs(useCartStore())

const promoCode = ref('')
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
      :attributes="variant.attributes"
    />

    <div class="d-flex cart-total">
      <v-form>
        <div class="d-flex promo-code">
          <Input
            class="promo-code-input"
            label="Enter your promo code:"
            placeholder="Your promo code"
            v-model="promoCode"
            isHideDetails="auto"
          />
          <Button
            textContent="Apply"
            variant="outlined"
            classes="primary"
            buttonType="submit"
            :disabled="!promoCode"
          />
        </div>
      </v-form>
      <div class="total-price">
        Total: €{{ getPriceAccordingToFractionDigits(cart.totalPrice) }}
      </div>
    </div>
  </div>
  <div v-if="!cart?.totalLineItemQuantity" class="d-flex empty-cart">
    <IconHeart class="icon-heart" />
    <div class="tittle">The cart is empty</div>
    <div>
      It's time to add something:
      <RouterLink class="catalog-link" to="/catalog">Go to catalog</RouterLink>
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

.promo-code-input {
  width: 20rem;
  padding: 0;
}

.promo-code {
  gap: 1rem;
  align-items: center;
  justify-content: center;
}

.total-price {
  font-size: 1.7rem;
}

.empty-cart {
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.icon-heart {
  margin-bottom: 1.4rem;
}

.tittle {
  font-size: 1.4rem;
  opacity: 0.7;
}

.catalog-link {
  text-decoration: underline;
}
</style>
