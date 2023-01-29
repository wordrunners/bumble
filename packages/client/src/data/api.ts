const isUser = () => typeof window !== 'undefined'
const getLocation = (): string => location.origin
export const HOST = isUser() 
  ? getLocation() 
  : ''
export const YA_API = `${HOST}/ya-api` 
