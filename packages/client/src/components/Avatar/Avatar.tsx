import React, { FC, useState } from 'react'
import { avatarAPI } from '@/api/avatarApi'
import './Avatar.scss'
import avatar from '@/assets/images/avatar.png'
import clip from '@/assets/images/clip.svg'
import send from '@/assets/images/send.svg'

export type User = {
  id?: number
  login?: string
  firstName?: string
  secondName?: string
  displayName?: string
  avatar?: string
  phone?: string
  email?: string
}

export const Avatar: FC<User> = props => {
  const [fileSelected, setFileSelected] = useState<File>()

  const avatarUser = props.avatar
    ? `${__API_ENDPOINT__}/resources${props.avatar}`
    : avatar

  const displayName = props.displayName ? props.displayName : 'User'

  const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files

    if (!fileList) return

    setFileSelected(fileList[0])
  }

  const onAvatarUp = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault()

    if (fileSelected) {
      const formData = new FormData()
      formData.append('avatar', fileSelected)

      avatarAPI.avatarUp(formData)
    }
  }

  return (
    <div className="wrap">
      <div className="avatar">
        <img src={avatarUser} alt={`аватар пользователя ${displayName}`} />
      </div>
      <div className="change__avatar">
        <p>Выберете вашу фотографию</p>
        <form className="change__avatar-file" name="avatar">
          <label className="label">
            <img src={clip} alt="adding a file" />
            <input type="file" name="avatar" onChange={handleImageChange} />
          </label>
          <button
            className="sending__button-img"
            type="submit"
            onClick={onAvatarUp}>
            <img src={send} alt="добавить файл" />
          </button>
        </form>
      </div>
    </div>
  )
}
