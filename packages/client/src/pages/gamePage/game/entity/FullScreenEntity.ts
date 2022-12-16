import {
  BLACK,
  WHITE,
  FONT,
  FULL_SCREEN
} from '@/data/consts'
import { 
  colorToButton
} from '../helpers'

export const FullScreenEntity = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) => {
  context.fillStyle = colorToButton(BLACK, FULL_SCREEN)
  context.fillRect(width-height*0.07, height*0.94, height*0.06, height*0.06)

  context.fillStyle = colorToButton(WHITE, FULL_SCREEN)
  context.font = `bold ${height * 0.035}px ${FONT}`
  context.textAlign = 'center'
  context?.fillText('⧈', width-height*0.04, height*0.9775)
}
