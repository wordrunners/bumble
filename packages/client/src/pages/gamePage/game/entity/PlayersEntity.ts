// import useResponsiveData from '../hooks/useResponsiveData'
import { playersType } from "../types/canvas"

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
    players: playersType,
    timer: number,
    activePlayer: number
  ): void => {

    const {context, width, height} = this;
    const radius = width < height*0.97 ? width*0.2 : height*0.325;
    const coordinates = [
      {x: width*0.135, y: height*0.705},
      {x: width*0.865, y: height*0.705},
      {x: width*0.135, y: height*0.095},
      {x: width*0.865, y: height*0.095},
    ]

    context.font = `bold ${radius * 0.135}px PequenaPro`;
    context.textAlign = 'center'

    players.map((player, i)=> {
      const name = (activePlayer === i) ? `${timer} – ${player.login} = ${player.score}` : `${player.login} = ${player.score}`;
      const color = (activePlayer === i) ? `rgba(255, 239, 255, 255)` : `rgba(0, 89, 135, 1)`;
      context.fillStyle = color;
      context.font = `bold ${radius * 0.12}px PequenaPro`;
      context.fillText(`${name}`, coordinates[i].x, coordinates[i].y);

      context.font = `${radius * 0.1}px PequenaPro`;
      context.fillStyle = `rgba(39, 159, 217, 1)`;
      player.words.map((word, j)=> {
        context.fillText(`${word}`, coordinates[i].x, coordinates[i].y + ((j+1) * radius*0.175));
      })
    })
  }
}
