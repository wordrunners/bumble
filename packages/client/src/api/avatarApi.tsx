import { request } from '@/Core/apiRequest'
import { AvatarResponseData } from './types'

export const avatarAPI = {
  avatarUp: (requestData: FormData) =>
    request.put<AvatarResponseData>(
      '/user/profile/avatar',
      requestData,
      null,
      true
    ),
}
