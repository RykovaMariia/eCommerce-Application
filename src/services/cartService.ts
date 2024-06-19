import { useCartStore } from '@/stores/cart'
import { cartApiService, type CartApiServiceType } from './cartApiService'
import { localStorageService } from './storageService'
import type { Cart, LineItem } from '@commercetools/platform-sdk'
import type { ProductItem } from '@/interfaces/productData'

class CartService {
  constructor(private cartApiService: CartApiServiceType) {}

  public setAnonymousSession() {
    const cartId = localStorageService.getData('cartId')
    const anonymousId = localStorageService.getData('anonymousId')
    if (!cartId) {
      return
    }
    this.cartApiService
      .getCartById(cartId)
      .then(({ body }) => {
        if (anonymousId && body.createdBy?.anonymousId !== anonymousId) {
          return this.cartApiService
            .updateAnonymousId({ id: cartId, version: body.version, anonymousId })
            .then(({ body }) => body)
        }
        return body
      })
      .then((body) => {
        useCartStore().setCart(body)
      })
  }

  public async createCartAndSaveState() {
    const { body } = await this.cartApiService.createCart()
    localStorageService.saveData('cartId', body.id)
    useCartStore().setCart(body)
    return body
  }

  public async addProductToCart({
    productId,
    variantId,
    cart,
  }: {
    productId: string
    variantId: number
    cart?: Cart
  }) {
    const cartId = localStorageService.getData('cartId')
    if (!cartId) {
      cart = await this.createCartAndSaveState()
    }
    if (cart?.id) {
      return cartApiService
        .addProductToCart({ id: cart.id, version: cart.version, productId, variantId })
        .then(({ body }) => useCartStore().setCart(body))
    }
  }

  public isProductInCart({
    lineItems,
    productId,
    variantId,
  }: {
    lineItems: LineItem[]
    productId: string
    variantId: number
  }) {
    return lineItems.some((item) => item.productId === productId && item.variant.id === variantId)
  }

  public getLineIdByProduct({
    lineItems,
    productId,
    variantId,
  }: {
    lineItems: LineItem[]
    productId: string
    variantId: number
  }) {
    return lineItems.find((item) => item.productId === productId && item.variant.id === variantId)
      ?.id
  }

  public isLineItemInCart({
    lineItems,
    productId,
    variantId,
  }: {
    lineItems: LineItem[]
    productId: string
    variantId: number
  }) {
    return lineItems.some((item) => item.productId === productId && item.variant.id === variantId)
  }

  public getVariantByAttribute(variants: ProductItem[], selectedVariants: string[]) {
    return variants.find(
      ({ attributes }) =>
        attributes[0] === selectedVariants[0] && attributes[1] === selectedVariants[1],
    )
  }
}

export const cartService = new CartService(cartApiService)
