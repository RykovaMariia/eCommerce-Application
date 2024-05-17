export interface UserLoginData {
  email: string
  password: string
}

export interface UserRegistrationData {
  firstName: string
  lastName: string
  birthDate: string
  email: string
  password: string
  country: string
  addresses: {
    addressShipping: Address,
    addressBilling: Address
  }
  isSame: boolean
}

export interface Address {
  city: string
  street: string
  postalCode: string
}
