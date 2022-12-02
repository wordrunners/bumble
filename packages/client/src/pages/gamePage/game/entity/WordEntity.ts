import { Card } from "../types/canvas"
import { cardToArrays } from "../helpers/cardToArrays"

export const WordEntity = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  word: string,
  card: Card,
  points: number,
): void => {
  const radius = width < height*0.67 ? width*0.48 : height*0.325;
  const { letter, set, point } = cardToArrays(card);

  let newWord = '';
  for (let i = 0; i < word.length; i++) {
    newWord += letter[+word[i]]
  }
  
  context.fillStyle = `rgba(20, 19, 13, 1)`;
  context.font = `bold ${radius * 0.225}px PequenaPro`;
  context.textAlign = 'center';

  newWord = (points !== 0) ? `${points} – ${newWord}` : '';

  context?.fillText(newWord, width/2, height/14);
}
