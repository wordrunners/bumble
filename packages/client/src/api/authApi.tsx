/* eslint-disable @typescript-eslint/ban-types */
import { request } from '@/Core/apiRequest';
import { APIError, UserDTO } from './types';


export type SigninRequestData = {
  login: string;
  password: string;
}

export type SignupRequestData = {
  first_name: string;
  second_name: string;
  phone: string;
  email: string;
  login: string;
  password: string;
}

type SigninResponseData = {} | APIError;

type SignupResponseData = {} | APIError;

export const authAPI = {
  signin: (data: SigninRequestData) =>
    request.post<SigninResponseData>('/auth/signin', data),

  signup: (data: SignupRequestData) =>
    request.post<SignupResponseData>('/auth/signup', data),

  getUser: () => request.get<UserDTO>('/auth/user'),

  logout: () => request.post('/auth/logout'),
}
