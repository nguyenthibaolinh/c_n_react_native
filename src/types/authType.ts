export interface AuthResponse {
  accessToken: string
  id: number
  firstName: string
  lastName: string
  fullName: string
  email: string
  avatar?: string | null
  gender: number
  permissions: string
  accountBalance: number
}

export type AuthType = Omit<AuthResponse, 'accessToken'>
