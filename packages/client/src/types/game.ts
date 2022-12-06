export type Game = {
  totalPlayers: number;
  activePlayer: number;
  activeCard: number;
  word: string;
  points: number;
  status: Status;
  width: number,
  height: number,
  card: Card | undefined,
  cards: Cards,
  timer: number,
  timeou: undefined,
  players: Players,
}

export type Status = 'start' | 'loading' | 'game' | 'over'

export type Cards = Array<Card>

export type Card = Array<Sector>

export type Sector = {
  letter: string;
  set: number;
  point: number;
  enabled: boolean;
};

export type Players = Array<Player>

export type Player = {
  login: string;
  words: Array<string>;
  score: number;
  enabled: boolean;
};
