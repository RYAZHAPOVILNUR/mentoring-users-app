export interface SignAuthPayload {
  email: string
  password: string
}

export interface SignAuthResponse {
  authToken: string,
  user: LoggedInUser
}

export interface LoggedInUser {
  id: number | null
  name: string
  email: string
  username: string
  city: string
}
