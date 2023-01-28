import type { Request, Response } from 'express'
import {
  BoardModel,
  UserModel
} from '../models/board'

export const addBoard =
  async (req: Request, res: Response) => {
    try {
      const { title, description, userId, userLogin } = req.body
      await UserModel.findOrCreate({
        where: { id: userId },
        defaults: { id: userId, login: userLogin },
      })
      await BoardModel.create({
        title: title,
        description: description,
        user_id: userId,
      })
      res.send('OK')
    } catch (error) {
      res.status(400).send()
      console.error(error)
    }
  }

export const getBoardList =
  async (_: Request, res: Response) => {
    try {
      const data = await BoardModel.findAll()
      res.send({ boards: data })
    } catch (error) {
      res.status(400).send()
      console.error(error)
    }
  }

export const updateBoard =  async (req: Request, res: Response) => {
  try {
    const { id, title, description } = req.body
    await BoardModel.update({ title, description }, { where: { id }})

    res.send('OK')
  } catch (error) {
    res.status(400).send()
    console.error(error)
  }
}

export const deleteBoard =
  async (req: Request, res: Response) => {
    try {
      const { id } = req.body

      const board = await BoardModel.findByPk(id)
      await board?.destroy()

      res.send('OK')
    } catch (error) {
      res.status(400).send()
      console.error(error)
    }
  }