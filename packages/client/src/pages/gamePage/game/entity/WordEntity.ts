import { Card } from '@/types'
import { cardToArrays } from '../helpers/cardToArrays'
import {
  BLACK,
  FONT
} from '@/data/consts'
import { colorFromSector } from '../helpers/colorFromSector'

export const WordEntity = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  word: string,
  card: Card,
  points: number,
) => {
  const radius = width < height*0.67 ? width*0.48 : height*0.325
  const { letter } = cardToArrays(card)

  let newWord = ''
  for (let i = 0; i < word.length; i++) {
    newWord += letter[+word[i]]
  }
  
  context.fillStyle = colorFromSector(BLACK)
  context.font = `bold ${radius * 0.225}px ${FONT}`
  context.textAlign = 'center'

  newWord = (points !== 0) ? `${points} – ${newWord}` : ''

  context?.fillText(newWord, width/2, height*0.1)
}
