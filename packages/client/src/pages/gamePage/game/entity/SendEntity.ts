// import useResponsiveData from '../hooks/useResponsiveData'

class SendEntity {
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
  ): void => {


    context.fillStyle = `rgba(20, 19, 13, 1)`;
    context.font = `bold ${height * 0.125}px Impact`;
    context.textAlign = 'center'
    context?.fillText('⮕', width*0.85, height*0.5);

  }

}

export default SendEntity
