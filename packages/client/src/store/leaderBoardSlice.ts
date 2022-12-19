import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '@/store/store';
import { 
  Leaders,
  Leader, 
  LeaderBoard
} from '@/types'

const initialState: LeaderBoard = {
  leaders: [],
  activeLeader: -1
}

export const leaderBoardSlice = createSlice({
  name: 'leaderBoard',
  initialState,
  reducers: {
    setLeaders: (state, action: PayloadAction<Leaders>) => {
      state.leaders = action.payload;
    },
    setActiveLeader: (state, action: PayloadAction<number>) => {
      state.activeLeader = action.payload;
    },
    addLeader: (state, action: PayloadAction<Leader>) => {
      const candidate = action.payload;
      state.leaders.push(candidate)
    },
  },
});

export const checkLeaders =
  (candidate: Leader): AppThunk =>
  (dispatch, getState) => {
    const leaders = selectLeaders(getState())
    const activeLeader = selectActiveLeader(getState())
    const cloneLeaders = JSON.parse(JSON.stringify(leaders))
    const newLeaders: Leaders = []

    let inserted = false;
    if (cloneLeaders.length === 0) {
      candidate.place = 0;
      newLeaders.push(candidate)
      dispatch(setActiveLeader(0))
    } else
    for (let i = 0; i < cloneLeaders.length; i++) {
      if (((candidate.score < cloneLeaders[i].score) || (inserted))) {
        if (activeLeader !== i) {
          newLeaders.push(cloneLeaders[i])
        }
      } else {
        candidate.place = i;
        newLeaders.push(candidate)

        dispatch(setActiveLeader(i))
        inserted = true
        i--
      } 
    }

    dispatch(setLeaders(newLeaders))
  }

export const { 
  setLeaders, addLeader,
  setActiveLeader
} = leaderBoardSlice.actions;

export const selectLeaders = (state: RootState) => state.leaderBoard.leaders;
export const selectActiveLeader = (state: RootState) => state.leaderBoard.activeLeader;


export default leaderBoardSlice.reducer;
