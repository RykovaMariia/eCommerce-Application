export interface UserLoginData {
  email: string
  password: string
}

export interface UserCustomerDraft {
  firstName: string
  lastName: string
  birthDate: string
  email: string
  password: string
  addresses: Address[]
  defaultShippingAddressId?: string
  shippingAddressIds?: string[]
  defaultBillingAddressId?: string
  billingAddressIds?: string[]
}

export interface Address {
  country: string
  city: string
  street: string
  postalCode: string
}
