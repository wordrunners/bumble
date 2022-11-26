// import useResponsiveData from '../hooks/useResponsiveData'

class WordEntity {
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
    // // angel: number,
    // multiplication: Array<number>,
    // letters: Array<string>,
    // amount: Array<number>,
    word: string,
  ): void => {






    
    
    context.font = "40px Arial";
    context?.fillText(word, width/4, height/12);

  }

}

export default WordEntity
