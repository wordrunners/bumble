import { request } from '@/Core/apiRequest'
import { APIError } from './types'

export type AvatarResponseData =
  | {
      id: number
      login: string
      first_name: string
      second_name: string
      display_name: string
      avatar: string
      phone: string
      email: string
    }
  | APIError

export const avatarAPI = {
  avatarUp: (requestData: any) =>
    request.put<AvatarResponseData>(
      '/user/profile/avatar',
      requestData,
      null,
      true
    ),
}
