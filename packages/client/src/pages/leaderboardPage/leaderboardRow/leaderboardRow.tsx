import { FC } from 'react';
import { Leader } from '../constants';
import './leaderboardRow.scss';

interface Props {
    leader: Leader;
}

export const LeaderboardRow: FC<Props> = ({ leader }): JSX.Element => {
    const { place, name, avatar, score } = leader;

    return (
        <div className='leaderboard-row'>
            <div className='leaderboard-row__place'>{place}</div>
            <div className='leaderboard-row__avatar' style={{ backgroundImage: `url(${avatar})` }}></div>
            <p className='leaderboard-row__name'>{name}</p>
            <div className='leaderboard-row__score'>
                <p className='leaderboard-row__text'>{score}</p>
            </div>
        </div>
    );
};