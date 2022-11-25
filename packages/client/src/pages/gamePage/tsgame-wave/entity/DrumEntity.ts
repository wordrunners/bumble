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
    // angel: number,
    multiplication: Array<number>,
    letters: Array<string>,
    amount: Array<number>,
    frequency: number
  ): void => {

    const radius = width < height ? width*0.35 : height*0.35;

    //big
    context.beginPath();
    context.arc(width/2, height/2, radius, 0, 2 * Math.PI);
    context.fillStyle = "#DEDD44";
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
        context.fillStyle = `#DEDD4${i}`;    
      } else if (multiplication[i] === 2){
        context.fillStyle = `#58AA6${i}`;
      } else if (multiplication[i] === 3){
        context.fillStyle = `#DD799${i}`;
      }

      context.fill();
    }

    //letters
    context.translate(width*0.495, height*0.505);
    context.font = `bold ${radius * 0.5}px arial`;
    context.textBaseline = "middle";
    context.textAlign = "center";
    for(let i = 0; i < 8; i++){
      const ang = i * Math.PI / 4 + Math.PI / 8 * 5;
      context.rotate(ang);
      context.translate(0, -radius * 0.7);
      context.rotate(-ang);

      context.fillStyle = '#15100D';
      context.font = `bold ${radius * 0.35}px Impact`;
      context.fillText(letters[i], 0, 0);
      if (amount[i] > 1) {
        context.font = `bold ${radius * 0.125}px arial`;
        context.fillText((amount[i]).toString(), radius * 0.18, radius * 0.14);
      }


      context.rotate(ang);
      context.translate(0, radius * 0.7);
      context.rotate(-ang);
    }
    context.translate(-width*0.495, - height*0.505);
    



    //small
    context.beginPath();
    context.arc(width/2, height/2, radius*0.3, 0, 2 * Math.PI);
    if (multiplication[8] === 1){
      context.fillStyle = `#DEDD48`;    
    } else if (multiplication[8] === 2){
      context.fillStyle = `#58AA68`;
    } else if (multiplication[8] === 3){
      context.fillStyle = `#DD7998`;
    }
    context.fill();

    context.translate(width*0.495, height*0.505);
    context.fillStyle = '#15100D';
    context.font = `bold ${radius * 0.35}px Impact`;
    context.fillText(letters[8], 0, 0);
    if (amount[8] > 1) {
      context.font = `bold ${radius * 0.125}px arial`;
      context.fillText((amount[8]).toString(), radius * 0.18, radius * 0.14);
    }
    context.translate(-width*0.495, - height*0.505);


    
    
    context.font = "40px Arial";
    context?.fillText("Bumble", width/4, height/8);

    // context.moveTo(0, 0);
    // context.lineTo(200, 100);
    // context.stroke();

    // context.moveTo(0, 0);
    // context.lineTo(width, height);
    // context.stroke();
    
    // context.beginPath()
    // context.moveTo(0, height)
    // if (this.waveLength.length < 3) {
    //   return
    // }
    // for (let i = 0; i < width; i++) {
    //   let wave1 = Math.sin(i * this.waveLength[0] - frequency)
    //   let wave2 = Math.sin(i * this.waveLength[1] - frequency)
    //   let wave3 = Math.sin(i * this.waveLength[2] - frequency)

    //   context.lineTo(i * 2.5, height - 400 + wave1 * wave2 * wave3 * 200)
    // }
    // context.lineTo(width, height)
    // context.fillStyle = this.color
    // context.fill()
    // context.closePath()
  }

  // public rotate = (
  //   context: CanvasRenderingContext2D,
  //   width: number,
  //   height: number,
  //   angel: number,

  // ): void => {
  //   // context.translate(width*0.495, height*0.505);
  //   context.rotate(angel);
  //   // // context.translate(-width*0.495, -height*0.505);
  // }
}

export default DrumEntity
