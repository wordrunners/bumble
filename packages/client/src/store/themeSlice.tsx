import { createSlice, PayloadAction, createSelector} from '@reduxjs/toolkit';
import { themes } from '@/utils/themeContext';
import { RootState } from '@/store/store';
import { ThemeState } from '@/types';

export const initialState: ThemeState = {
  activeTheme: themes.light
};

export const themeSlice = createSlice({
  name: 'themes',
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction<Record<'style', string>>) {
      state.activeTheme = action.payload;
    },
  },
});

export const selectTheme = createSelector(
  (state: RootState) => state.themes,
  activeTheme => activeTheme.activeTheme
);

export const themeReducer = themeSlice.reducer;
export const { changeTheme } = themeSlice.actions;
