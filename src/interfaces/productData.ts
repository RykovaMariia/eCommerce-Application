export interface ProductData {
  description: string
  name: string
  images: string[] | string
  attributes: Attribute[] | string
}

export interface Attribute {
  name: string
  value: string
}
