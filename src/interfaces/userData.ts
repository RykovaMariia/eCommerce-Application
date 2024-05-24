import type { MyCustomerDraft } from '@commercetools/platform-sdk'

export interface UserLoginData {
  email: string
  password: string
}

export interface UserCustomerDraft extends MyCustomerDraft {
  firstName: string
  lastName: string
  dateOfBirth: string
  email: string
  password: string
  addresses: Address[]
  defaultShippingAddress?: number
  shippingAddresses: number[]
  defaultBillingAddress?: number
  billingAddresses: number[]
}

export interface Address {
  country: string
  city: string
  streetName: string
  postalCode: string
}
