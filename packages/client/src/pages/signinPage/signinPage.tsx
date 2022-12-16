/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from "react";
import { Link, Navigate } from 'react-router-dom';

import { Form } from "@/components/Form";
import { FormField } from "@/components/FormField";
import { Button } from "@/components/Button";
import { useForm } from "@/hooks/useForm";
import { useAuth } from "@/hooks/useAuth";
import validate from "@/Core/ValidateForm";
import { signin } from "@/store/authSlice";
import { useAppDispatch } from "@/hooks";

import "./signinPage.scss";

export const SigninPage: FC = () => {
  const {handleChange, handleSubmit, values, errors} = useForm(submitForm, {login: "", password: ""}, validate);
  const { isAuth } = useAuth();
  const dispath = useAppDispatch();

   function submitForm() {
    dispath(signin(values));
  }
  console.log(isAuth);

  return isAuth ? <Navigate to="/game" replace /> : (
    <div className="auth">
      <Form onSubmit={handleSubmit}>
        <h1 className="auth__title">Вход</h1>
        <FormField type="text" name="login" value={values.login} label="Логин" onChange={handleChange} />
        {errors.login && <p className="auth__error">{errors.login}</p>}
        <FormField type="password" name="password" value={values.password} label="Пароль" onChange={handleChange} />
        {errors.password && <p className="auth__error">{errors.password}</p>}
        <Button className="auth__btn" type="submit">АВТОРИЗАЦИЯ</Button>
        <Link className="auth__link" to={`/signup`} >Нет Аккаунта? Зарегистрируйтесь</Link>
      </Form>
    </div>
  )
}
