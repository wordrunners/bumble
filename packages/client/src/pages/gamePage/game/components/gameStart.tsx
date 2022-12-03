import { useRef, useEffect, useState, useCallback } from 'react'
import { useNavigate } from "react-router-dom";
import { 
  CanvasContext, 
  useAppSelector, 
  useAppDispatch } from '@/hooks'
import {
  selectHeight,
  selectWidth,
  setWidth,
  setHeight,
  setTotalPlayers, 
  setStatus,
  nextTotalPlayers,
} from '../core/gameSlice';
import { Game } from '../core/game'

export const GameStart = () => {
  const navigate = useNavigate();

  const width = useAppSelector(selectWidth);
  const height = useAppSelector(selectHeight);
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
        dispatch(nextTotalPlayers())
        break;
      case 'Enter' && ' ' :
        window.removeEventListener('keydown', setPlayers)
        navigate("/game-play");

        dispatch(setStatus('loading'))
        break;
      default:
        console.log(`Кнопкой ${event.key} игру не запустить`);
    }
  }

  const setSizes = useCallback(() => {
    dispatch(setWidth(window.innerWidth))
    dispatch(setHeight(window.innerHeight))
  }, [dispatch(setWidth), dispatch(setHeight)])

  return (
    <CanvasContext.Provider value={{ context: context }}>
      <canvas
        ref={ canvasRef }
        width={ width }
        height={ height }
      ></canvas>
      <Game />
    </CanvasContext.Provider>
  )
}
