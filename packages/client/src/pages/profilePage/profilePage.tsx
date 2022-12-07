import React, { FC, useContext } from 'react'
import { Link } from 'react-router-dom'
import type { User } from '@/components/Avatar'
import { Avatar } from '@/components/Avatar'
import './profilePage.scss'
import '@/assets/images/avatar.png'
import { AppContext } from '@/Core'

export const ProfilePage: FC<User> = () => {
  const user = useContext(AppContext)
  return (
    <div className="wrap">
      <Avatar displayName={user.displayName} avatar={user.avatar} />
      <div className="data__list">
        <span>Почта</span>
        <span>{user.email}</span>
      </div>
      <div className="data__list">
        <span>Логин</span>
        <span>{user.login}</span>
      </div>
      <div className="data__list">
        <span>Имя</span>
        <span>{user.firstName}</span>
      </div>
      <div className="data__list">
        <span>Фамилия</span>
        <span>{user.secondName}</span>
      </div>
      <div className="data__list">
        <span>Имя в игре</span>
        <span>{user.displayName}</span>
      </div>
      <div className="data__list">
        <span>Телефон</span>
        <span>{user.phone}</span>
      </div>
      <div className="management">
        <Link className="link" to={`/change-settings`}>
          {<p>Изменить данные</p>}
        </Link>
        <Link to={`/change-password`}>{<p>Измененить пароль</p>}</Link>
        <Link to={`/`}>{<p>Назад</p>}</Link>
      </div>
    </div>
  )
}
