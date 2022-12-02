// import useResponsiveData from '../hooks/useResponsiveData'
import { playersType } from "../types/canvas"

export class LeadersEntity {
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
      {x: width*0.5, y: height*0.705},
      {x: width*0.5, y: height*0.755},
      {x: width*0.5, y: height*0.805},
      {x: width*0.5, y: height*0.855},
    ]

    context.font = `bold ${radius * 0.135}px PequenaPro`;
    context.textAlign = 'center'


    // function compareNumbers(a: number, b: number) {
    //   return a - b;
    // }

    // function compareObjects(a: {}, b: {}) {
    //   return a - b;
    // }

    // console.log(players[0].score)
    // players.sort( (a,b) => a.score - b.score );
    // players.sort((a, b) => (a.score > b.score) ? 1: -1);

    // if (players) {
    //   const sortPlayers = (players) => {
    //     return players.score.sort((a,b) => {
    //       return a - b;
    //     });
    //   }
  
    //   // sortPlayers(players);
    // }
    let maxScore = 0;
    let winners = 0;
    players.map((player)=> {
      if (maxScore < player.score) {
        maxScore = player.score
      }
    })
    console.log(maxScore)

    // players.map((player, i)=> {
    // console.log(players)

    
    // numberArray.sort(compareNumbers); // [1, 5, 40, 200]


    players.map((player, i)=> {
      if (maxScore === player.score) {
        const name = `${player.login} = ${player.score}`;
        const color = `rgba(0, 89, 135, 1)`;
        context.fillStyle = color;
        context.font = `bold ${radius * 0.12}px PequenaPro`;
        context.fillText(`${name}`, coordinates[winners].x, coordinates[winners].y);
        winners++;
      }


      // context.font = `${radius * 0.1}px PequenaPro`;
      // context.fillStyle = `rgba(39, 159, 217, 1)`;
      // player.words.map((word, j)=> {
      //   context.fillText(`${word}`, coordinates[i].x, coordinates[i].y + ((j+1) * radius*0.175));
      // })
    })
  }
}
