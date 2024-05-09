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
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>/?[\]\\|`~])(?!.*^\s)(?!.*\s$).{8,}$/
    return (
      pattern.test(value) ||
      'Invalid password. Password must be at least 8 characters long, contain at least one uppercase letter, at least one lowercase letter, at least one digit, at least one special character, must not contain leading or trailing whitespace.'
    )
  },
}

export function chooseRules(type: string, label: string) {
  if (type === 'text' && label === 'Email') {
    return [rules.required, rules.email]
  }
  if (type === 'password') {
    return [rules.required, rules.password]
  }
  return [rules.required]
}