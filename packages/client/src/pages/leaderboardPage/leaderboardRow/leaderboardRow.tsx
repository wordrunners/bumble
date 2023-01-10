import { FC } from 'react';
import './leaderboardRow.scss';
import { Leader } from '@/types'

interface Props {
  leader: Leader;
  place: number;
}

export const LeaderboardRow: FC<Props> = ({ leader, place }): JSX.Element => {
  const { name, avatar, score } = leader.data;

  return (
    <div className='leaderboard-row'>
      <div className='leaderboard-row__place'>{place}</div>
      <div className='leaderboard-row__avatar' style={{ backgroundImage: `url(${avatar ? avatar : '/src/assets/images/avatar.png'})` }}></div>
      <p className='leaderboard-row__name'>{name}</p>
      <div className='leaderboard-row__score'>
        <p className='leaderboard-row__text'>{score}</p>
      </div>
    </div>
  );
};
