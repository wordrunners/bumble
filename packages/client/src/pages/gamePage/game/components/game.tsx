


import { FC } from 'react'
import { useCanvasContext } from '../hooks/useCanvas'

import {DrumEntity} from '../entity/DrumEntity'
import {WordEntity} from '../entity/WordEntity'
import {HUDEntity} from '../entity/HUDEntity'
import {SendEntity} from '../entity/SendEntity'
import {PlayersEntity} from '../entity/PlayersEntity'
import playersData from '../cards/players.json'


import { useAppSelector, useAppDispatch } from '../hooks/useStore';
import {
  selectHeight,
  selectWidth,
  selectWord,
  selectCard,
  selectTimer,
  selectPlayers,
  selectPoints,
  setTotalPlayers, 
  setActivePlayer,
  selectTotalPlayers,
  selectActivePlayer,
  addPlayer,
  deletePlayers,
} from './gameSlice';

export const Game = () => {
  const width = useAppSelector(selectWidth);
  const height = useAppSelector(selectHeight);
  const word = useAppSelector(selectWord);
  const points = useAppSelector(selectPoints);
  const card = useAppSelector(selectCard);
  const timer = useAppSelector(selectTimer);
  const players = useAppSelector(selectPlayers);
  const totalPlayers = useAppSelector(selectTotalPlayers);
  const activePlayer = useAppSelector(selectActivePlayer);

  const dispatch = useAppDispatch();

  // dispatch(deletePlayers())
  // console.log('--',totalPlayers);
  // playersData.map((player) => {
  //   dispatch(addPlayer(player))
  // })
  // console.log('--',activePlayer);


  const { context } = useCanvasContext()

  const render = () => {

    if (context) {
      // console.log('-+-',totalPlayers, activePlayer, word, timer);
      const drumCanvas = new DrumEntity(context, width, height,)
      const wordCanvas = new WordEntity(context, width, height, )
      const HUDCanvas = new HUDEntity(context, width, height)
      const sendCanvas = new SendEntity(context, width, height)
      const playersCanvas = new PlayersEntity(context, width, height, )

      if (card) {
        document.fonts.load("16px 'PequenaPro'")
          .then(() => {
            drumCanvas.draw(card)
            wordCanvas.draw(word, card, points)
            HUDCanvas.draw()

            if (word) {
              sendCanvas.draw()
            }

            if (players) {
              playersCanvas.draw(players, timer, activePlayer)
            }

          });
      }
    }
  }

  if (context) {
    render()
  }

  return null
}
