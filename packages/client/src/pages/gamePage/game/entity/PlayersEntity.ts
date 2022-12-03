import { Players } from "@/types/game"

export const PlayersEntity = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  players: Players,
  timer: number,
  activePlayer: number
) => {
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
