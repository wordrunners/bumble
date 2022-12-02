export class SendEntity {
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
  ): void => {
    const {context, width, height} = this;
    const radius = width < height*0.67 ? width*0.48 : height*0.325;

    context.font = `bold ${radius * 0.285}px PequenaPro`;
    context.textAlign = 'center'

    context.lineWidth = radius * 0.035;
    context.strokeStyle = `rgba(255, 229, 255, 255)`;
    context.strokeText('Bumble', width*0.5, height*0.875);
    context.fillStyle = `rgba(20, 29, 13, 1)`;
    context.fillText('Bumble', width*0.5, height*0.875);
  }
}
