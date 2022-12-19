import { 
  Leaders
} from '@/types'
import {
  BLUE_BLACK,
  FONT
} from '@/data/consts'
import { 
  colorFromSector
 } from '../helpers'

export const HighScoresEntity = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  leaders: Leaders
) => {
  const coordinates = [
    {x: width*0.35, y: height*0.02},
    {x: width*0.45, y: height*0.02},
    {x: width*0.55, y: height*0.02},
    {x: width*0.65, y: height*0.02},
    {x: width*0.75, y: height*0.02},
    {x: width*0.35, y: height*0.04},
    {x: width*0.45, y: height*0.04},
    {x: width*0.55, y: height*0.04},
    {x: width*0.65, y: height*0.04},
    {x: width*0.75, y: height*0.04},
  ]
  
  if (leaders.length !== 0) {
    context.fillStyle = colorFromSector(BLUE_BLACK)
    context.font = `bold ${width * 0.012  }px ${FONT}`
    context.fillText(`РЕКОРДЫ:`, coordinates[0].x, coordinates[0].y)
    const length = leaders.length < 3 ? leaders.length : 3
    for (let i = 0; i < length; i++) {
      const name = `${leaders[i].login} = ${leaders[i].score}`
      context.fillText(`${name}`, coordinates[i+1].x, coordinates[i+1].y)
    }
  }
}
