import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import gameReducer from '@/pages/gamePage/game/core/gameSlice';
import leaderBoardReducer from '@/store/leaderBoardSlice';
import { authReducer } from './authSlice';
import userReducer  from '@/pages/profilePage/core/userSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    auth: authReducer,
    user: userReducer,
    leaderBoard: leaderBoardReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
