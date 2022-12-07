/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

export const useForm = (submitForm: () => void, initialValue: Record<string, string | number>,  validate: any): any => {
  const [values, setValues] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      submitForm();
    }
  }, [errors]);

  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setErrors(validate(values));
    setIsSubmitting(true);
  }

  return {handleChange, handleSubmit, values, errors}
}
