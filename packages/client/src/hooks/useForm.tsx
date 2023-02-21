/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react';

export const useForm = (submitForm: () => void, initialValue: Record<string, string | number>,  validate: any): any => {
  const [values, setValues] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      submitForm();
    }
  }, [errors]);

  const handleChange = useCallback((e: any) => {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name]: value
    })
  }, [values])

  const handleSubmit = useCallback((e: any) => {
    e.preventDefault()
    setErrors(validate(values));
    setIsSubmitting(true);
  }, [values])

  return {handleChange, handleSubmit, values, errors}
}
