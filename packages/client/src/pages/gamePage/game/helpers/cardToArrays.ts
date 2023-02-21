import { Card } from '@/types'

export const cardToArrays = (card: Card) => {
  const letter = []
  const set = []
  const point = []
  const enabled = []
  const selected = []

  for (let i = 0; i < card.length; i++) {
    set.push(card[i].set)
    letter.push(card[i].letter)
    point.push(card[i].point)
    enabled.push(card[i].enabled)
    selected.push(card[i].selected)
  }

  return { letter, set, point, enabled, selected }
}
