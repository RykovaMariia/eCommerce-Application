import { describe, expect, test } from 'vitest'

import { chooseRules } from '@/utils/chooseRules'
import { rules } from '@/utils/chooseRules'

describe('input validation function test', () => {
  test('must return an array of rules for the email input type', () => {
    expect(chooseRules('text', 'Email')).toEqual([rules.required, rules.email])
  })

  test('must return an array of rules for the password input type', () => {
    expect(chooseRules('password', 'Test')).toEqual([rules.required, rules.password])
  })

  test('should return an array of rules for street', () => {
    expect(chooseRules('text', 'Street')).toEqual([rules.required, rules.street])
  })

  test('should return an array of rules for birth date', () => {
    expect(chooseRules('text', 'Birth date')).toEqual([rules.required, rules.birthdate])
  })

  test('should return an array of rules for postal code', () => {
    expect(chooseRules('text', 'Postal code')).toEqual([rules.required, rules.postcode])
  })

  test('should return an array of rules for else case', () => {
    expect(chooseRules('text', 'Test')).toEqual([rules.required, rules.text])
  })

  test('regular expression should match with email address format', () => {
    expect(rules.email('user@example.com')).toBe(true)
  })

  test('rule for email should handle invalid email address format', () => {
    expect(rules.email('userexamplecom')).toBe(
      'Invalid e-mail. Please enter your e-mail in the format: example@gmail.com',
    )
  })

  test('regular expression should match with password format', () => {
    expect(rules.password('1-3K5y78')).toBe(true)
  })

  test('rule for password should handle invalid password format', () => {
    expect(rules.password('1234567 ')).toBe(
      'Invalid password. Password must be at least 8 characters long, contain at least one uppercase letter, at least one lowercase letter, at least one digit, at least one special character, must not contain leading or trailing whitespace.',
    )
  })

  test('regular expression should match with street format', () => {
    expect(rules.street('text')).toBe(true)
  })

  test('regular expression should handle invalid street format', () => {
    expect(rules.street('')).toBe('Input must contain at least one character')
  })

  test('regular expression should match with birth date format', () => {
    expect(rules.birthdate('2004-05-12T21:10:59.502Z')).toBe(true)
  })

  test('regular expression should handle invalid birth date format', () => {
    expect(rules.birthdate('2024-05-12T22:08:58.867Z')).toBe('Invalid input')
  })

  test('regular expression should match with postal code format', () => {
    expect(rules.postcode('AA9A 9AA')).toBe(true)
  })

  test('regular expression should handle invalid postal code format', () => {
    expect(rules.postcode('0A99AA')).toEqual(
      "Postal code doesn't match with the format: AA9A 9AA - A signifies a letter and 9 a digit. Only uppercase letters",
    )
  })
})
