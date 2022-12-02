import { useRef, FC, useEffect, useState, useCallback, Component } from 'react'

import { CanvasContext, useCanvasContext } from '../hooks/useCanvas'
import { Game } from './game'
import { Load } from '../../del/load'

import { useAppSelector, useAppDispatch } from '../hooks/useStore';
import {
  deleteLetter,
  addLetter,
  selectWord,
  selectHeight,
  selectWidth,
  setWidth,
  setHeight,
  setCard,
  setTimer,
  selectTimer,
  decrementIfTime,
  selectPlayers,
  addPlayer,
  deletePlayers,
  addWord,
  selectCard,
  deleteWord,
  selectPoints,
  setPoints,
  clearPoints,
  setTotalPlayers, 
  setActivePlayer,
  selectTotalPlayers,
  selectActivePlayer,
  selectStatus,
  setStatus,
  nextActivePlayer,
  nextTotalPlayers,
  addCards,
  deleteCards,
  selectCards,
  setCards,
  setActiveCard,
  nextActiveCard,
  selectActiveCard,
  countPoints
} from './gameSlice';
import { cardToArrays } from "../helpers/cardToArrays"

// import { countPoints } from "../helpers/countPoints"


import cardsData from '../cards/cards.json'
import playersData from '../cards/players.json'

export const GamePlay = () => {

  const status = useAppSelector(selectStatus);
  const width = useAppSelector(selectWidth);
  const height = useAppSelector(selectHeight);
  const players = useAppSelector(selectPlayers);
  const word = useAppSelector(selectWord);
  const points = useAppSelector(selectPoints);
  const card = useAppSelector(selectCard);
  const cards = useAppSelector(selectCards);
  const activeCard = useAppSelector(selectActiveCard);


  const totalPlayers = useAppSelector(selectTotalPlayers);
  const activePlayer = useAppSelector(selectActivePlayer);
  const dispatch = useAppDispatch();

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | undefined>()

  if ((totalPlayers === -1)) throw new Error('Select total players!');

  // const addPlayers = useCallback(() => {
  //   console.log('--',totalPlayers);
  //   // playersData.map((player) => {
  //   //   dispatch(addPlayer(player))
  //   // })
  // }, [])


  useEffect(() => {
    const context = canvasRef.current?.getContext("2d",{willReadFrequently:true});
    if (context) {
      setContext(context)

      dispatch(setStatus('game'))

      // window.addEventListener('keydown', setPlayers)

      // dispatch(setTotalPlayers(playersData.length))
      // dispatch(setTotalPlayers(0))

      dispatch(setActivePlayer(0))

      // setSizes()
      // window.addEventListener('resize', setSizes)
      


      // dispatch(setGameCards(cardsData[0]))
      // console.log('event', totalPlayers);


      dispatch(setTimer(60))
      dispatch(decrementIfTime())
  
      dispatch(deletePlayers())

      // for (let i = 0; i <= totalPlayers; i++) {
      //   dispatch(addPlayer(playersData[i]))
      // }


      for (let i = 0; i <= totalPlayers; i++) {
        // cards.push(cardsData[i])
        dispatch(addPlayer(playersData[i]))
        // for (let j = 0; j < 3; j++) {
          // dispatch(addCards(cardsData[i]))
        // }
      }

      // dispatch(setCard(cardsData[0]))

      console.log('-+-', totalPlayers);
      const newCards = []
      for (let i = 0; i <= ((totalPlayers + 1)*3 - 1); i++) {
        newCards.push(cardsData[i])
      }
      dispatch(setCards(newCards))
      dispatch(setActiveCard(0))



      // dispatch(deleteCards())
      // console.log('--', card, cards);
      // playersData.map((player) => {
      //   dispatch(addPlayer(player))
      // })
      // console.log('--',totalPlayers);

    
    }
  }, [])

  // const setPlayers = (event: KeyboardEvent) => {
  //           // console.log(event.key);

  //   // dispatch(nextActivePlayer())

  //   switch (event.key) {
  //     case 'ArrowRight':
  //       console.log('1', totalPlayers, activePlayer);
  //       dispatch(nextTotalPlayers())
  //       break;
  //     case 'Enter':
  //       // dispatch(nextActivePlayer())
  //       window.removeEventListener('keydown', setPlayers)
  //       // window.addEventListener('keydown', addPlayers)
  //       // addPlayers()
  //       // console.log('--',totalPlayers);
  //       dispatch(setStatus('loading'))
  //       break;
  //     default:
  //       console.log(`Sorry`);
  //   }
  // }



  // const setSizes = useCallback(() => {
  //   dispatch(setWidth(window.innerWidth))
  //   dispatch(setHeight(window.innerHeight))
  // }, [dispatch(setWidth), dispatch(setHeight)])

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

              // console.log(cards)
              // dispatch(setCard(cards[0]))
              dispatch(nextActiveCard())
              // dispatch(setCards(newCards))
              // dispatch(setActiveCard(activeCard))
            }
          })
        } else if (sector < 9) {
          console.log(card);
          dispatch(addLetter(`${sector}`))
          // const newWord = `${word}${sector}`
          // dispatch(setPoints(countPoints(newWord, card)))
          dispatch(countPoints())

        } else if ((sector === 9) && (word)) {
          dispatch(deleteLetter())
          // const newWord = word.slice(0, word.length-1)
          // dispatch(setPoints(countPoints(newWord, card)))
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
