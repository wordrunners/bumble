import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store/store';
import { cardType, playersType, playerType } from "../types/canvas"

export interface GameState {
  word: string;
  status: 'idle' | 'loading' | 'failed';
  // context: CanvasRenderingContext2D,
  width: number,
  height: number,
  card: cardType | undefined,
  canvas: undefined,
  timer: number,
  setI: undefined,
  players: playersType | undefined,
}

const initialState: GameState = {
  word: '',
  status: 'idle',
  // context: CanvasRenderingContext2D,
  width: 300,
  height: 300,
  card: undefined,
  canvas: undefined,
  timer: 0,
  setI: undefined,
  players: undefined,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
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
    setWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    },
    setHeight: (state, action: PayloadAction<number>) => {
      state.height = action.payload;
    },
    setCard: (state, action: PayloadAction<cardType>) => {
      state.card = action.payload;
    },
    setCanvas: (state, action: PayloadAction<CanvasRenderingContext2D>) => {
      state.canvas = action.payload;
    },
    setTimer: (state, action: PayloadAction<number>) => {
      state.timer = action.payload;
    },
    setSetI: (state, action: PayloadAction<any>) => {
      state.setI = action.payload;
    },
    decrementTimer: (state) => {
      state.timer -= 1;
    },
    setPlayers: (state, action: PayloadAction<playersType>) => {
      state.players = action.payload;
    },
  },
});

export const { increment, deleteLetter, addLetter } = gameSlice.actions;

export const { setWidth, setHeight } = gameSlice.actions;

export const { setCard } = gameSlice.actions;

export const { setCanvas } = gameSlice.actions;

export const { setTimer, decrementTimer, setSetI } = gameSlice.actions;

export const { setPlayers } = gameSlice.actions;

export const selectWord = (state: RootState) => state.game.word;

export const selectWidth = (state: RootState) => state.game.width;

export const selectHeight = (state: RootState) => state.game.height;

export const selectCard = (state: RootState) => state.game.card;

export const selectCanvas = (state: RootState) => state.game.canvas;

export const selectTimer = (state: RootState) => state.game.timer;

export const selectSetI = (state: RootState) => state.game.setI;

export const selectPlayers = (state: RootState) => state.game.players;

export const decrementIfTime =
  (): AppThunk =>
  (dispatch, getState) => {
    const currentSetI = selectSetI(getState());
    if (currentSetI) {
      clearInterval(currentSetI);
      dispatch(setSetI(undefined));
    }

    const newSetI = setInterval(() => {
      dispatch(decrementTimer());
    }, 1000);
    dispatch(setSetI(newSetI));
  };


export const incrementIfOdd =
  (amount: string): AppThunk =>
  (dispatch, getState) => {
    const currentWord = selectWord(getState());
    if (currentWord === '1') {
      dispatch(addLetter(amount));
    }
  };

export default gameSlice.reducer;
