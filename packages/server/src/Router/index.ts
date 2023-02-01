import { Router } from 'express'
import { boardsRouter } from './boardsRoutes'
import { themesRouter } from './themesRoutes'

export const router: Router = Router()

boardsRouter(router)
themesRouter(router)
