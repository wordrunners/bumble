export type GameType = {
  word: string;
  status: 'idle' | 'loading' | 'failed';
  width: number,
  height: number,
  card: cardType | undefined,
  timer: number,
  setI: undefined,
  players: playersType,
  context: CanvasRenderingContext2D | undefined
}

export type cardsType = Array<cardType>

export type cardType = Array<sectorType>

export type sectorType = {
  letter: string;
  multiplication: number;
  amount: number;
  enabled: boolean;
};

export type playersType = Array<playerType>

export type playerType = {
  login: string;
  words: Array<string>;
  score: number;
  enabled: boolean;
};
