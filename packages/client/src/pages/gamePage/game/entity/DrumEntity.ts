class DrumEntity {
  private waveLength: number[]
  private color: string

  constructor(waveLength: number[], color: string) {
    this.waveLength = waveLength
    this.color = color
  }

  public set waveColor(color: string) {
    this.color = color
  }

  public draw = (
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    card: [  
      {"letter": string, "multiplication": number, "amount": number},  
    ]
  ): void => {

    const radius = width < height*0.73 ? width*0.48 : height*0.35;

    const multiplication = []
    const letters = []
    const amount = []

    for (let i = 0; i<card.length; i++) {
      multiplication.push(card[i].multiplication);
      letters.push(card[i].letter);
      amount.push(card[i].amount);
    }

    // const multiplication = [2, 1, 3, 1, 2, 3, 1, 3, 2]
    // const letters = ['Е', 'E', 'Ш', 'А', 'Л', 'Ц', 'Н', 'И', 'П', ]
    // const amount = [0, 0, 2, 0, 0, 2, 0, 2, 0]

    // colors
    // rgba(132, 200, 239, 1) - blue
    // rgba(222, 221, 97, 1) - yellow
    // rgba(88, 170, 98, 1) - green
    // rgba(208, 126, 151, 1) - pink

    // background
    context.fillStyle = 'rgba(132, 199, 239, 1)';
    context.fillRect(0, 0, width, height);

    //big
    context.beginPath();
    context.arc(width/2, height/2, radius, 0, 2 * Math.PI);
    context.fillStyle = "rgba(222, 221, 97, 1)";
    context.fill();

    //sectors
    for (let i = 0; i < 8; i++) {
      const sector = Math.PI * 0.25;
      const startAngle = sector * i;
      const endAngle = sector * (i+1); // 90 degree
      const origin = {x: width/2, y: height/2};
      context.beginPath();
      context.moveTo(origin.x, origin.y);
      context.arc(origin.x, origin.y, radius, startAngle, endAngle, false);
      if (multiplication[i] === 1){
        context.fillStyle = `rgba(222, 22${i}, 97, 1)`;  // y
      } else if (multiplication[i] === 2){
        context.fillStyle = `rgba(88, 17${i}, 98, 1)`; // g
      } else if (multiplication[i] === 3){
        context.fillStyle = `rgba(208, 12${i}, 151, 1)`;  // p
      }

      context.fill();
    }

    //letters
    context.translate(width*0.495, height*0.505);
    context.textBaseline = "middle";
    context.textAlign = "center";
    for(let i = 0; i < 8; i++){
      const ang = i * Math.PI / 4 + Math.PI / 8 * 5;
      context.rotate(ang);
      context.translate(0, -radius * 0.7125);
      context.rotate(-ang);

      context.fillStyle = `rgba(20, 1${i}, 13, 1)`;
      context.font = `bold ${radius * 0.425}px Impact`;
      context.fillText(letters[i], 0, 0);
      if (amount[i] > 1) {
        context.font = `bold ${radius * 0.125}px Impact`;
        context.fillText((amount[i]).toString(), radius * 0.205, radius * 0.15);

      }

      context.rotate(ang);
      context.translate(0, radius * 0.7125);
      context.rotate(-ang);
    }
    context.translate(-width*0.495, - height*0.505);
    
    //small
    context.beginPath();
    context.arc(width/2, height/2, radius*0.3, 0, 2 * Math.PI);
    if (multiplication[8] === 1){
      context.fillStyle = `rgba(222, 228, 97, 1)`;  // y
    } else if (multiplication[8] === 2){
      context.fillStyle = `rgba(88, 178, 98, 1)`; // g
    } else if (multiplication[8] === 3){
      context.fillStyle = `rgba(208, 128, 151, 1)`;  // p
    }
    context.fill();

    context.translate(width*0.495, height*0.505);
    context.fillStyle = `rgba(20, 18, 13, 1)`;
    context.font = `bold ${radius * 0.425}px Impact`;
    context.fillText(letters[8], 0, 0);
    if (amount[8] > 1) {
      context.font = `bold ${radius * 0.125}px Impact`;
      context.fillText((amount[8]).toString(), radius * 0.18, radius * 0.14);
    }
    context.translate(-width*0.495, - height*0.505);

  }

}

export default DrumEntity
