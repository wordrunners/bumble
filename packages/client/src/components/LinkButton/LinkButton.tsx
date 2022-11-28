import { FC } from 'react';
import { Link } from 'react-router-dom';
import './LinkButton.scss';

interface Props{
    to: string;
    children: React.ReactNode;
    modifier?: string;
}

const LinkButton: FC<Props> = ({ to, children, modifier }): JSX.Element => {
    return (
        <Link
            to={to}
            className={`link-button link-button_${modifier}`}
        >
            {children}
        </Link>
    )
}

export default LinkButton;
