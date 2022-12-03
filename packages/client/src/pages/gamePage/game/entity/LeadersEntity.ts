import { Players } from "../types/canvas"

export const LeadersEntity = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  players: Players,
): void => {
  const radius = width < height*0.97 ? width*0.2 : height*0.325;
  const coordinates = [
    {x: width*0.5, y: height*0.52},
    {x: width*0.5, y: height*0.59},
    {x: width*0.5, y: height*0.66},
    {x: width*0.5, y: height*0.73},
  ]

  context.font = `bold ${radius * 0.135}px PequenaPro`;
  context.textAlign = 'center'

  let maxScore = 0;
  let winners = 0;
  players.map((player)=> {
    if (maxScore < player.score) {
      maxScore = player.score
    }
  })

  players.map((player)=> {
    if (maxScore === player.score) {
      const name = `${player.login} = ${player.score}`;
      const color = `rgba(20, 29, 13, 1)`;
      context.fillStyle = color;
      context.font = `bold ${radius * 0.145}px PequenaPro`;
      context.fillText(`${name}`, coordinates[winners].x, coordinates[winners].y);
      winners++;
    }
  })
}
