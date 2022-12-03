import { FC } from 'react';
import './leaderboardRow.scss';

export interface Leader {
    id: string;
    place: number;
    name: string;
    avatar: string;
    score: number;
}

interface Props {
    leader: Leader;
}

export const LeaderboardRow: FC<Props> = ({ leader }): JSX.Element => {
    const { place, name, avatar, score } = leader;

    return (
        <div className='leaderboard-row'>
            <div className='leaderboard-row__place'>{place}</div>
            <img className='leaderboard-row__avatar' src={avatar} />
            <p className='leaderboard-row__name'>{name}</p>
            <p className='leaderboard-row__score'>{score}</p>
        </div>
    );
};