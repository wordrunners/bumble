import {
  YELLOW,
  GREEN,
  PINK,
  BLACK,
  FONT
} from '@/data/consts'
import { colorFromSector } from '../helpers/colorFromSector'

export const HUDEntity = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) => {
  context.fillStyle = colorFromSector(YELLOW)
  context.fillRect(width*0.3, height*0.94, width*0.1, height)

  context.fillStyle = colorFromSector(GREEN)
  context.fillRect(width*0.45, height*0.94, width*0.1, height)

  context.fillStyle = colorFromSector(PINK)
  context.fillRect(width*0.6, height*0.94, width*0.1, height)

  context.fillStyle = colorFromSector(BLACK)
  context.font = `bold ${height * 0.035}px ${FONT}`
  context.textAlign = 'center'
  context?.fillText('+1', width*0.35, height*0.9775)
  context?.fillText('+2', width*0.5, height*0.9775)
  context?.fillText('+3', width*0.65, height*0.9775)
}
