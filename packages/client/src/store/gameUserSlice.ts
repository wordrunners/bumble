// ! – Используется до пулл реквеста с полноценным userSlice

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { 
  GameUser, 
} from "@/types"

const initialState: GameUser = {
  authorized: true,
  login: "Tester"
}

export const gameUserSlice = createSlice({
  name: 'gameUser',
  initialState,
  reducers: {
    setAuthorized: (state, action: PayloadAction<boolean | undefined>) => {
      state.authorized = action.payload;
    },
  },
});

export const { 
  setAuthorized,
} = gameUserSlice.actions;

export const selectAuthorized = (state: RootState) => state.gameUser.authorized;
export const selectLogin = (state: RootState) => state.gameUser.login;

export default gameUserSlice.reducer;
