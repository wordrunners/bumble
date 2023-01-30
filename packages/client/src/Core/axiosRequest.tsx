import axios from 'axios'
import { API } from "@/data/api"

const isUser = () => typeof window !== 'undefined'
const getLocation = (): string => location.origin
const HOST = isUser() 
  ? getLocation() 
  : ''

export const axiosRequest = axios
  .create({
    baseURL: API,
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

