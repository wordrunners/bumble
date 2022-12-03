import './leaderboardPage.scss';
import { LeaderboardRow } from './leaderboardRow';
import { Leader } from './leaderboardRow/leaderboardRow';

const leaders: Leader[] = [
    {
        id: '1',
        name: 'Евгения',
        avatar: '',
        score: 35,
    },
    {
        id: '2',
        name: 'Данил',
        avatar: '',
        score: 33,
    },
    {
        id: '3',
        name: 'Андрей',
        avatar: '',
        score: 30,
    },
    {
        id: '4',
        name: 'Ирина',
        avatar: '',
        score: 25,
    },
];

export const LeaderboardPage = (): JSX.Element => {
    return (
        <section className='leaderboard'>
            <h2 className='leaderboard__title'>ЛИДЕРЫ</h2>
            <div className='leaderboard__list'>
                {leaders.map((leader: Leader) => (
                    <LeaderboardRow key={leader.id} />
                ))}
            </div>
        </section>
    );
};
