import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import gameReducer from '@/pages/gamePage/game/core/gameSlice';
import gameUserReducer from '@/store/gameUserSlice';
import leaderBoardReducer from '@/store/leaderBoardSlice';
import { authReducer } from './authSlice';
import userReducer  from '@/pages/profilePage/core/userSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    gameUser: gameUserReducer,
    leaderBoard: leaderBoardReducer,
    auth: authReducer,
    user: userReducer,
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
