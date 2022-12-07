export type User = {
  id?: number,
  email: string,
  login: string,
  firstName: string,
  secondName: string,
  displayName: string,
  phone: string,
  avatar?: string,
  password?: string,
} 

export type ProfileState = {
  profile: User,
  status?: string | null,
  error?: string | null,
}


