/* eslint-disable @typescript-eslint/ban-types */
import { request } from '@/Core/apiRequest';
import { APIError, UserDTO } from './types';


type SigninRequestData = {
  login: string;
  password: string;
}

type SignupRequestData = {
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

  getUser: () => request.get<UserDTO | APIError>('/auth/user'),

  logout: () => request.post('/auth/logout'),
}
