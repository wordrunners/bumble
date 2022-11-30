export class TimerEntity {
  private context: CanvasRenderingContext2D
  private width: number
  private height: number
  // private timer: number


  constructor(
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    // timer: number,
    ) {
      this.context = context
      this.width = width
      this.height = height
      // this.timer = timer
  }

  public draw = (
    timer: number,
  ): void => {

    const {context, width, height} = this;

    const radius = width < height*0.67 ? width*0.48 : height*0.325;

    // colors
    // rgba(109, 199, 243, 1) - new blue
    // rgba(222, 220, 0, 1) - new yellow
    // rgba(47, 172, 102, 1) - new green
    // rgba(237, 114, 159, 1) - new pink



    context.fillStyle = `rgba(20, 19, 13, 1)`;
    // context.font = "40px Arial";
    context.font = `bold ${radius * 0.225}px PequenaPro`;
    context.textAlign = 'center';

    context?.fillText(`${timer}`, width/12, height/14);

    // context.fillStyle = 'rgba(222, 219, 0, 1)';
    // context.fillRect(width*0.3, height*0.94, width*0.1, height);

    // context.fillStyle = 'rgba(47, 179, 102, 1)';
    // context.fillRect(width*0.45, height*0.94, width*0.1, height);

    // context.fillStyle = 'rgba(237, 119, 159, 1)';
    // context.fillRect(width*0.6, height*0.94, width*0.1, height);

    // context.fillStyle = `rgba(20, 19, 13, 1)`;
    // context.font = `bold ${height * 0.035}px PequenaPro`;
    // context.textAlign = 'center'
    // context?.fillText('+1', width*0.35, height*0.9775);
    // context?.fillText('+2', width*0.5, height*0.9775);
    // context?.fillText('+3', width*0.65, height*0.9775);

  }

}

