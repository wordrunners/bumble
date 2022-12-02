import { cardType } from "../types/canvas"
import background from '../cards/background.json'

export class DrumEntity {
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
    card: cardType
  ): void => {

    const {context, width, height} = this;
    const radius = width < height*0.67 ? width*0.48 : height*0.325;

    const set = []
    const letter = []
    const point = []
    const enabled = []

    for (let i = 0; i<card.length; i++) {
      set.push(card[i].set);
      letter.push(card[i].letter);
      point.push(card[i].point);
      enabled.push(card[i].enabled);
    }

    // colors
    // rgba(109, 199, 243, 1) - new blue
    // rgba(222, 220, 0, 1) - new yellow
    // rgba(47, 172, 102, 1) - new green
    // rgba(237, 114, 159, 1) - new pink

    context.fillStyle = 'rgba(109, 199, 243, 1)';
    context.fillRect(0, 0, width, height);
    
    for (let i = 0; i < 12; i++) {
      context.fillStyle = `rgba(109, 209, 255, 1)`;
      context.font = `bold ${height*0.14}px PequenaPro`;
      context.fillText((background).toString().slice(i*i), 0, height*0.12*i);
    }

    //sectors
    for (let i = 0; i < 8; i++) {
      const sector = Math.PI * 0.25;
      const startAngle = sector * i;
      const endAngle = sector * (i+1); // 90 degree
      const origin = {x: width/2, y: height* 0.45};
      context.beginPath();
      context.moveTo(origin.x, origin.y);
      context.arc(origin.x, origin.y, radius, startAngle, endAngle, false);
      if (set[i] === 1){
        context.fillStyle = `rgba(222, 22${i}, 0, 1)`;  // y
      } else if (set[i] === 2){
        context.fillStyle = `rgba(47, 17${i}, 102, 1)`; // g
      } else if (set[i] === 3){
        context.fillStyle = `rgba(208, 12${i}, 151, 1)`;  // p
      }
      context.fill();
    }

    //letter
    context.translate(width*0.495, height*0.475);
    context.textBaseline = "middle";
    context.textAlign = "center";
    for(let i = 0; i < 8; i++){
      if (enabled[i]) { 
        const ang = i * Math.PI / 4 + Math.PI / 8 * 5;
        context.rotate(ang);
        context.translate(0, -radius * 0.7125);
        context.rotate(-ang);

        context.fillStyle = `rgba(20, 1${i}, 13, 1)`;
        context.font = `bold ${radius * 0.425}px PequenaPro`;
        context.fillText(letter[i], 0, 0);
        if (point[i] > 1) {
          context.font = `bold ${radius * 0.125}px PequenaPro`;
          context.fillText((point[i]).toString(), radius * 0.205, radius * 0.15);
        }

        context.rotate(ang);
        context.translate(0, radius * 0.7125);
        context.rotate(-ang);
      }
    }
    context.translate(-width*0.495, - height*0.475);
    
    //small
    context.beginPath();
    context.arc(width/2, height * 0.45, radius*0.3, 0, 2 * Math.PI);
    if (set[8] === 1){
      context.fillStyle = `rgba(222, 228, 0, 1)`;  // y
    } else if (set[8] === 2){
      context.fillStyle = `rgba(47, 178, 102, 1)`; // g
    } else if (set[8] === 3){
      context.fillStyle = `rgba(208, 128, 151, 1)`;  // p
    }
    context.fill();

    if (enabled[8]) { 
      context.translate(width*0.495, height*0.475);
      context.fillStyle = `rgba(20, 18, 13, 1)`;
      context.font = `bold ${radius * 0.425}px PequenaPro`;
      context.fillText(letter[8], 0, 0);
      if (point[8] > 1) {
        context.font = `bold ${radius * 0.125}px PequenaPro`;
        context.fillText((point[8]).toString(), radius * 0.205, radius * 0.15);
      }
      context.translate(-width*0.495, - height*0.475);
    }

  }

}
