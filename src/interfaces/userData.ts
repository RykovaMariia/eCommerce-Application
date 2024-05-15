export interface IUserLoginData {
  email: string
  password: string
}

export interface IUserRegistrationData {
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
