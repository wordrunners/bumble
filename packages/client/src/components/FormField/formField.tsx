import React, { FC } from "react";

import "./formField.scss";

type FormFieldProps = {
  type?: string;
  name?: string;
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent) => void;
}

type Props = FC<FormFieldProps>;

export const FormField: Props = (props) => {
  const {type, name, label, value, onChange} = props;

  return (
    <div className="form__field">
      <input className="form__field-input" type={type} name={name} value={value} required onChange={onChange}/>
      <label className="form__field-label">{label}</label>
    </div>
  )
}
