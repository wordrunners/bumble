import './gamePage.scss';
import { GameOver } from './game/components/gameOver'

export function GameOverPage() {
  return (
    <div className="game-page">
      <GameOver />
    </div>
  );
}
