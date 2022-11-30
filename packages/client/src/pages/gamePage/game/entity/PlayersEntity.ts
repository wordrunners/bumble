// import useResponsiveData from '../hooks/useResponsiveData'
import { cardType, playersType } from "../types/canvas"

export class PlayersEntity {
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
    // word: string,
    players: playersType
  ): void => {

    const {context, width, height} = this;

    const radius = width < height*0.67 ? width*0.48 : height*0.325;
    context.font = `bold ${radius * 0.135}px PequenaPro`;
    context.textAlign = 'center'

    context.lineWidth = radius * 0.035;
    // context.strokeStyle = `rgba(255, 229, 255, 255)`;
    // context.strokeText('Bumble', width*0.5, height*0.875);
    context.fillStyle = `rgba(20, 29, 13, 1)`;
    // context.fillText(`${players[0].name}`, width*0.15, height*0.875);

    // players.map((player)=> {
    //   context.fillText(`${player.name}`, width*0.15, height*0.875);
    // })

    context.fillText(`${players[0].name}`, width*0.15, height*0.725);
    players[0].words.map((word, i)=> {
      context.fillText(`${word}`, width*0.15, height*0.795 + (i * height*0.075));
    })

    context.fillText(`${players[1].name}`, width*0.85, height*0.725);
    players[1].words.map((word, i)=> {
      context.fillText(`${word}`, width*0.85, height*0.795 + (i * height*0.075));
    })


  }

}
