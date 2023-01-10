import './leaderboardPage.scss';
import { LeaderboardRow } from './leaderboardRow';
import Bag from '@/assets/images/pic-08.png';
import Rule from '@/assets/images/pic-07.png';
import { useAppDispatch, useAppSelector } from '@/hooks'
import { addUserToLeaderboard, fetchLeaderboard, selectLeaders } from '@/store/leaderBoardSlice'
import { Leader } from '@/types'
import { useEffect } from 'react';
import { Header } from '@/components/Header';
import { LinkButton } from '@/components/LinkButton';

export const LeaderboardPage = (): JSX.Element => {
  const leaders = useAppSelector(selectLeaders)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, []);

  // useEffect(() => {
  //   dispatch(addUserToLeaderboard({
  //     id: 67816,
  //     score: 20,
  //     name: 'Kvi',
  //   }));
  // }, []);
const sortedData = [...leaders].sort((a, b) => b.data.score - a.data.score);
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
          {sortedData?.map((leader: Leader, idx: number) => (
            <LeaderboardRow key={leader.data.id} leader={leader} place={idx + 1} />
          ))}
        </div>
      </div>
    </section>
  );
};
