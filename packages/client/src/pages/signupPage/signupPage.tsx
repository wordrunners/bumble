/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from "react";
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { Form } from "@/components/Form";
import { FormField } from "@/components/FormField";
import { Button } from "@/components/Button";
import { useForm } from "@/hooks/useForm";
import validate from "@/Core/ValidateForm";

import "@/pages/signinPage/signinPage.scss";

export const SignupPage: FC = ({ submitForm }: any) => {
  const {handleChange, handleSubmit, values, errors} = useForm(submitForm, validate);

  return (
    <div className={cn('auth')}>
      <Form onSubmit={handleSubmit}>
        <h1 className="auth__title">Регистрация</h1>
        <FormField type="text" name="first_name" value={values.firstName} label="Имя" onChange={handleChange} />
        {errors.firstName && <p className="auth__error">{errors.firstName}</p>}
        <FormField type="text" name="second_name" value={values.secondName} label="Фамилия" onChange={handleChange} />
        {errors.secondName && <p className="auth__error">{errors.secondName}</p>}
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
