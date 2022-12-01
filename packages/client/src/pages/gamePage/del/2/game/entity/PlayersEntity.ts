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
    players: playersType,
    timer: number,
  ): void => {

    const {context, width, height} = this;

    const radius = width < height*0.97 ? width*0.2 : height*0.325;
    context.font = `bold ${radius * 0.135}px PequenaPro`;
    context.textAlign = 'center'

    const coordinates = [
      {x: width*0.175, y: height*0.725},
      {x: width*0.825, y: height*0.725},
    ]
    players.map((player, i)=> {
      const name = (player.enabled) ? `${timer} – ${player.login}` : `${player.login}`;
      context.fillStyle = `rgba(20, 19, 13, 1)`;
      context.font = `bold ${radius * 0.135}px PequenaPro`;
      context.fillText(`${name}`, coordinates[i].x, coordinates[i].y);

      context.font = `${radius * 0.115}px PequenaPro`;
      context.fillStyle = `rgba(255, 239, 255, 255)`;
      player.words.map((word, j)=> {
        context.fillText(`${word}`, coordinates[i].x, coordinates[i].y + ((j+1) * radius*0.175));
      })
      
    })

  }

}
