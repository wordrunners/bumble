import './leaderboardPage.scss';
import { LeaderboardRow } from './leaderboardRow';
import Bag from '@/assets/images/pic-08.png';
import Rule from '@/assets/images/pic-07.png';
import { useEffect, useState } from 'react';
import { Leader, mockLeaders } from './constants';

export const LeaderboardPage = (): JSX.Element => {
    const [leaders, setLeaders] = useState<Leader[]>([] as Leader[]);

    useEffect(() => {
        setLeaders(mockLeaders);
    }, []);

    return (
        <section className='leaderboard'>
            <div className='leaderboard__header'>
                <img src={Rule} className='leaderboard__icon' />
                <h2 className='leaderboard__title'>ЛИДЕРЫ</h2>
                <img src={Bag} className='leaderboard__icon leaderboard__icon_rotated' />
            </div>
            <div className='leaderboard__list'>
                {leaders.map((leader: Leader) => (
                    <LeaderboardRow key={leader.id} leader={leader} />
                ))}
            </div>
        </section>
    );
};
