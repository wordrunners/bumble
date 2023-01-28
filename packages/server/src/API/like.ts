import type { Request, Response } from 'express'
import { LikeModel, UserModel } from '../models/board'

export const toggleLike =
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
      console.error(error)
    }
  }

export const getUserLikeList =
  async (req: Request, res: Response) => {
    try {
      const { id } = req.body
      const data = await LikeModel.findAll({
        where: { user_id: id },
      })
      res.send({ likes: data })
    } catch (error) {
      res.status(400).send()
      console.error(error)
    }
  }

export const getCommentLikeCounter =
  async (req: Request, res: Response) => {
    try {
      const { id } = req.body
      const data = await LikeModel.count({
        where: { comment_id: id },
      })
      res.send({ likes: data })
    } catch (error) {
      res.status(400).send()
      console.error(error)
    }
  }