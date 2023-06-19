export interface SignAuthPayload {
  email: string
  password: string
}

export interface SignAuthResponse {
  accessToken: string
  expiresIn: number
  id: number
}

export type AuthLoadingStatus = 'loggin out' | 'loading' | 'loggin in'

export interface AuthState {
  status: AuthLoadingStatus
  error: string
  authData: SignAuthResponse
}
