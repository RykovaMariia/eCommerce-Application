export interface CartLineItem {
  name: string
  srcImg: string
  individualPrice: number
  price: number
  discountedPrice: number
  productSlug: string
  productId: string
  quantity: number
  lineItemId: string
  attributes:
    | { readonly name: string; readonly value: { key: string; value: string } }[]
    | undefined
  variantId: number
}
