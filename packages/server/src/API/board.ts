import type { Request, Response } from 'express'
import {
  BoardModel,
  UserModel
} from '../models/board'

export const addBoard =
  async (req: Request, res: Response) => {
    try {
      const { title, description, userLogin } = req.body
      const [user, isCreated] = await UserModel.findOrCreate({
        where: { login: userLogin },
        defaults: { login: userLogin },
      })
      if(isCreated || user.id) {
        await BoardModel.create({
          title: title,
          description: description,
          user_id: userLogin,
        })
        res.send('OK')
      } else {
        res.status(400).send()
        console.error('User was not find or created');
      }
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

export const updateBoard = async (req: Request, res: Response) => {
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