import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store/store';

export interface GameState {
  word: string;
  status: 'idle' | 'loading' | 'failed';
  // context: CanvasRenderingContext2D,
  width: number,
  height: number,
}

const initialState: GameState = {
  word: '',
  status: 'idle',
  // context: CanvasRenderingContext2D,
  width: 300,
  height: 300,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    increment: (state) => {
      state.word += 1;
    },
    deleteLetter: (state) => {
      state.word = state.word.slice(0, -1);
    },
    addLetter: (state, action: PayloadAction<string>) => {
      state.word += action.payload;
    },
    setWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    },
    setHeight: (state, action: PayloadAction<number>) => {
      state.height = action.payload;
    },
  },
});

export const { increment, deleteLetter, addLetter } = gameSlice.actions;

export const { setWidth, setHeight } = gameSlice.actions;

export const selectWord = (state: RootState) => state.game.word;

export const selectWidth = (state: RootState) => state.game.width;

export const selectHeight = (state: RootState) => state.game.height;

export const incrementIfOdd =
  (amount: string): AppThunk =>
  (dispatch, getState) => {
    const currentWord = selectWord(getState());
    if (currentWord === '1') {
      dispatch(addLetter(amount));
    }
  };

export default gameSlice.reducer;
