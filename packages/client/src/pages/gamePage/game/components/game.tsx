


import { useCanvasContext } from '../hooks/useCanvas'
import { useRef, FC, useEffect, useState, useCallback, Component } from 'react'

import {DrumEntity} from '../entity/DrumEntity'
import {WordEntity} from '../entity/WordEntity'
import {HUDEntity} from '../entity/HUDEntity'
import {SendEntity} from '../entity/SendEntity'
import {EmptyEntity} from '../entity/EmptyEntity'
import {PlayersEntity} from '../entity/PlayersEntity'
import {BackgroundEntity} from '../entity/BackgroundEntity'
import {StartEntity} from '../entity/StartEntity'



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
  nextTotalPlayers,
  selectActivePlayer,
  addPlayer,
  deletePlayers,
  selectStatus
} from './gameSlice';

import playersData from '../cards/players.json'

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
  const status = useAppSelector(selectStatus);

  const dispatch = useAppDispatch();

  // dispatch(deletePlayers())
  // console.log('--',totalPlayers);
  // playersData.map((player) => {
  //   dispatch(addPlayer(player))
  // })
  // console.log('--',activePlayer);

  // useEffect(() => {
  //   if (context) {
  //     dispatch(deletePlayers())
  //     console.log('--', totalPlayers);
  //     playersData.map((player) => {
  //       dispatch(addPlayer(player))
  //     })
  //   }
  // }, [])



  const { context } = useCanvasContext()

  const render = () => {

    if (context) {
      // console.log('-+-',totalPlayers, activePlayer, word, timer);
      const drumCanvas = new DrumEntity(context, width, height,)
      const wordCanvas = new WordEntity(context, width, height, )
      const HUDCanvas = new HUDEntity(context, width, height)
      const sendCanvas = new SendEntity(context, width, height)
      const playersCanvas = new PlayersEntity(context, width, height, )
      const backgroundCanvas = new BackgroundEntity(context, width, height, )
      const emptyCanvas = new SendEntity(context, width, height)
      const startCanvas = new StartEntity(context, width, height, )


      

      if (card) {
        document.fonts.load("16px 'PequenaPro'")
          .then(() => {

            switch (status) {
              case 'start':
                startCanvas.draw(players, totalPlayers)
                break;
              case 'loading':
                backgroundCanvas.draw(players, totalPlayers)
                break;
              case 'game':
                // EmptyCanvas.draw()
                drumCanvas.draw(card)
                wordCanvas.draw(word, card, points)
                HUDCanvas.draw()
    
                if (word) {
                  sendCanvas.draw()
                }

                if (players) {
                  playersCanvas.draw(players, timer, activePlayer)
                }
                break;
              case 'end':
                break;
              default:
                console.log(`Sorry`);
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
