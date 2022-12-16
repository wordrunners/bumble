import { useRef, useEffect, useState, useCallback } from 'react'
import { useNavigate } from "react-router-dom"
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
  setSettings,
  setActiveSettings,
} from '../core/gameSlice'
import {
  selectAuthorized,
} from '@/store/gameUserSlice'
import {
  setActiveLeader
} from '@/store/leaderBoardSlice'
import { Game } from '../core/game'
import { toggleFullscreen } from '../helpers'
import { Settings } from "@/types"

export const GameStart = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const width = useAppSelector(selectWidth)
  const height = useAppSelector(selectHeight)

  const authorized = useAppSelector(selectAuthorized)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | undefined>()

  let settingsLines: Settings = undefined
  
  if (!authorized) {
    settingsLines = "local"
    dispatch(setActiveSettings("local"))
  } 

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d",{willReadFrequently:true})
    if (context) {
      setContext(context)
      dispatch(setStatus('start'))
      window.addEventListener('keydown', setPlayers)
      dispatch(setTotalPlayers(0))
      dispatch(setActiveLeader(-1))
      setSizes()
      window.addEventListener('resize', setSizes)
    }
  }, [])

  const setPlayers = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        dispatch(setSettings(undefined))
        settingsLines = undefined
        break
      case 'ArrowDown':
        if (authorized) {
          settingsLines = "online"
          dispatch(setActiveSettings("online"))
        }
        break
      case 'ArrowUp':
        settingsLines = "local"
        dispatch(setActiveSettings("local"))
        break
      case 'ArrowRight':
        if ((settingsLines === "players") || (settingsLines === "ready"))  {
          settingsLines = "ready"
          dispatch(nextTotalPlayers())
        }
        break
      case 'Enter':
      case ' ' :
        if ((settingsLines === "players") || (settingsLines === "ready"))  {
          window.removeEventListener('keydown', setPlayers)
          navigate("/game-play")
          dispatch(setStatus('loading'))
          dispatch(setSettings("local"))
          settingsLines = undefined
          dispatch(setActiveSettings(undefined))
        } else if ((settingsLines === "local"))  {
          dispatch(setSettings(settingsLines))
          settingsLines = "players"
        } else if ((settingsLines === "online"))  {
          window.removeEventListener('keydown', setPlayers)
          navigate("/game-play")
          dispatch(setStatus('loading'))
          dispatch(setSettings(settingsLines))
          settingsLines = undefined
          dispatch(setActiveSettings(undefined))
        }
        break
      case 'f':
        toggleFullscreen()
        break
      default:
        console.log(`Кнопкой ${event.key} игру не запустить`)
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
