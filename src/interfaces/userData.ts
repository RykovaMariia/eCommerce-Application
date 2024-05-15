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
  city: string
  street: string
  postalCode: string
  isDefaultAddress: boolean
}
