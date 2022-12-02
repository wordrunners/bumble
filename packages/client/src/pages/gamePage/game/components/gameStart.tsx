import { useRef, FC, useEffect, useState, useCallback, Component } from 'react'
import { useNavigate } from "react-router-dom";

import { CanvasContext, useCanvasContext } from '../hooks/useCanvas'
import { Game } from './game'
import { Load } from '../../del/load'

import { useAppSelector, useAppDispatch } from '../hooks/useStore';
import {
  deleteLetter,
  addLetter,
  selectWord,
  selectHeight,
  selectWidth,
  setWidth,
  setHeight,
  setCard,
  setTimer,
  selectTimer,
  decrementIfTime,
  selectPlayers,
  addPlayer,
  deletePlayers,
  addWord,
  selectCard,
  deleteWord,
  selectPoints,
  setPoints,
  clearPoints,
  setTotalPlayers, 
  setActivePlayer,
  selectTotalPlayers,
  selectActivePlayer,
  selectStatus,
  setStatus,
  nextActivePlayer,
  nextTotalPlayers,
  selectCards
} from './gameSlice';
import { cardToArrays } from "../helpers/cardToArrays"

import { countPoints } from "../helpers/countPoints"


import cardsData from '../cards/cards.json'
import playersData from '../cards/players.json'

export const GameStart = () => {

  const navigate = useNavigate();

  const status = useAppSelector(selectStatus);
  const width = useAppSelector(selectWidth);
  const height = useAppSelector(selectHeight);
  const players = useAppSelector(selectPlayers);
  const word = useAppSelector(selectWord);
  const points = useAppSelector(selectPoints);
  const card = useAppSelector(selectCard);
  const cards = useAppSelector(selectCards);

  const totalPlayers = useAppSelector(selectTotalPlayers);
  const activePlayer = useAppSelector(selectActivePlayer);
  const dispatch = useAppDispatch();

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | undefined>()

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d",{willReadFrequently:true});
    if (context) {
      setContext(context)
      dispatch(setStatus('start'))
      window.addEventListener('keydown', setPlayers)
      dispatch(setTotalPlayers(0))
      setSizes()
      window.addEventListener('resize', setSizes)
    }
  }, [])

  const setPlayers = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowRight':
        console.log('1', totalPlayers, activePlayer);
        dispatch(nextTotalPlayers())
        break;
      case 'Enter':
        window.removeEventListener('keydown', setPlayers)
        navigate("/game-play");

        dispatch(setStatus('loading'))
        break;
      default:
        console.log(`Sorry`);
    }
  }

  const setSizes = useCallback(() => {
    dispatch(setWidth(window.innerWidth))
    dispatch(setHeight(window.innerHeight))
  }, [dispatch(setWidth), dispatch(setHeight)])

  return (
    <CanvasContext.Provider value={{ context: context }}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        // onClick={handleCanvasClick}
      ></canvas>
      <Game />
    </CanvasContext.Provider>
  )
}
