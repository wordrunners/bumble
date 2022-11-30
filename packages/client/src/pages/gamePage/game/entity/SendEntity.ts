// import useResponsiveData from '../hooks/useResponsiveData'

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

    context.fillStyle = `rgba(20, 19, 13, 1)`;
    context.font = `bold ${height * 0.125}px Impact`;
    context.textAlign = 'center'
    context?.fillText('⮕', width*0.85, height*0.5);

  }

}
