import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  className?: string;
}

export const MuteUnmute: FC<ButtonProps> = ({ children, className, onClick, type = 'button', disabled }): JSX.Element => {
  return (
    <button
      className={`button ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};