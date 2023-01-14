import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '@/store/store'
import { counterPoints } from '../helpers'
import { 
  Game, 
  Players, 
  Player, 
  Cards,
  Status,
  Settings,
  Bumble,
  Leader, 
} from '@/types'
import {
  checkLeaders
} from '@/store/leaderBoardSlice'
import { ROUNDS } from '@/data/consts'

const initialState: Game = {
  totalPlayers: -1,
  activePlayer: 0,
  activeCard: 0,
  cards: [],
  word: '',
  points: 0,
  status: 'start',
  width: 0,
  height: 0,
  card: null,
  timer: 0,
  timeou: null,
  players: [],
  settings: 'default',
  activeSettings: 'default',
  bumble: 'default'
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload
    },
    setWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload
    },
    setHeight: (state, action: PayloadAction<number>) => {
      state.height = action.payload
    },
    setCards: (state, action: PayloadAction<Cards>) => {
      state.cards = action.payload
    },
    setActiveCard: (state, action: PayloadAction<number>) => {
      state.activeCard = action.payload
      state.card = state.cards[action.payload]
    },
    nextActiveCard: (state,) => {
      if (state.activeCard === ((state.totalPlayers + 1)* ROUNDS - 1)) {
        state.activePlayer = -1
        state.status = 'over'
      } else {
        state.activeCard += 1
        state.card = state.cards[state.activeCard]
      }
    },
    setTotalPlayers: (state, action: PayloadAction<number>) => {
      state.totalPlayers = action.payload
    },
    nextTotalPlayers: (state,) => {
      if (state.totalPlayers === 3) {
        state.totalPlayers = 0
      } else {
        state.totalPlayers += 1
      }
    },
    addPlayers: (state, action: PayloadAction<Players>) => {
      state.players = action.payload
    },
    deletePlayers: (state) => {
      state.players = []
    },
    setActivePlayer: (state, action: PayloadAction<number>) => {
      state.activePlayer = action.payload
    },
    nextActivePlayer: (state,) => {
      if (state.activePlayer === state.totalPlayers) {
        state.activePlayer = 0
      } else {
        state.activePlayer += 1
      }
    },
    addPlayer: (state, action: PayloadAction<Player>) => {
      state.players.push(action.payload)
    },
    addLetter: (state, action: PayloadAction<string>) => {
      if ((state.card) && (state.card[+action.payload].enabled)) {
        state.word += action.payload
        state.card[+action.payload].enabled = false
      }
    },
    deleteLetter: (state) => {
      const lastLetter = +state.word.charAt(state.word.length-1)
      if (state.card) state.card[lastLetter].enabled = true
      state.word = state.word.slice(0, -1)
      if (state.card) {
        state.card.map(sector => {
          sector.selected = false
        })
      }
    },
    deleteWord: (state) => {
      state.word = ''
    },
    setPoints: (state, action: PayloadAction<number>) => {
      state.points = action.payload
    },
    clearPoints: (state) => {
      state.points = 0
    },
    countPoints: (state) => {
      if (state.card) {
        state.points = counterPoints(state.word, state.card)
      }
    },
    setTimeou: (state, action: PayloadAction<any>) => {
      state.timeou = action.payload
    },
    setTimer: (state, action: PayloadAction<number>) => {
      state.timer = action.payload
    },
    decrementTimer: (state) => {
      state.timer -= 1
    },
    setSelectedSector: (state, action: PayloadAction<string>) => {
      if ((state.card) && (state.card[+action.payload].enabled)) {
        state.card.map(sector => {
          sector.selected = false
        })
        state.card[+action.payload].selected = true
      }
    },
    deleteSelectedSectors: (state) => {
      if (state.card) {
        state.card.map(sector => {
          sector.selected = false
        })
      }
    },
    setEnabledSectors: (state) => {
      if (state.card) {
        state.card.map(sector => {
          sector.enabled = true
        })
      }
    },
    setSettings: (state, action: PayloadAction<Settings>) => {
      state.settings = action.payload
    },
    setActiveSettings: (state, action: PayloadAction<Settings>) => {
      state.activeSettings = action.payload
    },
    setBumble: (state, action: PayloadAction<Bumble>) => {
      state.bumble = action.payload
    },
  },
})

export const decrementIfTime =
  (): AppThunk =>
  (dispatch, getState) => {
    const currentTimeou = selectTimeou(getState())
    const activePlayer = selectActivePlayer(getState())

    if (currentTimeou) {
      clearInterval(currentTimeou)
      dispatch(setTimeou(null))
    }

    if (activePlayer !== -1) {
      const newTimeou = setTimeout(() => {
        const timer = selectTimer(getState())
        if (timer === 1) {
          dispatch(nextActivePlayer())
          dispatch(nextActiveCard())

          dispatch(setTimer(60))
          dispatch(deleteWord())
          dispatch(setPoints(0))
          dispatch(setEnabledSectors())
        }
        dispatch(decrementTimer())
        dispatch(decrementIfTime())
      }, 1000)
      dispatch(setTimeou(newTimeou))
    }
  }

export const addWord =
  (player: number, word: string): AppThunk =>
  (dispatch, getState) => {
    const settings = selectSettings(getState())
    const players = selectPlayers(getState())
    const points = selectPoints(getState())
    const clonePlayers = JSON.parse(JSON.stringify(players))

    clonePlayers[player].words.push(word)
    clonePlayers[player].score += points

    dispatch(nextActivePlayer())
    dispatch(setTimer(60))
    dispatch(deletePlayers())
    dispatch(addPlayers(clonePlayers))

  //   if (settings === 'online') {
  //     const candidate: Leader = {
  //       'id': 2,
  //       'place': 2,
  //       'login': clonePlayers[player].login,
  //       'avatar': '',
  //       'score': clonePlayers[player].score
  //     }
  //     // dispatch(checkLeaders(candidate))
  //   }
  }

export const { 
  setStatus,
  setWidth, setHeight,
  setCards, setActiveCard, nextActiveCard,
  setTotalPlayers, nextTotalPlayers, addPlayers, deletePlayers, 
  setActivePlayer, nextActivePlayer, addPlayer,
  addLetter, deleteLetter, deleteWord,
  setPoints, clearPoints, countPoints,
  setTimeou, setTimer, decrementTimer,
  setSelectedSector, deleteSelectedSectors, setEnabledSectors,
  setSettings, setActiveSettings,
  setBumble
} = gameSlice.actions

export const selectActiveCard = (state: RootState) => state.game.activeCard
export const selectStatus = (state: RootState) => state.game.status
export const selectCards = (state: RootState) => state.game.cards
export const selectTotalPlayers = (state: RootState) => state.game.totalPlayers
export const selectActivePlayer = (state: RootState) => state.game.activePlayer
export const selectWord = (state: RootState) => state.game.word
export const selectPoints = (state: RootState) => state.game.points
export const selectWidth = (state: RootState) => state.game.width
export const selectHeight = (state: RootState) => state.game.height
export const selectCard = (state: RootState) => state.game.card
export const selectTimer = (state: RootState) => state.game.timer
export const selectTimeou = (state: RootState) => state.game.timeou
export const selectPlayers = (state: RootState) => state.game.players
export const selectSettings = (state: RootState) => state.game.settings
export const selectActiveSettings = (state: RootState) => state.game.activeSettings
export const selectBumble = (state: RootState) => state.game.bumble

export default gameSlice.reducer
