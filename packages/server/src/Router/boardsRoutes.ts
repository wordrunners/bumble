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
import { auth } from '../middlewares';

export const boardsRouter = (router: Router) => {
  const boardsRouter: Router = Router()

  router.use(BOARDS_ROUTE, boardsRouter)

  boardsRouter
    .post(ADD_BOARD_ROUTE, auth, addBoard)
    .get(GET_BOARDS_ROUTE, auth, getBoards)
    .post(ADD_COMMENT_ROUTE, auth, addComment)
    .post(GET_COMMENTS_ROUTE, auth, getComments)
    .delete(DELETE_COMMENT_ROUTE, auth, deleteComment)
    .post(ADD_LIKE_ROUTE, auth, addLike)
    .post(GET_LIKES_ROUTE, auth, getLikes)
}
