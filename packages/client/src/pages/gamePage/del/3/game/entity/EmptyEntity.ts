export class EmptyEntity {
  // private waveLength: number[]
  // private color: string
  private width: number
  private height: number

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
  }

  // public set waveColor(color: string) {
  //   this.color = color
  // }

  public draw = (
    context: CanvasRenderingContext2D,
    // width: number,
    // height: number,

    // card: Array<{}>
  ): void => {


    context?.clearRect(0, 0, this.width, this.height)

  }

}
