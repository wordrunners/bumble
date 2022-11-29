


import { FC } from 'react'
import { useCanvasContext } from '../hooks/useCanvas'
import useResponsiveSize from '../hooks/useResponsiveSize'
import DrumEntity from '../entity/DrumEntity'
import WordEntity from '../entity/WordEntity'
import HUDEntity from '../entity/HUDEntity'
import SendEntity from '../entity/SendEntity'
import EmptyEntity from '../entity/EmptyEntity'
import cards from '../cards/cards.json'


import { useAppSelector, useAppDispatch } from '../hooks/useStore';
import {
  selectWord,
  selectWidth,
  selectHeight
} from './gameSlice';

export const Game = () => {
  const word = useAppSelector(selectWord);
  
  const { context } = useCanvasContext()
  // const width = useAppSelector(selectWidth);
  // const height = useAppSelector(selectHeight);
  const { width, height } = useResponsiveSize()
  // const { generateColor } = useColor()
  let timer = 1

  const emptyCanvas = new EmptyEntity(width, height)
  const drumCanvas = new DrumEntity([0.0211, 0.028, 0.015], 'rgba(255,179,0,0.88)')
  const wordCanvas = new WordEntity([0.0211, 0.028, 0.015], 'rgba(255,179,0,0.88)')
  const HUDCanvas = new HUDEntity([0.0211, 0.028, 0.015], 'rgba(255,179,0,0.88)')
  const SendCanvas = new SendEntity([0.0211, 0.028, 0.015], 'rgba(255,179,0,0.88)')
  
  const render = () => {
    emptyCanvas.draw(context!)
    // context?.clearRect(0, 0, width, height)

    if (timer === 500) {
      timer = 1
    }
    timer++
    // requestAnimationFrame(render)

    // const cardss = JSON.parse(JSON.stringify(cards));
    // console.log('1');
    const card = cards.cards.card1

    drumCanvas.draw(context!, width, height, card)

    wordCanvas.draw(context!, width, height, word, card)

    HUDCanvas.draw(context!, width, height)
    // SendCanvas.draw(context!, width, height)

  }
  if (context) render()
  return null
}

// export default Game
