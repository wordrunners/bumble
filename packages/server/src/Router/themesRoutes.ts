import { Router } from 'express'
import { create, get, update } from '../API/themes'
import { 
  THEMES_ROUTE,
  GET_THEME_ROUTE,
  ADD_THEME_ROUTE,
  UPDATE_THEME_ROUTE,
} from './routes'

export const themesRouter = (router: Router) => {
  const themesRouter: Router = Router()

  router.use(THEMES_ROUTE, themesRouter)

  themesRouter
    .get(GET_THEME_ROUTE, [], get)
    .post(ADD_THEME_ROUTE, [], create)
    .post(UPDATE_THEME_ROUTE, [], update)
}
