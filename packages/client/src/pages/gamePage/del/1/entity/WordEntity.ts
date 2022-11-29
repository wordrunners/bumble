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
    card: [  
      {"letter": string, "multiplication": number, "amount": number},  
    ]
  ): void => {



    const multiplication = []
    const letters = []
    const amount = []

    for (let i = 0; i < card.length; i++) {
      multiplication.push(card[i].multiplication);
      letters.push(card[i].letter);
      amount.push(card[i].amount);
    }

    let newWord = '';
    let score = 0;
    let oneSet = 0, twoSet = 0, threeSet = 0;
    for (let i = 0; i < word.length; i++) {
      newWord += letters[+word[i]]
      score += amount[+word[i]] 
      if (multiplication[+word[i]] === 1) {
        oneSet++;
      } else if (multiplication[+word[i]] === 2) {
        twoSet++;
      } else if (multiplication[+word[i]] === 3) {
        threeSet++;
      } 
    }

    if (oneSet === 3) {
      score += 1;
    } else if (twoSet === 3) {
      score += 2;
    } else if (threeSet === 3) {
      score += 3;
    } 
    
    context.fillStyle = `rgba(20, 19, 13, 1)`;
    // context.font = "40px Arial";
    context.font = `bold ${height * 0.05}px Impact`;
    context.textAlign = 'center';

    newWord = (score !== 0) ? `${score} – ${newWord}` : '';
    context?.fillText(newWord, width/2, height/12);

  }

}

export default WordEntity
