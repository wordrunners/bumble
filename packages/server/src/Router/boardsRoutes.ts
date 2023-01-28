import { Router } from 'express'
import { 
  addBoard,
  getBoardList,
  updateBoard,
  deleteBoard
} from '../API/board'

import {
  addComment,
  deleteComment,
  getCommentList
} from '../API/comment'

import {
  toggleLike,
  getUserLikeList,
} from '../API/like'

import { 
  BOARDS_ROUTE,
  ADD_BOARD_ROUTE,
  GET_BOARDS_ROUTE,
  UPDATE_BOARD_ROUTE,
  REMOVE_BOARD_ROUTE,

  ADD_COMMENT_ROUTE,
  GET_COMMENTS_ROUTE,
  UPDATE_COMMENT_ROUTE,
  DELETE_COMMENT_ROUTE,

  ADD_LIKE_ROUTE,
  GET_LIKES_BY_USER_ROUTE,
  GET_LIKES_BY_COMMENT_ROUTE,
} from './routes'

export const boardsRouter = (router: Router) => {
  const boardsRouter: Router = Router()

  router.use(BOARDS_ROUTE, boardsRouter)

  boardsRouter
    .post(ADD_BOARD_ROUTE, addBoard)
    .get(GET_BOARDS_ROUTE, getBoardList)
    .put(UPDATE_BOARD_ROUTE, updateBoard)
    .post(REMOVE_BOARD_ROUTE, deleteBoard)

    .post(ADD_COMMENT_ROUTE, addComment)
    .get(GET_COMMENTS_ROUTE, getCommentList)
    .delete(DELETE_COMMENT_ROUTE, deleteComment)
    .put(UPDATE_COMMENT_ROUTE, updateBoard)

    .put(ADD_LIKE_ROUTE, toggleLike)
    .get(GET_LIKES_BY_USER_ROUTE, getUserLikeList)
    .get(GET_LIKES_BY_COMMENT_ROUTE, getUserLikeList)
}
