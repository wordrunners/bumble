import React, { useEffect, useState } from "react";

export const useValidation = (value: any, validations: any) => {
  
  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLenghtError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [inputValid, setInputValid] = useState(false);

  const NAME = /^[А-ЯЁA-Z][а-яА-ЯёЁa-zA-Z-]{1,20}$/;
  const PASSWORD = /^((?=.*\d)(?=.*[A-Z])[a-zA-Z0-9]{8,41})$/
  const EMAIL = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  const PHONE = /^((8|\+)[0-9]{10,15})$/;
  const LOGIN = /^[a-zA-Z][a-zA-Z0-9-_]{2,20}$/;

  useEffect( () => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLength': 
          value.length < validations[validation] ? setMinLenghtError(true) : setMinLenghtError(false)
          break;
        case 'isEmpty':
          value ? setEmpty(false) : setEmpty(true)
          break;
        case 'isEmail':
          EMAIL.test(String(value).toLocaleLowerCase()) ? setEmailError(false) : setEmailError(true)
          break;
        case 'isLogin':
          LOGIN.test(String(value)) ? setLoginError(false) : setLoginError(true)
          break;
        case 'isPassword':
          PASSWORD.test(String(value)) ? setPasswordError(false) : setPasswordError(true)
          break;
        case 'isName':
          NAME.test(String(value)) ? setNameError(false) : setNameError(true)
          break;
        case 'isPhone':
          PHONE.test(String(value)) ? setPhoneError(false) : setPhoneError(true)
          break;

      }
    }
  }, [value])

  useEffect(() => {
    if (isEmpty || loginError || minLengthError || emailError || passwordError || nameError || phoneError) {
      setInputValid(false)
    } else {
      setInputValid(true)
    }
  }, [isEmpty, loginError, minLengthError, emailError, passwordError, nameError, phoneError])

  return {
    isEmpty, loginError, minLengthError, emailError, passwordError, nameError, phoneError, inputValid,
  }
}

export const useInput = (initialValue: any, validations: any) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false); 
  const valid = useValidation(value, validations);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  const onBlur =() => {
    setDirty(true);
  }

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid
  }
}