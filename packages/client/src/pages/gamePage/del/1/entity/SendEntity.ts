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
    // // angel: number,
    // multiplication: Array<number>,
    // letters: Array<string>,
    // amount: Array<number>,
    // word: string,
    // card: Array<{}>
  ): void => {



    // const multiplication = []
    // const letters = []
    // const amount = []

    // for (let i = 0; i < card.length; i++) {
    //   multiplication.push(card[i].multiplication);
    //   letters.push(card[i].letter);
    //   amount.push(card[i].amount);
    // }

    // let newWord = '';
    // let score = 0;
    // for (let i = 0; i < word.length; i++) {
    //   newWord += letters[+word[i]]
    //   score += multiplication[+word[i]] 
    // }

    // rgba(222, 221, 97, 1) - yellow
    // rgba(88, 170, 98, 1) - green
    // rgba(208, 126, 151, 1) - pink

    // context.fillStyle = 'rgba(222, 221, 97, 1)';
    // context.fillRect(width*0.3, height*0.94, width*0.1, height);

    // context.fillStyle = 'rgba(88, 170, 98, 1)';
    // context.fillRect(width*0.45, height*0.94, width*0.1, height);

    // context.fillStyle = 'rgba(208, 126, 151, 1)';
    // context.fillRect(width*0.6, height*0.94, width*0.1, height);

    context.fillStyle = `rgba(20, 19, 13, 1)`;
    context.font = `bold ${height * 0.125}px Impact`;
    context.textAlign = 'center'
    context?.fillText('⮕', width*0.85, height*0.5);

    // context.fillRect(width*0.52, height*0.9, width, height);

    
    // context.font = "40px Arial";
    // context.textAlign = 'center';

    // newWord = (score !== 0) ? `${score} – ${newWord}` : '';
    // context?.fillText(newWord, width/2, height/12);

  }

}

export default SendEntity
