


import { FC } from 'react'
import { useCanvasContext } from '../hooks/useCanvas'
import useResponsiveSize from '../hooks/useResponsiveSize'
import DrumEntity from '../entity/DrumEntity'
import WordEntity from '../entity/WordEntity'
import HUDEntity from '../entity/HUDEntity'
import SendEntity from '../entity/SendEntity'
import cards from '../cards/cards.json'

import useColor from '../../del/useColor'

import { useAppSelector, useAppDispatch } from '../hooks/useStore';
import {
  selectWord,
} from './gameSlice';

const Game = () => {
  const word = useAppSelector(selectWord);
  
  const { context } = useCanvasContext()
  const { width, height } = useResponsiveSize()
  // const { generateColor } = useColor()
  // let timer = 1

  const drumCanvas = new DrumEntity([0.0211, 0.028, 0.015], 'rgba(255,179,0,0.88)')
  const wordCanvas = new WordEntity([0.0211, 0.028, 0.015], 'rgba(255,179,0,0.88)')
  const HUDCanvas = new HUDEntity([0.0211, 0.028, 0.015], 'rgba(255,179,0,0.88)')
  const SendCanvas = new SendEntity([0.0211, 0.028, 0.015], 'rgba(255,179,0,0.88)')


  
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

    // drumCanvas.draw(context!, width, height, multiplication, letters, amount, card)
    drumCanvas.draw(context!, width, height, card)

    wordCanvas.draw(context!, width, height, word, card)

    HUDCanvas.draw(context!, width, height)
    SendCanvas.draw(context!, width, height)

  }
  if (context) render()
  return null
}

export default Game
