export interface UserLoginData {
  email: string
  password: string
}

export interface UserCustomerDraft {
  firstName: string
  lastName: string
  dateOfBirth: string
  email: string
  password: string
  addresses: Address[]
  defaultShippingAddress?: number
  shippingAddressIds?: string[]
  defaultBillingAddress?: number
  billingAddressIds?: string[]
}

export interface Address {
  country: string
  city: string
  streetName: string
  postalCode: string
}
