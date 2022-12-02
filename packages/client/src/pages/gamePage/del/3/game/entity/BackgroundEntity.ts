import { cardType } from "../types/canvas"
import background from '../cards/background.json'
import { playersType } from "../types/canvas"

export class BackgroundEntity {
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
    players: playersType,
    totalPlayers: number
    // card: cardType
  ): void => {

    const {context, width, height} = this;
    const radius = width < height*0.67 ? width*0.48 : height*0.325;

    context.fillStyle = 'rgba(109, 199, 243, 1)';
    context.fillRect(0, 0, width, height);
    
    for (let i = 0; i < 12; i++) {
      context.fillStyle = `rgba(109, 209, 255, 1)`;
      context.font = `bold ${height*0.14}px PequenaPro`;
      context.fillText((background).toString().slice(i*i), 0, height*0.12*i);
    }


    context.font = `bold ${radius * 0.485}px PequenaPro`;
    context.textAlign = 'center'

    context.lineWidth = radius * 0.035;
    context.strokeStyle = `rgba(255, 229, 255, 255)`;
    context.strokeText('Bumble', width*0.5, height*0.375);
    context.fillStyle = `rgba(20, 29, 13, 1)`;
    context.fillText('Bumble', width*0.5, height*0.375);


    context.font = `bold ${radius * 0.185}px PequenaPro`;
    context.textAlign = 'center'
    context.fillStyle = `rgba(20, 29, 13, 1)`;
    context.fillText('Загрузка...', width*0.5, height*0.575);


    // for (let i = 0; i <= totalPlayers; i++) {
    //   const color = (totalPlayers === i) ? `rgba(255, 239, 255, 255)` : `rgba(0, 89, 135, 1)`;
    //   context.font = `bold ${radius * 0.135}px PequenaPro`;
    //   context.textAlign = 'center'
    //   context.fillStyle = color;
    //   context.fillText(`${i+1}`, width*0.5 + (i - 1.5) * radius * 0.135, height*0.675);
    // }
    // players.map((player, i)=> {
    //   const color = (totalPlayers === i) ? `rgba(255, 239, 255, 255)` : `rgba(0, 89, 135, 1)`;
    //   context.font = `bold ${radius * 0.135}px PequenaPro`;
    //   context.textAlign = 'center'
    //   context.fillStyle = color;
    //   context.fillText(`${i+1}`, width*0.5 + (i - 1.5) * radius * 0.135, height*0.675);
    // })



  }

}
