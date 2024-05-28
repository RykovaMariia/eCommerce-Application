export interface ProductData {
  description: string
  name: string
  images: string[] | string
  variants: ProductItem[]
}

export interface Attribute {
  name: string
  value: string
}

export interface ProductItem {
  attribute: Attribute[] | []
  price: number
  discountPrice: number
}
