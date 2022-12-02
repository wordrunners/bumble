


import { useCanvasContext } from '../game/hooks/useCanvas'
import { useRef, FC, useEffect, useState, useCallback, Component } from 'react'

import {DrumEntity} from '../game/entity/DrumEntity'
import {WordEntity} from '../game/entity/WordEntity'
import {HUDEntity} from '../game/entity/HUDEntity'
import {SendEntity} from '../game/entity/SendEntity'
import {EmptyEntity} from '../game/entity/EmptyEntity'
import {PlayersEntity} from '../game/entity/PlayersEntity'
import {BackgroundEntity} from '../game/entity/BackgroundEntity'
import { Game } from '../game/components/game'

import { useAppSelector, useAppDispatch } from '../game/hooks/useStore';
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
  setStatus
  
} from '../game/components/gameSlice';

import playersData from '../game/cards/players.json'

export const Load = () => {
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

  const { context } = useCanvasContext()

  const dispatch = useAppDispatch();

  const canvasRef = useRef<HTMLCanvasElement>(null)


  // dispatch(deletePlayers())
  // console.log('--',totalPlayers);
  // playersData.map((player) => {
  //   dispatch(addPlayer(player))
  // })
  // console.log('--',activePlayer, totalPlayers);

  // useEffect(() => {
  //   // if (context) {
  //     dispatch(deletePlayers())
  //     console.log('--', totalPlayers);
  //     playersData.map((player) => {
  //       dispatch(addPlayer(player))
  //     })
  //   // }
  // }, [])


  useEffect(() => {
    console.log('key');

    const context = canvasRef.current?.getContext("2d",{willReadFrequently:true});
    if (context) {
      console.log(totalPlayers);
      // setContext(context)

      dispatch(setStatus('start'))

      window.addEventListener('keydown', setPlayers)
    
    }
  }, [])


  const setPlayers = (event: KeyboardEvent) => {
            console.log(event.key);

    // dispatch(nextActivePlayer())

    // switch (event.key) {
    //   case 'ArrowRight':
    //     console.log('1', totalPlayers, activePlayer);
    //     dispatch(nextTotalPlayers())
    //     break;
    //   case 'Enter':
    //     // dispatch(nextActivePlayer())
    //     window.removeEventListener('keydown', setPlayers)
    //     // window.addEventListener('keydown', addPlayers)
    //     // addPlayers()
    //     // console.log('--',totalPlayers);
    //     dispatch(setStatus('loading'))
    //     break;
    //   default:
    //     console.log(`Sorry`);
    // }
  }
  const loading = () => {
    // console.log('event');
  }

  // const { context } = useCanvasContext()

  const render = () => {
    // console.log('event');

    // if (context) {
    //   // console.log('-+-',totalPlayers, activePlayer, word, timer);
    //   const drumCanvas = new DrumEntity(context, width, height,)
    //   const wordCanvas = new WordEntity(context, width, height, )
    //   const HUDCanvas = new HUDEntity(context, width, height)
    //   const sendCanvas = new SendEntity(context, width, height)
    //   const playersCanvas = new PlayersEntity(context, width, height, )
    //   const backgroundCanvas = new BackgroundEntity(context, width, height, )
    //   const EmptyCanvas = new SendEntity(context, width, height)
    // }
  }

  if (context) {
    loading()
  }

  return (
    <Game />
  )
}
