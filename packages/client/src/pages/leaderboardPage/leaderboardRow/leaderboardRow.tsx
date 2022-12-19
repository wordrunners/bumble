import { FC } from 'react';
import './leaderboardRow.scss';
import { Leader } from '@/types'

interface Props {
  leader: Leader;
}

export const LeaderboardRow: FC<Props> = ({ leader }): JSX.Element => {
  const { place, login, avatar, score } = leader;

  return (
    <div className='leaderboard-row'>
      <div className='leaderboard-row__place'>{place}</div>
      <div className='leaderboard-row__avatar' style={{ backgroundImage: `url(${avatar})` }}></div>
      <p className='leaderboard-row__name'>{login}</p>
      <div className='leaderboard-row__score'>
        <p className='leaderboard-row__text'>{score}</p>
      </div>
    </div>
  );
};
