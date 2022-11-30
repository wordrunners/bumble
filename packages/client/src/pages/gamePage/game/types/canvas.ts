
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
  name: string;
  words: Array<string>;
  score: number;
  enabled: boolean;
};
