import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '@/store/store';
import {counterPoints } from "../helpers"
import { 
  Game, 
  Card, 
  Players, 
  Player, 
  Cards,
  Status 
} from "../types/canvas"


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
  card: undefined,
  timer: 0,
  timeou: undefined,
  players: [],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    setCards: (state, action: PayloadAction<Cards>) => {
      state.cards = action.payload;
    },
    addCards: (state, action: PayloadAction<Card>) => {
      state.cards?.push(action.payload);
    },
    deleteCards: (state, action: PayloadAction<Card>) => {
      const newCards: Cards = []
      state.cards?.map((card) => {
        if (card !== action.payload) {
          newCards.push(card);
        }
      })
      state.cards = newCards;
    },
    setTotalPlayers: (state, action: PayloadAction<number>) => {
      state.totalPlayers = action.payload;
    },
    nextTotalPlayers: (state,) => {
      if (state.totalPlayers === 3) {
        state.totalPlayers = 0;
      } else {
        state.totalPlayers += 1;
      }
    },
    setActivePlayer: (state, action: PayloadAction<number>) => {
      state.activePlayer = action.payload;
    },
    nextActivePlayer: (state,) => {
      if (state.activePlayer === state.totalPlayers) {
        state.activePlayer = 0;
      } else {
        state.activePlayer += 1;
      }
    },
    setActiveCard: (state, action: PayloadAction<number>) => {
      state.activeCard = action.payload;
      state.card = state.cards[action.payload];
    },
    nextActiveCard: (state,) => {
      if (state.activeCard === ((state.totalPlayers + 1)*3 - 1)) {
        state.activePlayer = -1;
        state.status = 'over'
      } else {
        state.activeCard += 1;
        state.card = state.cards[state.activeCard];
      }
    },
    increment: (state) => {
      state.word += 1;
    },
    deleteLetter: (state) => {
      const lastLetter = +state.word.charAt(state.word.length-1);
      if (state.card) state.card[lastLetter].enabled = true;
      state.word = state.word.slice(0, -1);
    },
    addLetter: (state, action: PayloadAction<string>) => {
      if ((state.card) && (state.card[+action.payload].enabled)) {
        state.word += action.payload;
        state.card[+action.payload].enabled = false;
      }
    },
    countPoints: (state) => {
      if (state.card) {
        state.points = counterPoints(state.word, state.card)
      }
    },
    setPoints: (state, action: PayloadAction<number>) => {
      state.points = action.payload;
    },
    clearPoints: (state) => {
      state.points = 0;
    },
    deleteWord: (state) => {
      state.word = '';
    },
    setWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    },
    setHeight: (state, action: PayloadAction<number>) => {
      state.height = action.payload;
    },
    setCard: (state, action: PayloadAction<Card>) => {
      state.card = action.payload;
    },
    setTimer: (state, action: PayloadAction<number>) => {
      state.timer = action.payload;
    },
    setTimeou: (state, action: PayloadAction<any>) => {
      state.timeou = action.payload;
    },
    decrementTimer: (state) => {
      state.timer -= 1;
    },
    deletePlayers: (state) => {
      state.players = [];
    },
    addPlayers: (state, action: PayloadAction<Players>) => {
      state.players = action.payload;
    },
    addPlayer: (state, action: PayloadAction<Player>) => {
      state.players.push(action.payload);
    },
  },
});

export const decrementIfTime =
  (): AppThunk =>
  (dispatch, getState) => {
    const currentTimeou = selectTimeou(getState());
    const activePlayer = selectActivePlayer(getState());

    if (currentTimeou) {
      clearInterval(currentTimeou);
      dispatch(setTimeou(undefined));
    }

    if (activePlayer !== -1) {
      const newTimeou = setTimeout(() => {
        console.log('tick')
        const timer = selectTimer(getState());
        if (timer === 1) {
          dispatch(nextActivePlayer());
          dispatch(nextActiveCard());
          dispatch(setTimer(60));
          dispatch(deleteWord());
          dispatch(setPoints(0));
        }
        dispatch(decrementTimer());
        dispatch(decrementIfTime());
      }, 100);
      dispatch(setTimeou(newTimeou));
    }
  };

export const addWord =
  (player: number, word: string): AppThunk =>
  (dispatch, getState) => {
    const players = selectPlayers(getState());
    const points = selectPoints(getState());
    const clonePlayers = JSON.parse(JSON.stringify(players));

    clonePlayers[player].words.push(word);
    clonePlayers[player].score += points;

    dispatch(nextActivePlayer());
    dispatch(setTimer(60));
    dispatch(deletePlayers());
    dispatch(addPlayers(clonePlayers));
  };

export const { 
  setActiveCard, nextActiveCard,
  setStatus,
  setCards, addCards, deleteCards,
  setTotalPlayers, setActivePlayer, nextActivePlayer, nextTotalPlayers,
  increment, deleteLetter, addLetter, deleteWord, setPoints, clearPoints, countPoints,
  setWidth, setHeight,
  setCard,
  setTimer, decrementTimer, setTimeou,
  addPlayers, deletePlayers, addPlayer
} = gameSlice.actions;

export const selectActiveCard = (state: RootState) => state.game.activeCard;
export const selectStatus = (state: RootState) => state.game.status;
export const selectCards = (state: RootState) => state.game.cards;
export const selectTotalPlayers = (state: RootState) => state.game.totalPlayers;
export const selectActivePlayer = (state: RootState) => state.game.activePlayer;
export const selectWord = (state: RootState) => state.game.word;
export const selectPoints = (state: RootState) => state.game.points;
export const selectWidth = (state: RootState) => state.game.width;
export const selectHeight = (state: RootState) => state.game.height;
export const selectCard = (state: RootState) => state.game.card;
export const selectTimer = (state: RootState) => state.game.timer;
export const selectTimeou = (state: RootState) => state.game.timeou;
export const selectPlayers = (state: RootState) => state.game.players;

export default gameSlice.reducer;
