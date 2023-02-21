import type { Request, Response } from 'express'
import { ThemeModel } from '../models/themes'

export const create = async (request: Request, response: Response) => {
  if (request.body.userId) {
    try {
      const { userId } = request.body
      await ThemeModel.findOrCreate({
        where: { userId: userId, },
        defaults: { themeId: 1, userId: userId, },
      })
      response.send('OK')
    } catch (error) {
      console.log(error)
      response.status(400).send()
    }
  }
}

export const get = async (
  request: Request<any, any, any, { userId: number }>,
  response: Response
) => {
  try {
    const { userId } = request.query
    const data = await ThemeModel.findOne({
      where: { userId: userId, },
    })
    console.log('data', data)

    if (data) {
      const newTheme = data.themeId === 1 ? 'dark' : 'light'
      response.send(newTheme)
    }
  } catch (error) {
    console.log(error)
    response.status(400).send()
  }
}

export const update = async (request: Request, response: Response) => {
  try {
    const { userId, themeId } = request.body
    await ThemeModel.update(
      { themeId: themeId },
      { where: { userId: userId }, returning: true, }
    )
    const theme = await ThemeModel.findOne({
      where: { userId: userId, },
    })
    response.send(theme)
  } catch (error) {
    console.log(error)
    response.status(400).send()
  }
}
