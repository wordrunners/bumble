import React, { FC } from "react";

type FormProps = {
  children: React.ReactNode; 
  onSubmit?: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
}

export const Form: FC<FormProps> = (props) => {
  const {onSubmit, children} = props;
  return (
    <form onSubmit={onSubmit}>
      {children}
    </form> 
  )
}
