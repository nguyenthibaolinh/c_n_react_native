export interface UserPublic {
  id: number
  firstName: string
  lastName: string
  fullName: string
  avatar: string | null
  email?: string
}
