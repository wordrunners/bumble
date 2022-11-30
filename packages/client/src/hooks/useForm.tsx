/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';


export type FormProps = {
  login?: string;
  password?: string;
  firstName?: string;
  secondName?: string;
  phone?: string;
  email?: string;
}

export const useForm = (callback: () => void, validate: any) => {
  const [values, setValues] = useState<FormProps>({});
  const [errors, setErrors] = useState<FormProps>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
  }

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback();
      }
    },
    [errors]
  );

  return {handleChange, handleSubmit, values, errors}
}
