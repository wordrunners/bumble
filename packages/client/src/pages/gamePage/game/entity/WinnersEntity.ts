import { Players } from '@/types'
import {
  BLACK,
  FONT
} from '@/data/consts'
import { 
  colorFromSector,
 } from '../helpers'

export const WinnersEntity = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  players: Players,
) => {
  const radius = width < height*0.97 ? width*0.2 : height*0.325
  const coordinates = [
    {x: width*0.5, y: height*0.52},
    {x: width*0.5, y: height*0.59},
    {x: width*0.5, y: height*0.66},
    {x: width*0.5, y: height*0.73},
  ]

  context.font = `bold ${radius * 0.135}px ${FONT}`
  context.textAlign = 'center'

  let maxScore = 0
  let winners = 0
  players.map((player)=> {
    if (maxScore < player.score) {
      maxScore = player.score
    }
  })

  players.map((player)=> {
    if (maxScore === player.score) {
      const name = `${player.login} = ${player.score}`
      const color = colorFromSector(BLACK)
      context.fillStyle = color
      context.font = `bold ${radius * 0.145}px ${FONT}`
      context.fillText(`${name}`, coordinates[winners].x, coordinates[winners].y)
      winners++
    }
  })
}
