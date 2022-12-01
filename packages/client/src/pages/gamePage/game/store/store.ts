import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import gameReducer from '../components/gameSlice';
import playerReducer from '../components/playerSlice';


export const store = configureStore({
  reducer: {
    game: gameReducer,
    player: playerReducer,
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
