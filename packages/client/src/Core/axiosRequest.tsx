import axios from 'axios'

const isUser = () => typeof window !== 'undefined'
const getLocation = (): string => location.origin
const HOST = isUser() 
  ? getLocation() 
  : ''

export const axiosRequest = axios
  .create({
    baseURL: __API_ENDPOINT__,
    headers: { 'Content-Type': 'application/json' },
    responseType: 'json',
    withCredentials: true,
  })


const API_DB = `${HOST}/api`

export const axiosRequestDB = axios
  .create({
    baseURL: API_DB,
    headers: { 'Content-Type': 'application/json' },
  })

