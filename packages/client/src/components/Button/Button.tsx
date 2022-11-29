import { ButtonHTMLAttributes, FC } from 'react';
import './Button.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string;
}

export const Button: FC<ButtonProps> = ({ children, className, onClick, type = 'button', disabled }): JSX.Element => {
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
