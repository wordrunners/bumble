declare const __SERVER_PORT__: number
declare const __API_ENDPOINT__: string
declare global {

  export type User = {
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

declare module '*.svg' {
  const content: any
  export default content
}
