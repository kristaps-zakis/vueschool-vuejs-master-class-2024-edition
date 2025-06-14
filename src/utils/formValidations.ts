export const validateEmail = (email: string) => {
  const trimmedEmail = email.trim()

  if (!trimmedEmail) {
    return []
  }

  const errors = []

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const isValidEmail = emailRegex.test(trimmedEmail)

  if (!isValidEmail) {
    errors.push('Not a valid email format')
  }

  return errors
}

export const validatePassword = (password: string) => {
  const trimmedPassword = password.trim()

  if (!trimmedPassword) {
    return []
  }

  const errors = []

  if (trimmedPassword.length < 6) {
    errors.push('Password must be at least 6 characters long')
  }

  return errors
}
