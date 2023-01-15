import { createSlice, PayloadAction, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import type { UserDTO } from '@/api/types';
import { RootState } from '@/store/store';
import { authAPI } from '@/api/authApi';
import { SigninRequestData,  SignupRequestData} from '@/api/authApi';
import { transformUserDTOtoUser} from '@/utils';
import type { AuthState } from '@/types';

const initialState: AuthState = {
  isAuth: false,
  user: null,
  loading: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<UserDTO>) {
      state.user = action.payload;
    },
  },
  extraReducers: buider => {
    buider.addCase(fetchUser.pending, state => {
      state.loading = true;
    });
    buider.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<UserDTO>) => {
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(transformUserDTOtoUser(action.payload)));
      }
    );
    buider.addCase(fetchUser.rejected, state => {
      state.loading = false;
      state.isAuth = false;
    });
    buider.addCase(signin.pending, state => {
      state.loading = true;
    });
    buider.addCase(signin.fulfilled, state => {
      state.loading = false;
      state.isAuth = true;
    });
    buider.addCase(signin.rejected, state => {
      state.loading = false;
      state.isAuth = false;
    });
    buider.addCase(signup.pending, state => {
      state.loading = true;
    });
    buider.addCase(signup.fulfilled, state => {
      state.loading = false;
      state.isAuth = true;
    });
    buider.addCase(signup.rejected, state => {
      state.loading = false;
      state.isAuth = false;
    });
    buider.addCase(logout.pending, state => {
      state.loading = true;
    });
    buider.addCase(logout.fulfilled, state => {
      state.loading = false;
      state.isAuth = false;
      state.user = null;
      localStorage.removeItem('user');
    });
    buider.addCase(logout.rejected, state => {
      state.loading = false;
      state.isAuth = true;
    });
  },
});


export const fetchUser = createAsyncThunk('auth/fetchUser',
  async (_, thunkApi) => {
    try {
      const response = await authAPI.getUser();
      if (response.id) {
        return response
      }  else {
        return thunkApi.rejectWithValue('Ошибка авторизации');
      } 
    } catch (error) {
      return thunkApi.rejectWithValue('Ошибка авторизации');
    }
  }
);

export const signin = createAsyncThunk('auth/signin',
  async (data: SigninRequestData, thunkApi) => {
    try {
      const response  = await authAPI.signin(data);

      thunkApi.dispatch(fetchUser());
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue('Ошибка авторизации');
    }
  }
);

export const signup = createAsyncThunk('auth/signup',
  async (data: SignupRequestData, thunkApi) => {
    try {
      const response  = await authAPI.signup(data);
      thunkApi.dispatch(fetchUser());

      return response;
    } catch (error) {
      return thunkApi.rejectWithValue('Ошибка регистрации');
    }
  }
);

export const logout = createAsyncThunk('auth/logout',
  async (_, thunkApi) => {
    try {
      const response  = await authAPI.logout();

      return response;
    } catch (error) {
      return thunkApi.rejectWithValue('Ошибка выхода');
    }
  }
);

export const selectCheckAuth = createSelector(
  (state: RootState) => state.auth,
  auth => auth.isAuth
);

export const selectUser = createSelector(
  (state: RootState) => state.auth,
  auth => auth.user as UserDTO
);

export const selectLoading = createSelector(
  (state: RootState) => state.auth,
  auth => auth.loading
);

export const authReducer = authSlice.reducer;
