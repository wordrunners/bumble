import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import type { User } from '../../components/Avatar'
import { Avatar } from '../../components/Avatar'

export const ProfilePage: FC<User> = (props: User) => {
  const submitForm = (event: { preventDefault: () => void }) => {
    event.preventDefault()
  }

  return (
    <>
      <Avatar displayName={'Семен'} avatar={props.avatar} />
      <form
        className="profile__form"
        onSubmit={event => submitForm(event)}></form>
      <Link to={`/change-password`}>{<p>Изменение пароля</p>}</Link>
    </>
  )
}
