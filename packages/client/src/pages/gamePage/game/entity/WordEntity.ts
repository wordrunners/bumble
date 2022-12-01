// import useResponsiveData from '../hooks/useResponsiveData'
import { cardType } from "../types/canvas"
import { cardToArrays } from "../helpers/cardToArrays"

import { useAppSelector, useAppDispatch } from '../hooks/useStore';
import {
  selectHeight,
  selectWidth,
  selectWord,
  selectCard,
  selectTimer,
  selectPlayers,
} from '../components/gameSlice';

export class WordEntity {
  private context: CanvasRenderingContext2D
  private width: number
  private height: number

  constructor(
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    ) {
      this.context = context
      this.width = width
      this.height = height
  }

  public draw = (
    word: string,
    card: cardType,
    points: number,
  ): void => {

    const { context, width, height } = this;
    const radius = width < height*0.67 ? width*0.48 : height*0.325;
    const { letter, set, point } = cardToArrays(card);

    let newWord = '';
    // let score = 0;
    // let oneSet = 0, twoSet = 0, threeSet = 0;
    for (let i = 0; i < word.length; i++) {
      newWord += letter[+word[i]]
      // points += point[+word[i]] 
      // if (set[+word[i]] === 1) {
      //   oneSet++;
      // } else if (set[+word[i]] === 2) {
      //   twoSet++;
      // } else if (set[+word[i]] === 3) {
      //   threeSet++;
      // } 
    }

    // if (oneSet === 3) {
    //   points += 1;
    // } else if (twoSet === 3) {
    //   points += 2;
    // } else if (threeSet === 3) {
    //   points += 3;
    // } 
    
    context.fillStyle = `rgba(20, 19, 13, 1)`;
    context.font = `bold ${radius * 0.225}px PequenaPro`;
    context.textAlign = 'center';


    newWord = (points !== 0) ? `${points} – ${newWord}` : '';

    context?.fillText(newWord, width/2, height/14);
    // context?.fillText(`${points}`, width/2, height/14);
    // context?.fillText(`${points} – ${newWord}`, width/2, height/14);


  }

}


// let score = 0;
// let oneSet = 0, twoSet = 0, threeSet = 0;
// for (let i = 0; i < word.length; i++) {
//   points += point[+word[i]] 
//   if (set[+word[i]] === 1) {
//     oneSet++;
//   } else if (set[+word[i]] === 2) {
//     twoSet++;
//   } else if (set[+word[i]] === 3) {
//     threeSet++;
//   } 
// }

// if (oneSet === 3) {
//   points += 1;
// } else if (twoSet === 3) {
//   points += 2;
// } else if (threeSet === 3) {
//   points += 3;
// } 
