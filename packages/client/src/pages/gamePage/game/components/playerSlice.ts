import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store/store';
import { cardType, playersType, playerType } from "../types/canvas"

const initialState: playerType = {
  login: '',
  words: [],
  score: 0,
  enabled: false
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setWordzz: (state, action: PayloadAction<string>) => {
      state.words.push(action.payload);
    },
  },
});

export const { setWordzz } = playerSlice.actions;

export const selectWords = (state: RootState) => state.player.words;

export default playerSlice.reducer;
