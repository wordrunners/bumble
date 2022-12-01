import { useRef, FC, useEffect, useState, useCallback, Component } from 'react'

import { CanvasContext, useCanvasContext } from '../hooks/useCanvas'
import { Game } from './game'

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
  clearPoints
} from './gameSlice';
import { cardToArrays } from "../helpers/cardToArrays"

import { countPoints } from "../helpers/countPoints"


import cardsData from '../cards/cards.json'
import playersData from '../cards/players.json'

export const Canvas = () => {

  const width = useAppSelector(selectWidth);
  const height = useAppSelector(selectHeight);
  const players = useAppSelector(selectPlayers);
  const word = useAppSelector(selectWord);
  const points = useAppSelector(selectPoints);
  const card = useAppSelector(selectCard);
  const dispatch = useAppDispatch();

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | undefined>()

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d",{willReadFrequently:true});
    if (context) {
      setContext(context)

      setSizes()
      window.addEventListener('resize', setSizes)

      dispatch(setCard(cardsData[0]))
      dispatch(setTimer(60))
      dispatch(decrementIfTime())
  
      dispatch(deletePlayers())
      playersData.map((player) => {
        dispatch(addPlayer(player))
      })
    
    }
  }, [])

  const setSizes = useCallback(() => {
    dispatch(setWidth(window.innerWidth))
    dispatch(setHeight(window.innerHeight))
  }, [dispatch(setWidth), dispatch(setHeight)])

  const handleCanvasClick=(event: React.MouseEvent<HTMLElement>)=>{
    if ((context) && (card)) {
      const mousePos = { x: event.clientX, y: event.clientY };
      const pixel = context.getImageData(mousePos.x, mousePos.y, 1, 1).data;
      if (pixel) {
        const colorInfo = `${pixel[1]}`;
  
        const sector = +colorInfo.slice(colorInfo.length-1)
        const button = +colorInfo.slice(colorInfo.length-2, colorInfo.length)
    
        if (button === 29) {
          players.map((player, i) => {
            if (player.enabled) {
              let data = '';
              for (let i = 0; i < word.length; i++) {
                data += card[+word[i]].letter;
              }
              dispatch(addWord(i, data))
              dispatch(deleteWord())
              dispatch(clearPoints())
            }
          })
        } else if (sector < 9) {
          dispatch(addLetter(`${sector}`))
          const newWord = `${word}${sector}`
          dispatch(setPoints(countPoints(newWord, card)))
        } else if ((sector === 9) && (word)) {
          dispatch(deleteLetter())
          const newWord = word.slice(0, word.length-1)
          dispatch(setPoints(countPoints(newWord, card)))
        }
      }
    }
  };

  return (
    <CanvasContext.Provider value={{ context: context }}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onClick={handleCanvasClick}
      ></canvas>
      <Game />
    </CanvasContext.Provider>
  )
}
