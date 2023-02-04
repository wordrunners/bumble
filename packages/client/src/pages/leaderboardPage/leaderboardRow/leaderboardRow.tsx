import { FC } from 'react';
import './leaderboardRow.scss';
import { Leader } from '@/types'
import cn from 'classnames';
import { API } from '@/data/api';

interface Props {
  leader: Leader;
  place: number;
  currentLeader: Leader;
}

export const LeaderboardRow: FC<Props> = ({ leader, place, currentLeader }): JSX.Element => {
  const { name, avatar, score, id } = leader.data;
  const currentRow: boolean = currentLeader?.data?.id === id;

  return (
    <div className={cn('leaderboard-row', { 'leaderboard-row_current' : currentRow })}>
      <div className='leaderboard-row__place'>{place}</div>
      <div className='leaderboard-row__avatar' style={{
        backgroundImage: `url(${avatar ? `${API}/resources${avatar}` : '/src/assets/images/avatar.png'})`
      }}></div>
      <p className='leaderboard-row__name'>{name}</p>
      <div className='leaderboard-row__score'>
        <p className='leaderboard-row__text'>{score}</p>
      </div>
    </div>
  );
};
