import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  getBoards,
  addBoard,
  getComments,
  addComment,
  addLike,
  getLikes,
} from './boardsActions'
import { BoardsState } from './boardsState'

import { RootState } from '../store'


const initialState: BoardsState = {
  boards: [],
  comments: [],
  likes: [],
  error: null,
  status: null,
}

export const BoardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoards.pending.type, (state) => {
        state.status = 'FETCHING'
        state.error = null
      })
      .addCase(getBoards.fulfilled.type, (state, { payload }: PayloadAction<BoardsState>) => {
        state.boards = payload.boards
        state.error = null
        state.status = 'FETCH_FULFILLED'
      })
      .addCase(
        getBoards.rejected.type,
        (state, { payload }: PayloadAction<string>) => {
          state.error = payload ?? 'Error!'
          state.status = 'FETCH_FAILED'
        }
      )
      .addCase(addBoard.pending.type, state => {
        state.status = 'FETCHING'
        state.error = null
      })
      .addCase(addBoard.fulfilled.type, state => {
        state.error = null
        state.status = 'FETCH_FULFILLED'
      })
      .addCase(addBoard.rejected.type, (state, { payload }: PayloadAction<string>) => {
        state.error = payload ?? 'Error!'
        state.status = 'FETCH_FAILED'
      })
      .addCase(getComments.pending.type, state => {
        state.status = 'FETCHING'
        state.error = null
      })
      .addCase(getComments.fulfilled.type, (state, { payload }: PayloadAction<BoardsState>) => {
        state.comments = payload.comments
        state.error = null
        state.status = 'FETCH_FULFILLED'
      })
      .addCase(getComments.rejected.type, (state, { payload }: PayloadAction<string>) => {
        state.error = payload ?? 'Error!'
        state.status = 'FETCH_FAILED'
      })
      .addCase(addComment.pending.type, state => {
        state.status = 'FETCHING'
        state.error = null
      })
      .addCase(addComment.fulfilled.type, state => {
        state.error = null
        state.status = 'FETCH_FULFILLED'
      })
      .addCase(addComment.rejected.type, (state, { payload }: PayloadAction<string>) => {
        state.error = payload ?? 'Error!'
        state.status = 'FETCH_FAILED'
      })
      .addCase(addLike.pending.type, state => {
        state.status = 'FETCHING'
        state.error = null
      })
      .addCase(addLike.fulfilled.type, (state, { payload }: PayloadAction<BoardsState>) => {
        state.likes = payload.likes
        state.error = null
        state.status = 'FETCH_FULFILLED'
      })
      .addCase(addLike.rejected.type, (state, { payload }: PayloadAction<string>) => {
        state.error = payload ?? 'Error!'
        state.status = 'FETCH_FAILED'
      })
      .addCase(getLikes.pending.type, state => {
        state.status = 'FETCHING'
        state.error = null
      })
      .addCase(getLikes.fulfilled.type, (state, { payload }: PayloadAction<BoardsState>) => {
        state.likes = payload.likes
        state.error = null
        state.status = 'FETCH_FULFILLED'
      })
      .addCase(getLikes.rejected.type, (state, { payload }: PayloadAction<string>) => {
        state.error = payload ?? 'Error!'
        state.status = 'FETCH_FAILED'
      })
  }

})

export const selectBoardsData = (state: RootState) => state.boards

export default BoardsSlice.reducer
