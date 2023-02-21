import BACKGROUND from '@/data/background.json'
import {
  BLUE_DARK,
  BLUE_LIGHT,
  FONT
} from '@/data/consts'

export const BackgroundEntity = ( 
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) => {
  context.fillStyle = BLUE_DARK
  context.fillRect(0, 0, width, height)
  
  for (let i = 0; i < 12; i++) {
    context.fillStyle = BLUE_LIGHT
    context.font = `bold ${height*0.14}px ${FONT}`
    context.fillText((BACKGROUND).toString().slice(i*i), 0, height*0.12*i)
  }
}
