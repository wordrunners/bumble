import { Card } from "../types/canvas"

export const cardToArrays = (card: Card) => {
  const letter = []
  const set = []
  const point = []
  const enabled = []

  for (let i = 0; i < card.length; i++) {
    set.push(card[i].set);
    letter.push(card[i].letter);
    point.push(card[i].point);
    enabled.push(card[i].enabled);
  }

  return { letter, set, point, enabled }
}
