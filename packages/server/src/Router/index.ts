import { Router } from 'express'
import { boardsRouter } from './boardsRoutes'

export const router: Router = Router()

boardsRouter(router)
