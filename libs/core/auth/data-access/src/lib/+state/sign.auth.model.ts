export interface SignAuthPayload {
  email: string
  password: string
}

export interface SignAuthResponse {
  authToken: string
  expiresIn?: number | null
  id?: number | null
}
