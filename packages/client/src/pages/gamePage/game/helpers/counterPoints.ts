import { Card } from '@/types'
import { cardToArrays } from './cardToArrays'

export const counterPoints = (newWord: string, card: Card) => {
  const { set, point } = cardToArrays(card)
  let points = 0
  let oneSet = 0, twoSet = 0, threeSet = 0
  for (let i = 0; i < newWord.length; i++) {
    points += point[+newWord[i]] 
    if (set[+newWord[i]] === 1) {
      oneSet++
    } else if (set[+newWord[i]] === 2) {
      twoSet++
    } else if (set[+newWord[i]] === 3) {
      threeSet++
    } 
  }

  if (oneSet === 3) {
    points += 1
  }
  if (twoSet === 3) {
    points += 2
  }
  if (threeSet === 3) {
    points += 3
  } 
  return points
}
