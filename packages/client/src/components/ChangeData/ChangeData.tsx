import React, { ChangeEvent, FC } from "react";
import './ChangeData.scss'

type ChangeDataProps = {
  onInput?: () => void;
  type?: 'text' | 'password' | 'email';
  placeholder: string,
  title?: string,
  value?: string;
  onChange?: (e:React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  name?: string;
}

export const ChangeData: FC<ChangeDataProps> = (props) => {
  const {title, onChange, onBlur, value, type, name, placeholder} = props;
  return (
    <div className='data-list'>
      <span>{title}</span>
      <div className='change'>
        <input onChange={onChange} onBlur={onBlur} value={value} title={title} type={type} name={name} placeholder={placeholder}/>
      </div>
    </div>
  )
} 