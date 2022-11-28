import { request } from '../Core/apiRequest'
import { APIError } from './types'

export type AvatarRequestData = {
  avatar: FormData
}

type AvatarResponseData =
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
  avatarUp: (requestData: AvatarRequestData) =>
    request.put<AvatarResponseData>('/user/profile/avatar', {
      data: requestData,
    }),
}
