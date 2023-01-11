import { FC } from 'react';
import './leaderboardRow.scss';
import { Leader } from '@/types'
import { useAppSelector } from '@/hooks';
import { selectUser } from '@/store/authSlice';
import { selectLeaders } from '@/store/leaderBoardSlice';
import cn from 'classnames';

interface Props {
  leader: Leader;
  place: number;
}

export const LeaderboardRow: FC<Props> = ({ leader, place }): JSX.Element => {
  const { name, avatar, score, id } = leader.data;
  const user = useAppSelector(selectUser);
  const leaders = useAppSelector(selectLeaders);
  
  const currentLeader = leaders.find(item => item.data.id === user?.id);

  return (
    <div className={cn('leaderboard-row', { 'leaderboard-row_current' : currentLeader?.data.id === id })}>
      <div className='leaderboard-row__place'>{place}</div>
      <div className='leaderboard-row__avatar' style={{ backgroundImage: `url(${avatar ? avatar : '/src/assets/images/avatar.png'})` }}></div>
      <p className='leaderboard-row__name'>{name}</p>
      <div className='leaderboard-row__score'>
        <p className='leaderboard-row__text'>{score}</p>
      </div>
    </div>
  );
};
