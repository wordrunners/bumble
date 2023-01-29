import axios from 'axios'
import { YA_API, HOST } from "@/data/api"


export const axiosRequest = axios
  .create({
    baseURL: YA_API,
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

