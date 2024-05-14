import { describe, expect, test } from 'vitest'

import { rules } from '@/utils/chooseRules'

describe('validation rules test', () => {
  const invalidOutput = {
    email: 'Invalid e-mail. Please enter your e-mail in the format: example@gmail.com',
    password: 'Invalid password. Password must be at least 8 characters long, contain at least one uppercase letter, at least one lowercase letter, at least one digit, at least one special character, must not contain leading or trailing whitespace.',
    street: 'Input must contain at least one character',
    birthdate: 'Invalid input',
    postcode: "Postal code doesn't match with the format: AA9A 9AA - A signifies a letter and 9 a digit. Only uppercase letters"
  }
  const testEmail: {value: string; expectedOutput: boolean | string}[] = [
    { value: 'user@example.com', expectedOutput: true },
    { value: 'jane_doe123@sub.domain.co.uk', expectedOutput: true },
    { value: 'user+mailbox/department=shipping@example.com', expectedOutput: true },
    { value: 'first.last@sub-domain.com', expectedOutput: true },
    { value: 'email@domain-one.com', expectedOutput: true },
    { value: 'userexamplecom', expectedOutput: invalidOutput.email },
    { value: '@missingusername.com', expectedOutput: invalidOutput.email },
    { value: 'username@.com', expectedOutput: invalidOutput.email },
    { value: 'username123@gmail.a', expectedOutput: invalidOutput.email },
    { value: 'username@yahoo.com.', expectedOutput: invalidOutput.email },
    { value: 'username@yahoo..com', expectedOutput: invalidOutput.email },
  ]

  test.each(testEmail)('rule should handle valid and invalid email address format', ({value, expectedOutput}) => {
    expect(rules.email(value)).toBe(expectedOutput)
  })

  const testPassword: {value: string; expectedOutput: boolean | string}[] = [
    { value: '1-3K5y78', expectedOutput: true },
    { value: 'Aa1!abcd', expectedOutput: true },
    { value: 'Zx9_2*Vb', expectedOutput: true },
    { value: 'T!a8b7C@', expectedOutput: true },
    { value: 'Mno3&Pqr', expectedOutput: true },
    { value: '1234567 ', expectedOutput: invalidOutput.password },
    { value: 'password', expectedOutput: invalidOutput.password },
    { value: 'Aa1bbbbb', expectedOutput: invalidOutput.password },
    { value: 'Aa!@#$%^', expectedOutput: invalidOutput.password },
    { value: 'AA1!ABCD', expectedOutput: invalidOutput.password },
    { value: 'AaBbCc!', expectedOutput: invalidOutput.password },
  ]

  test.each(testPassword)('rule should handle valid and invalid password format', ({value, expectedOutput}) => {
    expect(rules.password(value)).toBe(expectedOutput)
  })

  const testStreet: {value: string; expectedOutput: boolean | string}[] = [
    { value: '123MainSt', expectedOutput: true },
    { value: '9SunsetBlvd', expectedOutput: true },
    { value: '1011OakRd', expectedOutput: true },
    { value: '', expectedOutput: invalidOutput.street },
  ]

  test.each(testStreet)('rule should handle valid and invalid password format', ({value, expectedOutput}) => {
    expect(rules.street(value)).toBe(expectedOutput)
  })

  const dateNow = (new Date(Date.now())).toISOString();

  const testBirthDate: {value: string; expectedOutput: boolean | string}[] = [
    { value: '2004-05-12T21:10:59.502Z', expectedOutput: true },
    { value: '2007-09-01T00:00:00.000Z', expectedOutput: true },
    { value: '1960-05-05T00:00:00.000Z', expectedOutput: true },
    { value: '2010-02-29T00:00:00.000Z', expectedOutput: true },
    { value: dateNow, expectedOutput: invalidOutput.birthdate },
    { value: '2024-05-12T22:08:58.867Z', expectedOutput: invalidOutput.birthdate },
    { value: '2023-01-01T00:00:00.000Z', expectedOutput: invalidOutput.birthdate },
    { value: '2017-09-01T00:00:00.000Z', expectedOutput: invalidOutput.birthdate },
    { value: '2020-03-15T00:00:00.000Z', expectedOutput: invalidOutput.birthdate },
  ]

  test.each(testBirthDate)('rule should handle valid and invalid date format', ({value, expectedOutput}) => {
    expect(rules.birthdate(value)).toBe(expectedOutput)
  })

  const testPostalCode: {value: string; expectedOutput: boolean | string}[] = [
    { value: 'AA9A 9AA', expectedOutput: true },
    { value: 'A9A 9AA', expectedOutput: true },
    { value: 'A9 9AA', expectedOutput: true },
    { value: 'A99 9AA', expectedOutput: true },
    { value: 'AA9 9AA', expectedOutput: true },
    { value: 'AA99 9AA', expectedOutput: true },
    { value: '0A99AA', expectedOutput: invalidOutput.postcode },
    { value: '123 4AB', expectedOutput: invalidOutput.postcode },
    { value: 'ABC1 AAA', expectedOutput: invalidOutput.postcode },
    { value: 'A1 A', expectedOutput: invalidOutput.postcode },
    { value: 'A 1 AAA', expectedOutput: invalidOutput.postcode },
  ]

  test.each(testPostalCode)('rule should handle valid and invalid date format', ({value, expectedOutput}) => {
    expect(rules.postcode(value)).toBe(expectedOutput)
  })
})