import type { Request, Response } from 'express'
import {
  LikeModel,
  CommentModel,
  BoardModel,
  UserModel
} from '../models/boards'

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
      console.log(error)
    }
  }

export const getBoards =
  async (_: Request, res: Response) => {
    console.log('getBoards')
    try {
      const data = await BoardModel.findAll()
      res.send({ boards: data })
    } catch (error) {
      res.status(400).send()
      console.log(error)
    }
  }

export const addComment =
  async (req: Request, res: Response) => {
    try {
      const { parentId, comment, boardId, userId, userLogin } = req.body

      await UserModel.findOrCreate({
        where: { id: userId },
        defaults: { id: userId, login: userLogin },
      })

      await CommentModel.create({
        comment: comment,
        board_id: boardId,
        user_id: userId,
        user_login: userLogin,
        parent_id: parentId,
      })

      res.send('OK')
    } catch (error) {
      res.status(400).send()
      console.log(error)
    }
  }

export const getComments =
  async (req: Request, res: Response) => {
    try {
      const { id } = req.body

      const data = await CommentModel.findAll({
        where: { board_id: id },
      })
      res.send({ comments: data })
    } catch (error) {
      res.status(400).send()
      console.log(error)
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
      console.log(error)
    }
  }

export const addLike = 
  async (req: Request, res: Response) => {
    try {
      const { isLike, commentId, userId, userLogin } = req.body

      await UserModel.findOrCreate({
        where: { id: userId },
        defaults: { id: userId, login: userLogin },
      })

      const foundItem = await LikeModel.findOne({
        where: { comment_id: commentId, user_id: userId },
      })
      if (!foundItem) {
        await LikeModel.create({
          comment_id: commentId,
          isLike: isLike,
          user_id: userId,
        })
      } else {
        await LikeModel.update(
          { isLike: isLike },
          { where: { comment_id: commentId, user_id: userId } }
        )
      }
      const data = await LikeModel.findAll({
        where: { user_id: userId },
      })
      res.send({ likes: data })
    } catch (error) {
      res.status(400).send()
      console.log(error)
    }
  }

export const getLikes = 
  async (req: Request, res: Response) => {
    try {
      const { id } = req.body
      const data = await LikeModel.findAll({
        where: { user_id: id },
      })
      res.send({ likes: data })
    } catch (error) {
      res.status(400).send()
      console.log(error)
    }
  }
