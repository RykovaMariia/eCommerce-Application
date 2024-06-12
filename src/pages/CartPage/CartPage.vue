<script setup lang="ts">
import ProductInCart from '@/components/productIn-cart/ProductInCart.vue'
import ClearCartDialog from './components/ClearCartDialog.vue'
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
      v-for="{ name, variant, price, productSlug, productId, quantity, id } in cart.lineItems"
      :key="name['en-GB']"
      :srcImg="variant.images?.length ? variant.images?.[0].url : ''"
      :name="name['en-GB']"
      :price="getPriceAccordingToFractionDigits(price.value, quantity)"
      :discountedPrice="getPriceAccordingToFractionDigits(price.discounted?.value, quantity)"
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
            label="Enter promo code:"
            placeholder="Your promo code"
            v-model="promoCode"
            isHideDetails="auto"
          />
          <Button textContent="Apply" color="primary" buttonType="submit" :disabled="!promoCode" />
        </div>
      </v-form>
      <div class="total-price">
        Total: €{{ getPriceAccordingToFractionDigits(cart.totalPrice) }}
      </div>
    </div>
    <v-col class="clear-cart"> <ClearCartDialog /></v-col>
  </div>
  <div v-if="!cart?.totalLineItemQuantity" class="d-flex empty-cart">
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
