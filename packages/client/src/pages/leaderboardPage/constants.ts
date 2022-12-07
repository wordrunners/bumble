export interface Leader {
    id: string;
    place: number;
    name: string;
    avatar: string;
    score: number;
};

export const mockLeaders: Leader[] = [
  {
      id: '1',
      place: 1,
      name: 'Евгения',
      avatar: '',
      score: 35,
  },
  {
      id: '2',
      place: 2,
      name: 'Данил',
      avatar: '',
      score: 33,
  },
  {
      id: '3',
      place: 3,
      name: 'Андрей',
      avatar: '',
      score: 30,
  },
  {
      id: '4',
      place: 4,
      name: 'Ирина',
      avatar: '',
      score: 25,
  },
];
