import React, { FC, useEffect } from 'react'
import type { User  } from '@/types/user'
import { Avatar } from '@/components/Avatar'
import { Button } from '@/components/Button'
import { LinkButton } from '@/components/LinkButton'
import './profilePage.scss'
import { ChangeData } from '@/components/ChangeData'
import { changeProfile, profileLoading } from '@/store/userSlice'
import { useInput, useAppDispatch, useAppSelector} from '@/hooks'
import { selectUser, fetchUser } from '@/store/authSlice';
import { transformUserDTOtoUser } from '@/utils';
import { UserDTO } from '@/api/types';


export const ProfilePage: FC = () => {

  const dispatch = useAppDispatch()
  
  const userState: UserDTO = useAppSelector(selectUser);
    
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const testUser = {
    avatar:  '',
    email: 'test@test.ru',
    login: 'Semen',
    firstName: 'Семен',
    secondName: 'Семенов',
    displayName: 'Семен',
    phone: '+77777777777',
  }
  
  const user = userState === null ? testUser : transformUserDTOtoUser(userState);

  const email = useInput(user.email, {isEmail: true});
  const login = useInput(user.login, {isLogin: true});
  const firstName = useInput(user.firstName, {isName: true});
  const secondName = useInput(user.secondName, {isName: true});
  const displayName = useInput(user.displayName, {isName: true});
  const phone = useInput(user.phone, {isPhone: true});

  const handleSubmitForm = (e:any) => {
    
    e.preventDefault();
    
    const changeProfileData: User = {
      id: 0,
      email: e.target[0].value,
      login: e.target[1].value,
      firstName: e.target[2].value,
      secondName: e.target[3].value,
      displayName: e.target[4].value,
      phone: e.target[5].value,

    }
    dispatch(profileLoading);
    
    dispatch(changeProfile(changeProfileData));
  }
  
  return (
    <div className='wrapper'>
      <Avatar displayName={user.displayName} avatar={user.avatar} />
      <form className='change__form' onSubmit={handleSubmitForm}>
        <div className="change__form-list">
          {(email.isDirty && email.emailError) && <div className='error'>Некорректный email</div>}
          <ChangeData onChange={(e:React.ChangeEvent<HTMLInputElement>) => email.onChange(e)} onBlur={() => email.onBlur()} value={email.value} title='Почта' type='text'  name={'email'} placeholder={user.email}/>

          {(login.isDirty && login.loginError) && <div className='error'>Логин должен быть написан латиницей от 3 до 20 знаков, может содержать цифры, дефис и подчеркивание</div>}
          <ChangeData onChange={(e:React.ChangeEvent<HTMLInputElement>) => login.onChange(e)} onBlur={() => login.onBlur()} value={login.value} title='Логин' type='text' name={'login'} placeholder={user.login}/>

          {(firstName.isDirty && firstName.nameError) && <div className='error'>Имя должно быть с заглавной буквы, более 1 буквы</div>}
          <ChangeData onChange={(e:React.ChangeEvent<HTMLInputElement>) => firstName.onChange(e)} onBlur={() => firstName.onBlur()} value={firstName.value} title='Имя' type='text' name={'firstName'} placeholder={user.firstName}/>

          {(secondName.isDirty && secondName.nameError) && <div className='error'>Фамилия должна быть с заглавной буквы, более 1 буквы</div>}
          <ChangeData onChange={(e:React.ChangeEvent<HTMLInputElement>) => secondName.onChange(e)} onBlur={() => secondName.onBlur()} value={secondName.value} title='Фамилия' type='text' name={'secondName'} placeholder={user.secondName}/>

          {(displayName.isDirty && displayName.nameError) && <div className='error'>Имя в игре должно быть с заглавной буквы, более 1 буквы</div>}
          <ChangeData onChange={(e:React.ChangeEvent<HTMLInputElement>) => displayName.onChange(e)} onBlur={() => displayName.onBlur()} value={displayName.value} title='Имя в игре' type='text' name={'displayName'} placeholder={user.displayName}/>

          {(phone.isDirty && phone.nameError) && <div className='error'>Введите корректный номер телефона, номер может начинаться с 8 или с +</div>}
          <ChangeData onChange={(e:React.ChangeEvent<HTMLInputElement>) => phone.onChange(e)} onBlur={() => phone.onBlur()} value={phone.value} title='Телефон' type='text' name={'phone'} placeholder={user.phone}/>
        </div>
        
        <Button
          type="submit"
          className="action__button"
          children="Заменить"
        />
        <LinkButton to="/change-password" children="Изменить пароль" modifier="back" />
        <LinkButton to="/" children="Назад" modifier="back" />
      </form>
    </div>
  )
}
