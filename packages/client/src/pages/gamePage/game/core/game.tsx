


import { useCanvasContext } from '../hooks/useCanvas'
import { useAppSelector } from '../hooks/useStore';

import { 
  DrumEntity,
  WordEntity,
  HUDEntity,
  SendEntity,
  PlayersEntity,
  LeadersEntity,
  BackgroundEntity,
  OverEntity,
  StartEntity
} from '../entity'

import {
  selectHeight,
  selectWidth,
  selectWord,
  selectCard,
  selectTimer,
  selectPlayers,
  selectPoints,
  selectTotalPlayers,
  selectActivePlayer,
  selectStatus,
} from './gameSlice';


export const Game = () => {
  const width = useAppSelector(selectWidth);
  const height = useAppSelector(selectHeight);
  const word = useAppSelector(selectWord);
  const points = useAppSelector(selectPoints);
  const card = useAppSelector(selectCard);
  const timer = useAppSelector(selectTimer);
  const players = useAppSelector(selectPlayers);
  const totalPlayers = useAppSelector(selectTotalPlayers);
  const activePlayer = useAppSelector(selectActivePlayer);
  const status = useAppSelector(selectStatus);

  const { context } = useCanvasContext()

  const render = () => {
    if (context) {
      document.fonts.load("16px 'PequenaPro'")
        .then(() => {
          switch (status) {
            case 'start':
              StartEntity(context, width, height, totalPlayers)
              break;
            case 'loading':
              BackgroundEntity(context, width, height)
              break;
            case 'game':
              if (card) {
                DrumEntity(context, width, height, card)
                WordEntity(context, width, height, word, card, points)
                HUDEntity(context, width, height)
                if (word) {
                  SendEntity(context, width, height)
                }
                if (players) {
                  PlayersEntity(context, width, height, players, timer, activePlayer)
                }
              }
              break;
            case 'over':
              OverEntity(context, width, height, )
              if (players) {
                LeadersEntity(context, width, height, players, )
                PlayersEntity(context, width, height, players, timer, activePlayer)
              }
              SendEntity(context, width, height)
              break;
            default:
              console.log(`Sorry`);
          }
        });
    }
  }

  if (context) {
    render()
  }

  return null
}
