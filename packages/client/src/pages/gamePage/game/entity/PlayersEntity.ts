import { Players } from '@/types'
import {
  WHITE,
  BLUE_BLACK,
  BLUE_MEDIUM,
  FONT
} from '@/data/consts'
import { 
  colorFromSector,
 } from '../helpers'

export const PlayersEntity = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  players: Players,
  timer: number,
  activePlayer: number
) => {
  const radius = width < height*0.97 ? width*0.2 : height*0.325
  const coordinates = [
    {x: width*0.135, y: height*0.705},
    {x: width*0.865, y: height*0.705},
    {x: width*0.135, y: height*0.095},
    {x: width*0.865, y: height*0.095},
  ]

  context.font = `bold ${radius * 0.135}px ${FONT}`
  context.textAlign = 'center'

  players.map((player, i)=> {
    const name = (activePlayer === i) ? `${timer} – ${player.login} = ${player.score}` : `${player.login} = ${player.score}`
    const color = (activePlayer === i) ? colorFromSector(WHITE) : colorFromSector(BLUE_BLACK)
    context.fillStyle = color
    context.font = `bold ${radius * 0.12}px ${FONT}`
    context.fillText(`${name}`, coordinates[i].x, coordinates[i].y)

    context.font = `${radius * 0.1}px ${FONT}`
    context.fillStyle = colorFromSector(BLUE_MEDIUM)
    player.words.map((word, j)=> {
      context.fillText(`${word}`, coordinates[i].x, coordinates[i].y + ((j+1) * radius*0.175))
    })
  })
}
