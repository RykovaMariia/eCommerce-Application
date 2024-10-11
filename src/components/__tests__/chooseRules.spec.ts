import { describe, expect, test } from 'vitest'

import { chooseRules } from '@/utils/chooseRules'
import { rules } from '@/utils/chooseRules'

describe('chooseRules function test', () => {
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

  test('should return an array of rules for postal code', () => {
    expect(chooseRules('text', 'City')).toEqual([rules.required, rules.text])
  })

  test('should return an array of rules for else case', () => {
    expect(chooseRules('text', 'Test')).toEqual([rules.required, rules.text])
  })
})
