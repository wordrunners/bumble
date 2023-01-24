import './leaderboardPage.scss';
import { LeaderboardRow } from './leaderboardRow';
import Bag from '@/assets/images/pic-08.png';
import Rule from '@/assets/images/pic-07.png';
import { useAppDispatch, useAppSelector } from '@/hooks'
import { fetchLeaderboard, selectLeaders } from '@/store/leaderBoardSlice'
import { Leader, Leaders } from '@/types'
import { useEffect } from 'react';
import { LinkButton } from '@/components/LinkButton';
import { fetchUser, selectUser } from '@/store/authSlice';
import { UserDTO } from '@/api/types';

export const LeaderboardPage = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const leaders = useAppSelector(selectLeaders);
  const user: UserDTO = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchLeaderboard());
    dispatch(fetchUser());
  }, []);
  
  const currentLeader: Leader = leaders.find(item => item.data.id === user?.id) || {} as Leader;

  const sortedLeaders: Leaders = [...leaders].sort((a, b) => b.data.score - a.data.score);

  const isCurrentLeaderInLeaders: boolean = sortedLeaders.slice(0,3).includes(currentLeader);
  const currentLeaderPlace: number = sortedLeaders.indexOf(currentLeader) + 1;

  return (
    <section className='leaderboard'>
      <LinkButton to='/' modifier='header-btn'>Назад</LinkButton>
      <div className='leaderboard__wrapper'>
        <div className='leaderboard__header'>
          <img src={Rule} className='leaderboard__icon' />
          <h2 className='leaderboard__title'>ЛИДЕРЫ</h2>
          <img src={Bag} className='leaderboard__icon leaderboard__icon_rotated' />
        </div>
        <div className='leaderboard__list'>
          {sortedLeaders.slice(0,3).map((leader: Leader, idx: number) => (
            <LeaderboardRow key={leader.data.id} leader={leader} place={idx + 1} currentLeader={currentLeader}/>
          ))}
        </div>
        {currentLeader.data && !isCurrentLeaderInLeaders &&
          <LeaderboardRow leader={currentLeader} place={currentLeaderPlace} currentLeader={currentLeader}/>
        }
      </div>
    </section>
  );
};
