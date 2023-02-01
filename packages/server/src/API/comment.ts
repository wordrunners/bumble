import type { Request, Response } from 'express'
import { CommentModel, UserModel } from '../models/board'

export const addComment =
  async (req: Request, res: Response) => {
    try {
      const { parentId, comment, boardId, userLogin } = req.body
      const [user, isCreated] = await UserModel.findOrCreate({
        where: { login: userLogin },
        defaults: { login: userLogin },
      })
      if(isCreated || user.id) {
        await CommentModel.create({
          comment: comment,
          board_id: boardId,
          user_login: userLogin,
          parent_id: parentId,
        })
        res.send('OK')
      } else {
        res.status(400).send()
        console.error('User was not find or created');
      }

      res.send('OK')
    } catch (error) {
      res.status(400).send()
      console.log(error)
    }
  }

export const getCommentList =
  async (req: Request, res: Response) => {
    try {
      const { id } = req.body

      const data = await CommentModel.findAll({
        where: { board_id: id },
      })
      res.send({ comments: data })
    } catch (error) {
      res.status(400).send()
      console.error(error)
    }
  }

export const updateComment =  async (req: Request, res: Response) => {
  try {
    const { user_login, board_id, parent_id, comment } = req.body
    await CommentModel.update({ comment }, { where: { user_login, board_id, parent_id }})

    res.send('OK')
  } catch (error) {
    res.status(400).send()
    console.error(error)
  }
}

export const deleteComment =
  async (req: Request, res: Response) => {
    try {
      const { id } = req.body

      const comment = await CommentModel.findByPk(id)
      await comment?.destroy()

      res.send('OK')
    } catch (error) {
      res.status(400).send()
      console.error(error)
    }
  }
