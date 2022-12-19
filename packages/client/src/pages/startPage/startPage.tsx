import cn from 'classnames';
import Logo from '@/assets/images/logo.png';
import './startPage.scss';
import { LinkButton } from '@/components/LinkButton';
import { Header } from '@/components/Header';
import { useEffect } from 'react'
import {
  setLeaders,
  selectLeaders,
} from '@/store/leaderBoardSlice'
import { 
  useAppSelector, 
  useAppDispatch 
} from '@/hooks'
import { Leaders } from '@/types'
import leadersData from '@/data/leaders.json'

export const StartPage = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const leaders = useAppSelector(selectLeaders)

  useEffect(() => {
    if (leaders.length === 0) {
      const newLeaders: Leaders = []
      leadersData.map((leader) => {
        newLeaders.push(leader)
      })
      dispatch(setLeaders(newLeaders))
    }
  }, [])

  return (
    <section className={cn('start')}>
      <Header />
      <img src={Logo} alt='logo' className={cn('start__logo')} />
      <LinkButton to='/game' modifier='game-btn'>НАЧАТЬ ИГРУ</LinkButton>
      <LinkButton to='/signin' modifier='login-btn'>ВОЙТИ</LinkButton>
    </section> 
  )
};
