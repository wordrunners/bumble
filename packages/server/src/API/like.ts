import type { Request, Response } from 'express'
import { LikeModel, UserModel } from '../models/board'

export const toggleLike =
  async (req: Request, res: Response) => {
    try {
      const { isLike, commentId, userId, userLogin } = req.body

      const [user, isCreated] = await UserModel.findOrCreate({
        where: { login: userLogin },
        defaults: { login: userLogin },
      })

      if(isCreated || user.id) {
        await LikeModel.create({
          comment_id: commentId,
          isLike: isLike,
          user_id: userId,
        })
        res.send('OK')
      } else {
        res.status(400).send()
        console.error('User was not find or created');
      }

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
      res.send({ likeCounter: data })
    } catch (error) {
      res.status(400).send()
      console.error(error)
    }
  }