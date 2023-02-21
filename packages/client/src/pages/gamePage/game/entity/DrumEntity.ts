import { Card } from '@/types'
import { cardToArrays } from '../helpers'
import {
  YELLOW,
  GREEN,
  PINK,
  BLACK,
  BLUE_DARK,
  BLUE_LIGHT,
  FONT
} from '@/data/consts'
import { colorFromSector } from '../helpers'

export const DrumEntity = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  card: Card
) => {
  const radius = width < height*0.67 ? width*0.48 : height*0.325
  const { set, point, letter, enabled, selected } = cardToArrays(card)

  const checkSet = (i: number) => {
    if (set[i] === 1){
      context.fillStyle = colorFromSector(YELLOW, i) 
    } else if (set[i] === 2){
      context.fillStyle = colorFromSector(GREEN, i)
    } else if (set[i] === 3){
      context.fillStyle = colorFromSector(PINK, i) 
    }
  }

  //sectors
  context.beginPath()
  context.fillStyle = BLUE_LIGHT 
  context.arc(width/2, height * 0.45, radius, 0, 2 * Math.PI)
  context.fill()

  const sector = Math.PI * 0.25
  const origin = {x: width/2, y: height* 0.45}
  let selectedSector = -1
  let selectedSectorColor = ''
  for (let i = 0; i < 8; i++) {
    const startAngle = sector * i
    const endAngle = sector * (i + 1) // 90 degree
    if (enabled[i]) { 
      context.beginPath()
      context.moveTo(origin.x, origin.y)
      context.arc(origin.x, origin.y, radius, startAngle, endAngle, false)
      if (selected[i]) {
        selectedSector = i
        if (set[i] === 1){
          selectedSectorColor = colorFromSector(YELLOW, i) 
        } else if (set[i] === 2){
          selectedSectorColor = colorFromSector(GREEN, i)
        } else if (set[i] === 3){
          selectedSectorColor = colorFromSector(PINK, i) 
        }
      } 
      checkSet(i)
      context.fill()
    }
  }
  if (selectedSector >= 0) {
    context.shadowBlur = 4
    context.shadowOffsetX = 0
    context.shadowOffsetY = 0
    context.shadowColor = 'black'
    context.beginPath()
    context.moveTo(origin.x, origin.y)
    context.arc(origin.x, origin.y, radius*1.1, sector * selectedSector, sector * (selectedSector+1), false)
    context.fillStyle = selectedSectorColor  // p
    context.fill()
    context.shadowBlur = 0
    context.shadowOffsetX = 0
    context.shadowOffsetY = 0
    selectedSector = -1
  }

  //letters
  context.translate(width*0.495, height*0.495)
  context.textAlign = 'center'
  for(let i = 0; i < 8; i++){
    if (enabled[i]) { 
      const ang = i * Math.PI / 4 + Math.PI / 8 * 5
      context.rotate(ang)
      context.translate(0, -radius * 0.7125)
      context.rotate(-ang)
      context.fillStyle = colorFromSector(BLACK, i)

      if (selected[i]) {
        context.font = `bold ${radius * 0.405}px ${FONT}`
      } else {
        context.font = `bold ${radius * 0.385}px ${FONT}`
      }

      context.fillText(letter[i], 0, 0)
      if (point[i] > 1) {
        context.font = `bold ${radius * 0.115}px ${FONT}`
        if (selected[i]) {
          context.fillText((point[i]).toString(), radius * 0.22, radius * 0.021)
        } else {
          context.fillText((point[i]).toString(), radius * 0.21, radius * 0.021)
        }
      }

      context.rotate(ang)
      context.translate(0, radius * 0.7125)
      context.rotate(-ang)
    }
  }
  context.translate(-width*0.495, -height*0.495)

  //center
  context.beginPath()
  context.fillStyle = BLUE_DARK 
  context.arc(width/2, height * 0.45, radius*0.3, 0, 2 * Math.PI)
  context.fill()

  if (enabled[8]) { 
    context.beginPath()
    if (selected[8]) {
      context.shadowBlur = 4
      context.shadowOffsetX = 0
      context.shadowOffsetY = 0
      context.shadowColor = 'black'
      context.arc(width/2, height * 0.45, radius*0.3*1.05, 0, 2 * Math.PI)
      context.fill()
      context.shadowBlur = 0
      context.shadowOffsetX = 0
      context.shadowOffsetY = 0
    } else {
      context.arc(width/2, height * 0.45, radius*0.3, 0, 2 * Math.PI)
    }

    checkSet(8)
    context.fill()
    context.translate(width*0.495, height*0.495)
    context.fillStyle = colorFromSector(BLACK, 8)
    if (selected[8]) {
      context.font = `bold ${radius * 0.405}px ${FONT}`
    } else {
      context.font = `bold ${radius * 0.385}px ${FONT}`
    }

    context.fillText(letter[8], 0, 0)
    if (point[8] > 1) {
      context.font = `bold ${radius * 0.115}px ${FONT}`
      if (selected[8]) {
        context.fillText((point[8]).toString(), radius * 0.22, radius * 0.021)
      } else {
        context.fillText((point[8]).toString(), radius * 0.21, radius * 0.021)
      }
    }
    context.translate(-width*0.495, - height*0.495)
  }
}
