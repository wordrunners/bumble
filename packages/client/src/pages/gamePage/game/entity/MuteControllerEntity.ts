import {
  BLACK,
  WHITE,
  FONT,
  MUTE_CONTROLLER
} from '@/data/consts'
import { 
  colorToButton
} from '../helpers'

export const MuteControllerEntity = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) => {
  context.fillStyle = colorToButton(BLACK, MUTE_CONTROLLER)
  context.fillRect(width-height*0.25, height*0.94, width*0.06, height*0.06)

  context.fillStyle = colorToButton(WHITE, MUTE_CONTROLLER)
  context.font = `${height * 0.035}px ${FONT}`
  context.textAlign = 'center'
  context?.fillText('m', width-height*0.18, height*0.9775)
}
