import { Button } from "../Button";
import { LinkButton } from "../LinkButton";
import './Header.scss';

export const Header = ():JSX.Element => {
    return (
        <header className='header'>
            <Button className='header__btn'>Правила</Button>
            <LinkButton to='/forum' modifier='header-btn'>Форум</LinkButton>
            <LinkButton to='/leaderboard' modifier='header-btn'>Рейтинги</LinkButton>
        </header>
    )
};
