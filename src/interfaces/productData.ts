export interface ProductData {
  description: string
  name: string
  images: string[]
  variants: ProductItem[]
}

export interface Attribute {
  name: string
  value: AttributeValue[]
}

interface AttributeValue {
  key: string
  label: string
}

export interface ProductItem {
  id: number
  attributes: string[]
  price: number
  discountPrice: number
}
