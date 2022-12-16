import './leaderboardPage.scss';
import { LeaderboardRow } from './leaderboardRow';
import Bag from '@/assets/images/pic-08.png';
import Rule from '@/assets/images/pic-07.png';
import { useAppSelector } from '@/hooks'
import { selectLeaders } from '@/store/leaderBoardSlice'
import { Leader } from '@/types'

export const LeaderboardPage = (): JSX.Element => {
	const leaders = useAppSelector(selectLeaders)

	return (
		<section className='leaderboard'>
			<div className='leaderboard__header'>
				<img src={Rule} className='leaderboard__icon' />
				<h2 className='leaderboard__title'>ЛИДЕРЫ</h2>
				<img src={Bag} className='leaderboard__icon leaderboard__icon_rotated' />
			</div>
			<div className='leaderboard__list'>
				{leaders.map((leader: Leader, i) => (
					<LeaderboardRow key={i} leader={leader} />
				))}
			</div>
		</section>
	);
};
