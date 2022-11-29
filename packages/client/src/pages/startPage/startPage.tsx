import cn from 'classnames';
import Logo from '../../assets/images/logo.png';
import './startPage.scss';
import LinkButton from '@/components/LinkButton';
import Header from '@/components/Header';

export const StartPage = (): JSX.Element => {
    return (
        <section className={cn('start')}>
            <Header />
            <img src={Logo} alt='logo' className={cn('start__logo')} />
            <LinkButton to='/game' modifier='game-btn'>НАЧАТЬ ИГРУ</LinkButton>
            <LinkButton to='/login' modifier='login-btn'>ВОЙТИ</LinkButton>
        </section> 
    )
};
