import cn from 'classnames';
import Logo from '@/assets/images/logo.png';
import './startPage.scss';
import { LinkButton } from '@/components/LinkButton';
import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { useEffect } from 'react'
import { 
  useAppDispatch,
  useAuth
} from '@/hooks'
import { logout, fetchUser, oAuth } from '@/store/authSlice';
import { addPlayer } from '@/pages/gamePage/game/core/gameSlice';

export const StartPage = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { isAuth } = useAuth()

  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  
  function onExit() {
    dispatch(logout());
    dispatch(addPlayer({  
      'login': '',
      'words': [],
      'score': 0,
      'enabled': true
    }))
  }

  useEffect(() => {
    const code = new URLSearchParams(globalThis.window?.location.search).get('code');

    if (code) {
      dispatch(oAuth({ code, redirect_uri: 'http://localhost:3000' }));
    } else {
      return
    }
  }, []);

  return (
    <section className={cn('start')}>
      <Header />
      <div className={cn('start__wrapper')}>
        <img src={Logo} alt='logo' className={cn('start__logo')} />
        <LinkButton to='/game' modifier='game-btn'>НАЧАТЬ ИГРУ</LinkButton>
        {isAuth ? (
          <Button className="exit-btn" onClick={onExit}>ВЫЙТИ</Button>
        ) : (
          <LinkButton to='/signin' modifier='login-btn'>ВОЙТИ</LinkButton>
        )}
      </div> 
    </section>
  )
};
