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

export type OAuthRequestData = {
  code: string;
  redirect_uri: string;
}

type SigninResponseData = {} | APIError;

type SignupResponseData = {} | APIError;

type OAuthResponseData = {
  service_id: string;
}

export const authAPI = {
  signin: (data: SigninRequestData) =>
    request.post<SigninResponseData>('/auth/signin', data),

  signup: (data: SignupRequestData) =>
    request.post<SignupResponseData>('/auth/signup', data),

  getUser: () => request.get<UserDTO>('/auth/user'),

  logout: () => request.post('/auth/logout'),

  oAuth: (data: OAuthRequestData) => request.post('/oauth/yandex', data),

  fetchOAuth: () => request.get<OAuthResponseData>('/oauth/yandex/service-id')
}
