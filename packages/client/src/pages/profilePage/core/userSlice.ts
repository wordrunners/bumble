import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { User, ProfileState } from '@/types/user'
import { RootState } from '@/store/store';
import { UserDTO } from '@/api/types';
import { transformUserDTOtoUser, transformUsertoUserDTO} from '@/utils'

export const changeProfile = createAsyncThunk(
  'profile/changeProfile',
  async (profie:User, thunkAPI) => {
    try {
      const response = await fetch(`${__API_ENDPOINT__}/user/profile`,
      {
        method: 'PUT',
        credentials: 'include',
        headers : { 'Content-Type': 'application/json' },
        body: JSON.stringify(transformUsertoUserDTO(profie)),
      }
      )
      
      const data = await response.json();
            
      if (response.status === 200) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
      
    } catch (e: any) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    } 
    
  }
)

const initialState: ProfileState = {
  profile: {
    avatar:  localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).avatar : '/46f3061f-ca1f-4a29-8f0e-a921109bdc10/24b0e54b-9e9f-4e8e-94d7-dfd129a4d58a_round-avatar.png',
    email: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).email :'test@test.ru',
    login: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).login :'Semen',
    firstName: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).firstName :'Семен',
    secondName: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).secondName :'Семенов',
    displayName: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).displayName :'Семен',
    phone: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).phone :'+77777777777',
  },
  status: null,
  error: null,
}

export const userSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    profileLoading(state) {
      state.status = 'loading'
    },
  },
  extraReducers: (builder) => {
    builder.addCase(changeProfile.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    }),
    builder.addCase(changeProfile.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.profile = transformUserDTOtoUser(action.payload);
      state.error = null;
      localStorage.setItem('user', JSON.stringify(state.profile))
      return state;
    }),
    builder.addCase(changeProfile.rejected, (state, action) => {
      state.status = 'error';
      state.error = ` ошибка ${action.payload}`;
      console.log('action=', action);
      
    })
  }
  
})

export default userSlice.reducer

export const userSelector = (state: RootState) => state.user;

export const { profileLoading } = userSlice.actions;

