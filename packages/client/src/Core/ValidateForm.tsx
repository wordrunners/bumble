/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormProps } from "@/hooks/useForm";

export default function ValidateForm(values: any) {
  const {login, password, firstName, secondName, email, phone} = values;
  
  const errors: FormProps = {};

  if (!/(?!^\d+$)[a-zA-Z0-9\-_]{3,20}/.test(login)) {
    errors.login = "Логин должен состоять из латинских букв и цифр, допустимы дефис и нижнее подчёркивание. Размер от 3 до 20 символов"
  }

  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{8,40}$/.test(password)) {
    errors.password = "Пароль должен содержать хотя бы одну заглавную букву и цифру. Размер от 8 до 40 символов"
  }
  
  if (!/^[A-ZА-Я][a-zA-Zа-яА-Я\-]*$/.test(firstName)) {
    errors.firstName = "Первая букава должна быть заглавная. Не допустимы цифры и спецсимволы, кроме дефиса"
  }

  if (!/^[A-ZА-Я][a-zA-Zа-яА-Я\-]*$/.test(secondName)) {
    errors.secondName = "Первая букава должна быть заглавная. Не допустимы цифры и спецсимволы, кроме дефиса"
  }

  if (!/^[\w\-]+@[\w\-]+\.[\w\-]+$/.test(email)) {
    errors.email = "Email должен быть формата name@domen.com"
  }

  if (!/^[+\d]\d{9,14}$/.test(phone)) {
    errors.phone = "Телефон должен содержать от 10 до 15 цифр, может начинается с плюса"
  }

  return errors;
}
