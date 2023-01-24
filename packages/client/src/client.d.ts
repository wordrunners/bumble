declare global {
  const __SERVER_PORT__: number
  const __API_ENDPOINT__: string
  type User = {
    id: number
    login: string
    firstName: string
    secondName: string
    displayName: string
    avatar: string
    phone: string
    email: string
  }
}

export {};

declare module '*.svg' {
  const content: any
  export default content
}
