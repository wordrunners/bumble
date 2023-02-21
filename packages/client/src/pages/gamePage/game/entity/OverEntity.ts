import {
  BLACK,
  WHITE,
  MAIN,
  FONT
} from '@/data/consts'
import { 
  colorToButton
 } from '../helpers'

export const OverEntity = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) => {
  const radius = width < height*0.67 ? width*0.48 : height*0.325

  context.font = `bold ${radius * 0.495}px ${FONT}`
  context.textAlign = 'center'

  context.lineWidth = radius * 0.035
  context.strokeStyle = colorToButton(WHITE, MAIN)
  context.strokeText('WINNER!', width*0.5, height*0.425)
  context.fillStyle = colorToButton(BLACK, MAIN)
  context.fillText('WINNER!', width*0.5, height*0.425)
}
