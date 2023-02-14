import { createSlice, PayloadAction, createSelector} from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { ThemeState } from '@/types';

import type { Theme } from '@/types';
import { changeTheme, fetchTheme } from './';

export const initialState: ThemeState = {
  theme: 'dark',
  loading: false
};

export const themeSlice = createSlice({
  name: 'themes',
  initialState,
  reducers: {
  },
  extraReducers: buider => {
    buider.addCase(changeTheme.pending.type, state => {
      state.loading = true;
    })
    buider.addCase(
      changeTheme.fulfilled.type,
      (state, { payload: { themeId } }: PayloadAction<{ themeId: number }>) => {
        const newTheme = themeId === 1 ? 'dark' : 'light'
        state.theme = newTheme
        state.loading = false;
      }
    )
    buider.addCase(
      changeTheme.rejected.type,
      (state, { payload }: PayloadAction<string>) => { state.loading = false; }
    )
    buider.addCase(fetchTheme.pending, state => {
      state.loading = true;
    });
    buider.addCase(
      fetchTheme.fulfilled,
      (state, action: PayloadAction<Theme>) => {
        state.loading = false;
        state.theme = action.payload;
      }
    );
    buider.addCase(fetchTheme.rejected, state => {
      state.loading = false;
    });
  }
});

export const selectTheme = createSelector(
  (state: RootState) => state.themes,
  themes => themes.theme as Theme
);

export const selectThemesLoading = createSelector(
  (state: RootState) => state.themes,
  themes => themes.loading
);

export const themeReducer = themeSlice.reducer;


