import { useRef, useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";

import { CanvasContext } from '../hooks/useCanvas'
import { Game } from '../core/game'

import { useAppSelector, useAppDispatch } from '../hooks/useStore';
import {
  deleteLetter,
  addLetter,
  selectWord,
  selectHeight,
  selectWidth,
  setTimer,
  decrementIfTime,
  selectPlayers,
  addPlayer,
  deletePlayers,
  addWord,
  selectCard,
  deleteWord,
  clearPoints,
  setActivePlayer,
  selectTotalPlayers,
  selectActivePlayer,
  setStatus,
  selectCards,
  setCards,
  setActiveCard,
  nextActiveCard,
  selectActiveCard,
  countPoints
} from '../core/gameSlice';

import cardsData from '../cards/cards.json'
import playersData from '../cards/players.json'

export const GamePlay = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const width = useAppSelector(selectWidth);
  const height = useAppSelector(selectHeight);
  const players = useAppSelector(selectPlayers);
  const word = useAppSelector(selectWord);
  const card = useAppSelector(selectCard);
  const cards = useAppSelector(selectCards);
  const activeCard = useAppSelector(selectActiveCard);
  const totalPlayers = useAppSelector(selectTotalPlayers);
  const activePlayer = useAppSelector(selectActivePlayer);

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | undefined>()

  if ((totalPlayers === -1)) throw new Error('Select total players!');

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d",{willReadFrequently:true});
    if (context) {
      setContext(context)

      dispatch(setStatus('game'))

      dispatch(setActivePlayer(0))

      dispatch(setTimer(60))
      dispatch(decrementIfTime())
  
      dispatch(deletePlayers())

      for (let i = 0; i <= totalPlayers; i++) {
        dispatch(addPlayer(playersData[i]))
      }

      const newCards = []
      for (let i = 0; i <= ((totalPlayers + 1)*3 - 1); i++) {
        newCards.push(cardsData[i])
      }
      dispatch(setCards(newCards))
      dispatch(setActiveCard(0))
    
    }
  }, [])

  const handleCanvasClick=(event: React.MouseEvent<HTMLElement>)=>{
    if ((context) && (card) && (cards)) {
      const card = cards[activeCard];
      const mousePos = { x: event.clientX, y: event.clientY };
      const pixel = context.getImageData(mousePos.x, mousePos.y, 1, 1).data;
      if (pixel) {
        const colorInfo = `${pixel[1]}`;
  
        const sector = +colorInfo.slice(colorInfo.length-1)
        const button = +colorInfo.slice(colorInfo.length-2, colorInfo.length)
    
        if (button === 29) {
          players.map((player, i) => {
            if (i === activePlayer) {
              let data = '';
              for (let i = 0; i < word.length; i++) {
                data += card[+word[i]].letter;
              }
              dispatch(addWord(i, data))
              dispatch(deleteWord())
              dispatch(clearPoints())

              dispatch(nextActiveCard())

              if (activeCard === ((totalPlayers+1)*3 -1)) {
                navigate("/game-over");
              }
            }
          })
        } else if (sector < 9) {
          dispatch(addLetter(`${sector}`))
          dispatch(countPoints())

        } else if ((sector === 9) && (word)) {
          dispatch(deleteLetter())
          dispatch(countPoints())
        }
      }
    }
  };

  return (
    <CanvasContext.Provider value={{ context: context }}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onClick={handleCanvasClick}
      ></canvas>
      <Game />
    </CanvasContext.Provider>
  )
}
