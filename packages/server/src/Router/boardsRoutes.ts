import { Router } from 'express'
import { 
  addBoard,
  getBoards,
  addComment,
  deleteComment,
  getComments,
  addLike,
  getLikes,
} from '../API/boards'
import { 
  BOARDS_ROUTE,
  ADD_BOARD_ROUTE,
  GET_BOARDS_ROUTE,
  ADD_COMMENT_ROUTE,
  GET_COMMENTS_ROUTE,
  DELETE_COMMENT_ROUTE,
  ADD_LIKE_ROUTE,
  GET_LIKES_ROUTE,  
} from './routes'

export const boardsRouter = (router: Router) => {
  const boardsRouter: Router = Router()

  router.use(BOARDS_ROUTE, boardsRouter)

  boardsRouter
    .post(ADD_BOARD_ROUTE, addBoard)
    .get(GET_BOARDS_ROUTE, getBoards)
    .post(ADD_COMMENT_ROUTE, addComment)
    .post(GET_COMMENTS_ROUTE, getComments)
    .delete(DELETE_COMMENT_ROUTE, deleteComment)
    .post(ADD_LIKE_ROUTE, addLike)
    .post(GET_LIKES_ROUTE, getLikes)
}
