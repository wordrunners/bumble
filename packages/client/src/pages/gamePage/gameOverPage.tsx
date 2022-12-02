import { Provider } from 'react-redux';
import { store } from '../../store/store';
import './gamePage.scss';
import { GamePlay } from './game/components/gamePlay'
import { GameStart } from './game/components/gameStart'
import { GameOver } from './game/components/gameOver'



export function GameOverPage() {
  return (
    <div className="game-page">
      {/* <Provider store={store}> */}
        <GameOver />
        {/* <Canvas /> */}
      {/* </Provider> */}
    </div>
  );
}
