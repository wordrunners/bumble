import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import gameReducer from '@/pages/gamePage/game/core/gameSlice';
import leaderBoardReducer from '@/store/leaderBoardSlice';
import { authReducer } from './authSlice';
import userReducer  from './userSlice';

const preloadedState = typeof window !== 'undefined' 
  ? window.__PRELOADED_STATE__ 
  : undefined;

// @ts-ignore
if (typeof window !== 'undefined') {
  delete window.__PRELOADED_STATE__;
  }

export const store = configureStore({
  reducer: {
    game: gameReducer,
    auth: authReducer,
    user: userReducer,
    leaderBoard: leaderBoardReducer,
  },
  preloadedState,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
