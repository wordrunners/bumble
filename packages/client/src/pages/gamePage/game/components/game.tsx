


import { FC } from 'react'
import { useCanvasContext } from '../hooks/useCanvas'
import useResponsiveSize from '../hooks/useResponsiveSize'
import {DrumEntity} from '../entity/DrumEntity'
import {WordEntity} from '../entity/WordEntity'
import {HUDEntity} from '../entity/HUDEntity'
import {SendEntity} from '../entity/SendEntity'
import {EmptyEntity} from '../entity/EmptyEntity'
import {TimerEntity} from '../entity/TimerEntity'
import {PlayersEntity} from '../entity/PlayersEntity'




import { useAppSelector, useAppDispatch } from '../hooks/useStore';
import {
  selectWord,
  selectCard,
  selectTimer,
  setTimer,
  decrementTimer,
  selectPlayers
} from './gameSlice';

export const Game = () => {
  const word = useAppSelector(selectWord);
  const card = useAppSelector(selectCard);
  const timer = useAppSelector(selectTimer);
  const players = useAppSelector(selectPlayers);

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
      const timerCanvas = new TimerEntity(context, width, height)
      const playersCanvas = new PlayersEntity(context, width, height, )




      // emptyCanvas.draw(context)
      if (card) {

        if (document.fonts) {
          document.fonts.load("bold 16px 'PequenaPro'", "b").then(() => {
              // console.log(timer)

              drumCanvas.draw(card)
              wordCanvas.draw(word, card)
              HUDCanvas.draw()
              timerCanvas.draw(timer)

              if (word) {
                SendCanvas.draw()

              }

              if (players) {
                playersCanvas.draw(players)

              }

          });
        }

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
