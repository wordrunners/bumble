import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import gameReducer from '@/pages/gamePage/game/core/gameSlice';
import leaderBoardReducer from '@/store/leaderBoardSlice';
import { authReducer } from './authSlice';
import userReducer  from './userSlice';
import { themeReducer } from './theme/themeSlice';
import { combineReducers } from 'redux'
import boardsReducer from './boards/boardsSlice'

const RootReducer = combineReducers({
  game: gameReducer,
  auth: authReducer,
  user: userReducer,
  leaderBoard: leaderBoardReducer,
  themes: themeReducer,
  boards: boardsReducer,
})

export const setupStore = (state?: RootState) => {
  return configureStore({
    reducer: RootReducer,
    preloadedState: state,
  });
}

export type RootState = ReturnType<typeof RootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
