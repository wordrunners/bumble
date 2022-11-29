


import { FC } from 'react'
import { useCanvasContext } from '../game/hooks/useCanvas'
import useResponsiveSize from '../game/hooks/useResponsiveSize'
import DrumEntity from '../game/entity/DrumEntity'
import WordEntity from '../game/entity/WordEntity'
import cards from '../game/cards/cards.json'

import useColor from './useColor'

import { useAppSelector, useAppDispatch } from '../game/hooks/useStore';
import {
  selectWord,
} from '../game/components/gameSlice';

const Game = () => {
  const word = useAppSelector(selectWord);
  
  const { context } = useCanvasContext()
  const { width, height } = useResponsiveSize()
  // const { generateColor } = useColor()
  // let timer = 1

  const drumCanvas = new DrumEntity([0.0211, 0.028, 0.015], 'rgba(255,179,0,0.88)')
  const wordCanvas = new WordEntity([0.0211, 0.028, 0.015], 'rgba(255,179,0,0.88)')

  const render = () => {
    context?.clearRect(0, 0, width, height)

    // if (timer === 500) {
    //   timer = 1
    // }
    // timer++
    // requestAnimationFrame(render)

//     const json = '{"result":true, "count":42}';
// const obj = JSON.parse(json);

// console.log(obj.count);

    // const cardss = JSON.parse(JSON.stringify(cards));
    // console.log(cards.cards.card1);
    const card = cards.cards.card1

    const multiplication = [2, 1, 3, 1, 2, 3, 1, 3, 2]
    const letters = ['Е', 'E', 'Ш', 'А', 'Л', 'Ц', 'Н', 'И', 'П', ]
    const amount = [0, 0, 2, 0, 0, 2, 0, 2, 0]

    // drumCanvas.draw(context!, width, height, multiplication, letters, amount, card)
    drumCanvas.draw(context!, width, height, card)

    wordCanvas.draw(context!, width, height, word)
  }
  if (context) render()
  return null
}

export default Game
