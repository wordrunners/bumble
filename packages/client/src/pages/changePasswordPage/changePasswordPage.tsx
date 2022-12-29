import React, { FC, useState, useEffect } from 'react'
import { passwordAPI } from '@/api/passwordApi'
import type { User } from '@/components/Avatar'
import { Button } from '@/components/Button'
import { LinkButton } from '@/components/LinkButton'
import avatar from '@/assets/images/avatar.png'
import './changePasswordPage.scss'
import { useDispatch, useSelector } from 'react-redux'
import {selectUser, changePass}  from '@/store/userSlice'
import { AppDispatch } from '@/store/store'


export const ChangePasswordPage: FC<User> = () => {

  const user = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();
  const avatarUser = user.avatar
    ? `${__API_ENDPOINT__}/resources${user.avatar}`
    : avatar

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const [oldPasswordDirty, setOldPasswordDirty] = useState(false)
  const [newPasswordDirty, setNewPasswordDirty] = useState(false)
  const [response, setResponse] = useState('')
  const [responseColor, setResponseColor] = useState('')

  const [oldPasswordError, setOldPasswordError] = useState(
    'поле password не может быть пустым'
  )
  const [newPasswordError, setNewPasswordError] = useState(
    'поле password не может быть пустым'
  )
  const [formValid, setformValid] = useState(false)

  useEffect(() => {
    if (oldPasswordError || newPasswordError) {
      setformValid(false)
    } else {
      setformValid(true)
    }
  }, [oldPasswordError, newPasswordError])

  const oldPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value)

    const PASSWORD = /^((?=.*\d)(?=.*[A-Z])[a-zA-Z0-9]{8,16})$/
    if (!PASSWORD.test(String(e.target.value))) {
      setOldPasswordError(
        'Пароль должен быть написан латиницей от 8 до 15 знаков, обязательно одна цифра и одна заглавная буква'
      )
      if (!e.target.value) {
        setOldPasswordError('поле password не может быть пустым')
      }
    } else {
      setOldPasswordError('')
    }
  }

  const newPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value)
    const PASSWORD = /^((?=.*\d)(?=.*[A-Z])[a-zA-Z0-9]{8,16})$/
    if (!PASSWORD.test(String(e.target.value))) {
      setNewPasswordError(
        'Пароль должен быть написан латиницей от 8 до 15 знаков, обязательно одна цифра и одна заглавная буква'
      )
      if (!e.target.value) {
        setNewPasswordError('поле password не может быть пустым')
      }
    } else {
      setNewPasswordError('')
    }
  }

  const blurHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'oldPassword':
        setOldPasswordDirty(true)
        break
      case 'newPassword':
        setNewPasswordDirty(true)
        break
    }
  }

  const passwordUp = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.preventDefault()
    dispatch(changePass(newPassword))
    const responseText = await passwordAPI({
      oldPassword: oldPassword,
      newPassword: newPassword,
    })
    if (responseText === 'пароль изменен') {
      setResponse('пароль изменен')
      setResponseColor('green')
    } else {
      setResponse('ошибка')
      setResponseColor('red')
    }
  }

  return (
    <div className="wrap">
      <div className="avatar">
        <img src={avatarUser} alt={`аватар пользователя ${user.displayName}`} />
      </div>
      <div className="card">
        <form className="card__form">
          <h1>Изменение пароля</h1>
          <div className="input">
            <input
              value={oldPassword}
              onChange={e => oldPasswordHandler(e)}
              onBlur={e => blurHandler(e)}
              name="oldPassword"
              type="password"
              placeholder="введите старый пароль"
              className="input__field"
            />
            <label className="input__label">Старый пароль</label>
            {oldPasswordDirty && oldPasswordError && (
              <div style={{ color: 'red' }}>{oldPasswordError}</div>
            )}
          </div>
          <div className="input">
            <input
              value={newPassword}
              onChange={e => newPasswordHandler(e)}
              onBlur={e => blurHandler(e)}
              name="newPassword"
              type="password"
              placeholder="введите новый пароль"
              className="input__field"
            />
            <label className="input__label">Новый пароль</label>
            {newPasswordDirty && newPasswordError && (
              <div style={{ color: 'red' }}>{newPasswordError}</div>
            )}
          </div>
          <div className="action">
            <div style={{ color: responseColor }} className="response">
              {response}
            </div>
            <Button
              disabled={!formValid}
              type="submit"
              className="action__button"
              onClick={passwordUp}
              children="Заменить"
            />
            <LinkButton to="/profile" children="Назад" modifier="back" />
          </div>
        </form>
      </div>
    </div>
  )
}
