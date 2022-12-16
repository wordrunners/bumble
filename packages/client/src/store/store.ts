import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import gameReducer from '@/pages/gamePage/game/core/gameSlice';
import gameUserReducer from '@/store/gameUserSlice';
import leaderBoardReducer from '@/store/leaderBoardSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    gameUser: gameUserReducer,
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
