
export type cardsType = Array<cardType>

export type cardType = Array<sectorType>

export type sectorType = {
  letter: string; 
  multiplication: number, 
  amount: number;
  enabled: boolean
};

