<script setup lang="ts">
import ProductInCart from '@/components/productIn-cart/ProductInCart.vue'
import Input from '@/components/inputs/Input.vue'
import Button from '@/components/buttons/Button.vue'
import { ref } from 'vue'
import { FULL_PERCENTAGE } from '@/constants/constants'

const products = [
  {
    srcImg:
      'https://zerowastestore.com/cdn/shop/files/sustain-yourself-sensitive-skin-deodorant-3-scent-options-32612745314415.jpg?v=1697130835&width=1200',
    name: 'Sensitive Skin Deodorant',
    description:
      'Perfect for those with sensitive skin, this effective, all-natural deodorant is made with gentle ingredients & is baking soda free. Gentle & long-lasting, this deodorant is the perfect zero waste alternative to chemically-filled deodorant that comes in plastic. Magnesium hydroxide is added for its odor fighting benefits.',
    price: 799,
    discountedPrice: 766,
    slug: 'muslin-produce-ba',
    key: '201',
  },
  {
    srcImg:
      'https://zerowastestore.com/cdn/shop/files/sustain-yourself-sensitive-skin-deodorant-3-scent-options-32612745183343.jpg?v=1697130655&width=1200',
    name: 'Sensitive Skin Deodorant',
    description:
      'Perfect for those with sensitive skin, this effective, all-natural deodorant is made with gentle ingredients & is baking soda free. Gentle & long-lasting, this deodorant is the perfect zero waste alternative to chemically-filled deodorant that comes in plastic. Magnesium hydroxide is added for its odor fighting benefits.',
    price: 799,
    slug: 'mesh-produce-bag',
    key: '200',
  },
]

const totalPrice = () => {
  return (
    products.reduce(
      (total, product) =>
        total + (product.discountedPrice ? +product.discountedPrice : product.price),
      0,
    ) / FULL_PERCENTAGE
  )
}

const promocode = ref('')
</script>

<template>
  <ProductInCart
    v-for="product in products"
    :key="product.name"
    :srcImg="product.srcImg"
    :name="product.name"
    :price="product.price"
    :discountedPrice="product.discountedPrice ?? undefined"
    :productSlug="product.slug"
    :productKey="product.key"
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
    <div class="total-price">Total: €{{ totalPrice() }}</div>
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
