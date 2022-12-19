/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import cn from 'classnames';

import { Form } from "@/components/Form";
import { FormField } from "@/components/FormField";
import { Button } from "@/components/Button";
import { useForm, useAuth, useAppDispatch } from "@/hooks";
import validate from "@/Core/ValidateForm";
import { signup, fetchUser } from "@/store/authSlice";

import "@/pages/signinPage/signinPage.scss";

export const SignupPage: FC = () => {
  const {handleChange, handleSubmit, values, errors} = useForm(submitForm, {
    first_name: "",
    second_name: "",
    phone: "",
    email: "",
    login: "",
    password: "",
  }, validate);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAuth();

  function submitForm() {
   dispatch(signup(values));
 }

 useEffect(() => {
  dispatch(fetchUser());
  if (isAuth) {
    navigate('/signin')
  }
}, [isAuth]);

  return (
    <div className={cn('auth')}>
      <Form onSubmit={handleSubmit}>
        <h1 className="auth__title">Регистрация</h1>
        <FormField type="text" name="first_name" value={values.first_name} label="Имя" onChange={handleChange} />
        {errors.firstName && <p className="auth__error">{errors.first_name}</p>}
        <FormField type="text" name="second_name" value={values.second_name} label="Фамилия" onChange={handleChange} />
        {errors.secondName && <p className="auth__error">{errors.second_name}</p>}
        <FormField type="text" name="login" value={values.login} label="Логин" onChange={handleChange} />
        {errors.login && <p className="auth__error">{errors.login}</p>}
        <FormField type="text" name="email" value={values.email} label="Email" onChange={handleChange} />
        {errors.email && <p className="auth__error">{errors.email}</p>}
        <FormField type="tel" name="phone" value={values.phone} label="Телефон" onChange={handleChange} />
        {errors.phone && <p className="auth__error">{errors.phone}</p>}
        <FormField type="password" name="password" value={values.password} label="Пароль" onChange={handleChange} />
        {errors.password && <p className="auth__error">{errors.password}</p>}
        <Button className="auth__btn" type="submit">ЗАРЕГИСТРИРОВАТЬСЯ</Button>
        <Link className="auth__link" to={`/signin`} >Уже есть аккаунт? Войдите</Link>
      </Form>
    </div>
  )
}
