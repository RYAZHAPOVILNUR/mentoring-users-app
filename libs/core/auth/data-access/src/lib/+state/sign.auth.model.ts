export interface SignAuthPayload {
  email: string
  password: string
}

export interface SignAuthResponse {
  accessToken: string
  expiresIn: number | null
  id: number | null
}
