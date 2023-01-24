import { useRef, useEffect, useState, } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  CanvasContext, 
  useAppSelector, 
  useAppDispatch
 } from '@/hooks'
import {
  selectHeight,
  selectWidth,
  selectCard,
  selectTotalPlayers,
  setStatus,
  setSettings,
  selectPlayers,
  selectSettings,
} from '@/pages/gamePage/game/core/gameSlice'
import { Game } from '@/pages/gamePage/game/core/game'
import { 
  BUMBLE
} from '@/data/consts'
import { addUserToLeaderboard, selectLeaders } from '@/store/leaderBoardSlice'
import { UserDTO } from '@/api/types'
import { selectCheckAuth, selectUser } from '@/store/authSlice'
import { Leader, LeaderPayload, Players } from '@/types'

export const GameOver = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const totalPlayers = useAppSelector(selectTotalPlayers)
  if ((totalPlayers === -1)) {
    navigate(`/game`)
  }

  const width = useAppSelector(selectWidth)
  const height = useAppSelector(selectHeight)
  const card = useAppSelector(selectCard)
  const players: Players = useAppSelector(selectPlayers)
  const user: UserDTO = useAppSelector(selectUser)
  const isAuth: boolean = useAppSelector(selectCheckAuth)
  const leaders = useAppSelector(selectLeaders)
  const settings = useAppSelector(selectSettings)

  const currentLeader: Leader = leaders.find(item => item.data.id === user?.id) || {} as Leader
  const needToSendScore: boolean = settings === 'online' && isAuth && players.length === 1

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | undefined>()

  useEffect(() => {
    if ((totalPlayers === -1)) {
      navigate(`/game`)
    }
    const context = canvasRef.current?.getContext('2d',{willReadFrequently:true})
    if (context) {
      setContext(context)
      dispatch(setStatus('over'))
    }
  }, [])

  const handleCanvasClick=(event: React.MouseEvent<HTMLElement>)=>{
    if ((context) && (card)) {
      const mousePos = { x: event.clientX, y: event.clientY }
      const pixel = context.getImageData(mousePos.x, mousePos.y, 1, 1).data
      if (pixel) {
        const colorInfo = `${pixel[1]}`
        const button = +colorInfo.slice(colorInfo.length-2, colorInfo.length)

        if (button === BUMBLE) {
          if (needToSendScore) {
            const leaderboardData: LeaderPayload = {
              id: user.id,
              name: user.login,
              score: currentLeader.data ? (players[0].score + currentLeader?.data?.score) : players[0].score,
              avatar: user.avatar,
            }
            dispatch(addUserToLeaderboard(leaderboardData))
          }
          navigate('/')
          dispatch(setSettings('default'))
        }
      }
    }
  }

  if (totalPlayers !== -1) {
    return (
      <CanvasContext.Provider value={{ context: context }}>
        <canvas
          ref={ canvasRef }
          width={ width }
          height={ height }
          onClick={ handleCanvasClick }
        ></canvas>
        <Game />
      </CanvasContext.Provider>
    )
  } else {
    return (
      null
    )
  }
}
