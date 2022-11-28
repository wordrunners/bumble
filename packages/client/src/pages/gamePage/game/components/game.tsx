


import { FC } from 'react'
import { useCanvasContext } from '../hooks/useCanvas'
import useResponsiveSize from '../hooks/useResponsiveSize'
// import useResponsiveData from '../hooks/useResponsiveData'
import DrumEntity from '../entity/DrumEntity'
import WordEntity from '../entity/WordEntity'
import cards from '../cards/cards.json'

import useColor from '../hooks/useColor'

import { useAppSelector, useAppDispatch } from '../hooks/useStore';
import {
  deleteLetter,
  increment,
  selectWord,
} from './gameSlice';
// interface CanvasProps {
  // word: string
// }

const Game = () => {
// const Game: FC = () => {
  const word = useAppSelector(selectWord);
  
  const { context } = useCanvasContext()
  const { width, height } = useResponsiveSize()
  const { generateColor } = useColor()
  // let { word } = useResponsiveData()

  // let frequency = 0.013
  // let colors: { [key: string]: string } = generateColor()

  let timer = 1
  // const games = {
  //   frontGame: new GameEntity([0.0211, 0.028, 0.015], 'rgba(255,179,0,0.88)'),
  //   backGame: new GameEntity([0.0122, 0.018, 0.005], 'rgba(255,179,0,0.48)'),
  // }

  const drumCanvas = new DrumEntity([0.0211, 0.028, 0.015], 'rgba(255,179,0,0.88)')
  const wordCanvas = new WordEntity([0.0211, 0.028, 0.015], 'rgba(255,179,0,0.88)')
  // const angel = 0

  const render = () => {
    context?.clearRect(0, 0, width, height)
    // word = useResponsiveData()

    // Object.entries(games).forEach(([gameName, game]) => {
    //   game.gameColor = colors[gameName]
    //   game.draw(context!, width, height, frequency)
    // })
    if (timer === 500) {
      // colors = generateColor()
      timer = 1
    }
    timer++
    // frequency += 0.013
    requestAnimationFrame(render)

    // console.log(word);

    // const cards1 = JSON.stringify(cards);
    // console.log(cards1);

    const multiplication = [2, 1, 3, 1, 2, 3, 1, 3, 2]
    const letters = ['Е', 'E', 'Ш', 'А', 'Л', 'Ц', 'Н', 'И', 'П', ]
    const amount = [0, 0, 2, 0, 0, 2, 0, 2, 0]
        // console.log(amount);

    // const word = '';
    drumCanvas.draw(context!, width, height, multiplication, letters, amount)
    wordCanvas.draw(context!, width, height, word)
    // console.log(angel);
    // while (angel <= Math.PI * 2) {
    //   angel = angel + Math.PI / 18;
    // console.log(angel);
    //   drum.rotate(context!, width, height, angel);
    // } 
    // angel = 0




  }
  if (context) render()
  return null
}

// Game.defaultProps = {
//   word: '2'
// };

export default Game
