export type GameType = {
  totalPlayers: number;
  activePlayer: number;
  activeCard: number;
  word: string;
  points: number;
  status: statusType;
  width: number,
  height: number,
  card: cardType | undefined,
  cards: cardsType | undefined,
  timer: number,
  setI: undefined,
  players: playersType,
  context: CanvasRenderingContext2D | undefined
}

export type statusType = 'start' | 'loading' | 'game' | 'over'

// export type gameCardsType = {
//   completed: cardsType | undefined,
//   new: cardsType | undefined
// }

export type cardsType = Array<cardType>

export type cardType = Array<sectorType>

export type sectorType = {
  letter: string;
  set: number;
  point: number;
  enabled: boolean;
};

export type playersType = Array<playerType>

export type playerType = {
  login: string;
  words: Array<string>;
  score: number;
  enabled: boolean;
};