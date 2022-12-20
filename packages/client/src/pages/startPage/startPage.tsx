import cn from 'classnames';
import Logo from '@/assets/images/logo.png';
import './startPage.scss';
import { LinkButton } from '@/components/LinkButton';
import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { useEffect } from 'react'
import {
  setLeaders,
  selectLeaders,
} from '@/store/leaderBoardSlice'
import { 
  useAppSelector, 
  useAppDispatch,
  useAuth
} from '@/hooks'
import { Leaders } from '@/types'
import leadersData from '@/data/leaders.json'
import { logout, fetchUser } from '@/store/authSlice';

export const StartPage = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const leaders = useAppSelector(selectLeaders)
  const { isAuth } = useAuth()

  useEffect(() => {
    if (leaders.length === 0) {
      const newLeaders: Leaders = []
      leadersData.map((leader) => {
        newLeaders.push(leader)
      })
      dispatch(setLeaders(newLeaders))
    }
  }, [])
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  
  function onExit() {
    dispatch(logout());
  }
  return (
    <section className={cn('start')}>
      <Header />
      <img src={Logo} alt='logo' className={cn('start__logo')} />
      <LinkButton to='/game' modifier='game-btn'>НАЧАТЬ ИГРУ</LinkButton>
      {isAuth ? (
        <Button className="exit-btn" onClick={onExit}>ВЫЙТИ</Button>
      ) : (
        <LinkButton to='/signin' modifier='login-btn'>ВОЙТИ</LinkButton>
      )}
      
    </section> 
  )
};
