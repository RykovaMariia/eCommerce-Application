export interface CartLineItem {
  name: string
  srcImg: string
  price: number
  discountedPrice: number
  productSlug: string
  productId: string
  quantity: number
  lineItemId: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attributes: { readonly name: string; readonly value: any }[] | undefined
  variantId: number
}
