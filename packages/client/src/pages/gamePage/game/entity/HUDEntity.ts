class HUDEntity {
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


    // colors
    // rgba(109, 199, 243, 1) - new blue
    // rgba(222, 220, 0, 1) - new yellow
    // rgba(47, 172, 102, 1) - new green
    // rgba(237, 114, 159, 1) - new pink

    // rgba(222, 221, 97, 1) - yellow
    // rgba(88, 170, 98, 1) - green
    // rgba(208, 126, 151, 1) - pink

    context.fillStyle = 'rgba(222, 219, 0, 1)';
    context.fillRect(width*0.3, height*0.94, width*0.1, height);

    context.fillStyle = 'rgba(47, 179, 102, 1)';
    context.fillRect(width*0.45, height*0.94, width*0.1, height);

    context.fillStyle = 'rgba(237, 119, 159, 1)';
    context.fillRect(width*0.6, height*0.94, width*0.1, height);

    context.fillStyle = `rgba(20, 19, 13, 1)`;
    context.font = `bold ${height * 0.035}px PequenaPro`;
    context.textAlign = 'center'
    context?.fillText('+1', width*0.35, height*0.9775);
    context?.fillText('+2', width*0.5, height*0.9775);
    context?.fillText('+3', width*0.65, height*0.9775);

  }

}

export default HUDEntity
