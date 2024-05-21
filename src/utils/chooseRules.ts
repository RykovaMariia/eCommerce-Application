import { getMaxTime } from './maxTime'
import { InputLabel } from '@/enums/inputLabel'
import { InputType } from '@/enums/inputType'

export const rules = {
  required: (value: string) => {
    return !!value || 'Field is required'
  },
  email: (value: string) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const spaces = value.match(/\s+/g) === null
    return (
      (pattern.test(value) && spaces) ||
      'Invalid e-mail. Please enter your e-mail in the format: example@gmail.com'
    )
  },
  password: (value: string) => {
    const pattern =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>/?[\]\\|`~])(?!.*\s).{8,}$/
    return (
      pattern.test(value) ||
      'Invalid password. Password must be at least 8 characters long, contain at least one uppercase letter, at least one lowercase letter, at least one digit, at least one special character, must not contain leading or trailing whitespace.'
    )
  },
  text: (value: string) => {
    const pattern = /^[a-zA-Z]{1,}$/
    return (
      pattern.test(value) ||
      'Input must contain at least one character and no special characters or numbers'
    )
  },
  street: (value: string) => {
    const pattern = /^[a-zA-Z0-9.[^<>()/[\]\\.,;:\s@"]{1,}$/
    return pattern.test(value) || 'Input must contain at least one character'
  },
  birthdate: (value: string) => {
    const pattern = /^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$/
    const maxTime = getMaxTime()
    return (
      (pattern.test(value) && new Date(value).valueOf() < new Date(maxTime).valueOf()) ||
      'Invalid input. Enter the date according to the format: mm/dd/yyyy. Also you must be 13 y.o. or older '
    )
  },
  postcode: (value: string) => {
    const pattern = /^[A-Z]{1,2}[0-9][A-Z0-9]? {1}?[0-9][A-Z]{2}$/
    return (
      pattern.test(value) ||
      "Postal code doesn't match with the format: AA9A 9AA - A signifies a letter and 9 a digit. Only uppercase letters"
    )
  },
}

export function chooseRules(type: string, label: string) {
  if (type === InputType.Text && label === InputLabel.Email) {
    return [rules.required, rules.email]
  }
  if (type === InputType.Password) {
    return [rules.required, rules.password]
  }
  if (type === InputType.Text && label === InputLabel.Street) {
    return [rules.required, rules.street]
  }
  if (type === InputType.Text && label === InputLabel.BirthDate) {
    return [rules.required, rules.birthdate]
  }
  if (type === InputType.Text && label === InputLabel.City) {
    return [rules.required, rules.text]
  }
  if (type === InputType.Text && label === InputLabel.PostalCode) {
    return [rules.required, rules.postcode]
  }
  return [rules.required, rules.text]
}
