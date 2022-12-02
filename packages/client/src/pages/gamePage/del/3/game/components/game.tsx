


import { useCanvasContext } from '../hooks/useCanvas'
import {useRef, FC, useEffect, useState, useCallback, Component } from 'react'
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../hooks/useStore';

import { 
  DrumEntity,
  WordEntity,
  HUDEntity,
  SendEntity,
  EmptyEntity,
  PlayersEntity,
  LeadersEntity,
  BackgroundEntity,
  OverEntity,
  StartEntity
} from '../entity'


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
  selectStatus,
  setActiveCard,
  nextActiveCard,
  selectActiveCard,
  selectCards
} from './gameSlice';

import playersData from '../cards/players.json'

export const Game = () => {

  const navigate = useNavigate();

  const width = useAppSelector(selectWidth);
  const height = useAppSelector(selectHeight);
  const word = useAppSelector(selectWord);
  const points = useAppSelector(selectPoints);
  const card = useAppSelector(selectCard);
  const cards = useAppSelector(selectCards);
  const activeCard = useAppSelector(selectActiveCard);
  // const card = cards[activeCard];

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
      const leadersCanvas = new LeadersEntity(context, width, height, )
      const backgroundCanvas = new BackgroundEntity(context, width, height, )
      const emptyCanvas = new SendEntity(context, width, height)
      const startCanvas = new StartEntity(context, width, height, )
      const overCanvas = new OverEntity(context, width, height, )





    
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
              if (card) {
                drumCanvas.draw(card)
                wordCanvas.draw(word, card, points)
                // drumCanvas.draw(cards[activeCard])
                // wordCanvas.draw(word, cards[activeCard], points)
                HUDCanvas.draw()
    
                if (word) {
                  sendCanvas.draw()
                }

                if (players) {
                  playersCanvas.draw(players, timer, activePlayer)
                }
              }
              break;
            case 'over':
              overCanvas.draw(players, totalPlayers)
              // navigate("/game-over");

              // if (players) {
                leadersCanvas.draw(players, timer, activePlayer)
              // }

              break;
            default:
              console.log(`Sorry`);
          }



        });
    }
  }

  if (context) {
    render()
  }

  return null
}
