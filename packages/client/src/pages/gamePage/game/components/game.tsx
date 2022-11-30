


import { FC } from 'react'
import { useCanvasContext } from '../hooks/useCanvas'
import useResponsiveSize from '../hooks/useResponsiveSize'
import {DrumEntity} from '../entity/DrumEntity'
import {WordEntity} from '../entity/WordEntity'
import {HUDEntity} from '../entity/HUDEntity'
import {SendEntity} from '../entity/SendEntity'
import {EmptyEntity} from '../entity/EmptyEntity'
import {TimerEntity} from '../entity/TimerEntity'



import { useAppSelector, useAppDispatch } from '../hooks/useStore';
import {
  selectWord,
  selectCard,
  selectTimer,
  setTimer,
  decrementTimer
} from './gameSlice';

export const Game = () => {
  const word = useAppSelector(selectWord);
  const card = useAppSelector(selectCard);
  const timer = useAppSelector(selectTimer);
  const dispatch = useAppDispatch();

  
  const { context } = useCanvasContext()

  const { width, height } = useResponsiveSize()






  const render = () => {
    // console.log('g')
    if (context) {
      const emptyCanvas = new EmptyEntity(width, height)
      const drumCanvas = new DrumEntity(context, width, height,)
      const wordCanvas = new WordEntity(context, width, height, )
      const HUDCanvas = new HUDEntity(context, width, height)
      const SendCanvas = new SendEntity(context, width, height)
      const TimerCanvas = new TimerEntity(context, width, height)


      emptyCanvas.draw(context)
      if (card) {
        drumCanvas.draw(card)
        wordCanvas.draw(word, card)
        HUDCanvas.draw()
        SendCanvas.draw()
        TimerCanvas.draw(timer)


      }
    }
  }
  if (context) {
    // console.log('1');
    render()
  }



  return null
}

// export default Game
