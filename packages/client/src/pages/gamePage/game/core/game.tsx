import { 
  useCanvasContext, 
  useAppSelector 
} from '@/hooks'
import { 
  DrumEntity,
  WordEntity,
  HUDEntity,
  SendEntity,
  PlayersEntity,
  WinnersEntity,
  BackgroundEntity,
  OverEntity,
  StartEntity,
  HighScoresEntity
} from '../entity'
import {
  selectHeight,
  selectWidth,
  selectWord,
  selectCard,
  selectTimer,
  selectPlayers,
  selectPoints,
  selectTotalPlayers,
  selectActivePlayer,
  selectStatus,
  selectSettings,
  selectActiveSettings,
  selectBumble,
} from './gameSlice'
import {
  selectCheckAuth, selectUser
} from '@/store/authSlice'
import {
  selectLeaders,
} from '@/store/leaderBoardSlice'
import { Leader } from '@/types'

export const Game = () => {
  const width = useAppSelector(selectWidth)
  const height = useAppSelector(selectHeight)
  const word = useAppSelector(selectWord)
  const points = useAppSelector(selectPoints)
  const card = useAppSelector(selectCard)
  const timer = useAppSelector(selectTimer)
  const players = useAppSelector(selectPlayers)
  const totalPlayers = useAppSelector(selectTotalPlayers)
  const activePlayer = useAppSelector(selectActivePlayer)
  const status = useAppSelector(selectStatus)
  const settings = useAppSelector(selectSettings)
  const activeSettings = useAppSelector(selectActiveSettings)
  const bumble = useAppSelector(selectBumble)
  const user = useAppSelector(selectUser)
  const authorized = useAppSelector(selectCheckAuth)
  const leaders = useAppSelector(selectLeaders)

  const currentLeader: Leader = leaders.find(item => item.data.id === user?.id) || {} as Leader

  const { context } = useCanvasContext()

  const render = () => {
    if (context) {
      document.fonts.load('16px "PequenaPro"')
        .then(() => {
          BackgroundEntity(context, width, height)
          if (settings === 'online') {
            HighScoresEntity(context, width, height, leaders, currentLeader)
          }
          switch (status) {
            case 'start':
              StartEntity(context, width, height, totalPlayers, settings, activeSettings, authorized)
              break
            case 'loading':
              BackgroundEntity(context, width, height)
              break
            case 'game':
              if (card) {
                DrumEntity(context, width, height, card)
                WordEntity(context, width, height, word, card, points)
                HUDEntity(context, width, height)
                if (word) {
                  SendEntity(context, width, height, bumble)
                }
                if (players) {
                  PlayersEntity(context, width, height, players, timer, activePlayer)
                }
              }
              break
            case 'over':
              OverEntity(context, width, height, )
              if (players) {
                WinnersEntity(context, width, height, players)
                PlayersEntity(context, width, height, players, timer, activePlayer)
              }
              SendEntity(context, width, height, bumble)
              break
            default:
              console.log(`Sorry`)
          }
        })
    }
  }

  if (context) {
    render()
  }

  return null
}
