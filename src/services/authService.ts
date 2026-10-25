
const API_URL = 'http://localhost:3001'

export interface RegisterData {
  name: string
  surname: string
  email: string
  cellNumber: string
  password: string
}

export async function registerUser(data: RegisterData) {
  const response = await fetch(`${API_URL}/users`)

  if (!response.ok) {
    throw new Error('Could not check existing users.')
  }

  const users: RegisterData[] & { id?: number }[] =
    await response.json()

  const emailExists = users.some(
    (user) => user.email.toLowerCase() === data.email.toLowerCase()
  )

  if (emailExists) {
    throw new Error('An account with this email already exists.')
  }

  const createResponse = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!createResponse.ok) {
    throw new Error('Could not create your account.')
  }

  return createResponse.json()
}
