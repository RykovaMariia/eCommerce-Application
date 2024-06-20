import type { MyCustomerDraft } from '@commercetools/platform-sdk'

export interface UserLoginData {
  anonymousCart?: {
    id: string
    typeId: 'cart'
  }
  email: string
  password: string
  anonymousId?: string
  anonymousCartSignInMode?: string
  updateProductData?: boolean
}

export interface UserPasswordsData {
  email: string
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface UserData {
  firstName?: string
  lastName?: string
  dateOfBirth?: string
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
