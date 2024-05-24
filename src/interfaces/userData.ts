import type { Customer, MyCustomerDraft } from '@commercetools/platform-sdk'

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
  id?: string
  country: string
  city: string
  streetName: string
  postalCode: string
}

export interface CustomerData extends Customer {
  id: string
  version: number
  createdAt: string
  lastModifiedAt: string
  lastModifiedBy: LastModifiedBy
  createdBy: CreatedBy
  email: string
  firstName: string
  lastName: string
  dateOfBirth: string
  password: string
  addresses: Address[]
  shippingAddressIds: string[]
  billingAddressIds: string[]
  isEmailVerified: boolean
  stores: []
  authenticationMode: string
}

export interface CreatedBy {
  clientId: string
  isPlatformClient: boolean
  anonymousId: string
}

export interface LastModifiedBy {
  clientId: string
  externalUserId: string
  isPlatformClient: boolean
  anonymousId: string
}
