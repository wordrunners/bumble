import { Provider } from 'react-redux';
import { store } from '../../store/store';
import './gamePage.scss';
import { GamePlay } from './game/components/gamePlay'
import { GameStart } from './game/components/gameStart'


export function GameStartPage() {
  return (
    <div className="game-page">
      {/* <Provider store={store}> */}
        <GameStart />
        {/* <Canvas /> */}
      {/* </Provider> */}
    </div>
  );
}
