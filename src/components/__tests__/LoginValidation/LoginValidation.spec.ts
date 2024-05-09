import { describe, expect, test } from 'vitest'

import { chooseRules } from '@/utils/choose-rules'
import { rules } from '@/utils/choose-rules';


describe('input validation function test', () => {
  test('must return an array of rules for the email input type', () => {
    expect(chooseRules('text', 'Email')).toEqual([rules.required, rules.email]);
  })

  test('must return an array of rules for the password input type', () => {
    expect(chooseRules('password', 'Test')).toEqual([rules.required, rules.password]);
  })

  test('should return an array of rules for else case', () => {
    expect(chooseRules('text', 'Test')).toEqual([rules.required]);
  });

  test('regular expression should match with email address format', () => {
    expect(rules.email('user@example.com')).toBe(true);
  })

  test('rule for email should handle invalid email address format', () => {
    expect(rules.email('userexamplecom')).toBe('Invalid e-mail. Please enter your e-mail in the format: example@gmail.com');
  });

  test('regular expression should match with password format', () => {
    expect(rules.password('1-3K5y78')).toBe(true);
  });

  test('rule for password should handle invalid password format', () => {
    expect(rules.password('1234567 ')).toBe('Invalid password. Password must be at least 8 characters long, contain at least one uppercase letter, at least one lowercase letter, at least one digit, at least one special character, must not contain leading or trailing whitespace.');
  });
})