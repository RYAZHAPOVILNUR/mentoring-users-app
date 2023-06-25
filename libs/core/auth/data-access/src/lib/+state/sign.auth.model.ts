export interface SignAuthPayload {
  email: string
  password: string
}

export interface SignAuthResponse {
  authToken: string,
  user: LoggedInUser
}

export interface RegisterResponse {
  authToken: string
}
export interface LoggedInUser {
  id: number | null
  name: string
  email: string
  username: string
  city: string
}

export interface NewUser {
  name: string;
  email: string;
  password: string;
}
