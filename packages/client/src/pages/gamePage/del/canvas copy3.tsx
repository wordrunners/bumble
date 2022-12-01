import { useRef, FC, useEffect, useState, useCallback, Component } from 'react'

import { CanvasContext } from '../hooks/useCanvas'
import useResponsiveSize from '../hooks/useResponsiveSize'
import { Game } from './game'
import { useCanvasContext } from '../hooks/useCanvas'

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
  selectCanvas,
  setCanvas,
  setTimer,
  selectTimer,
  decrementTimer,
  decrementIfTime,
  selectPlayers,
  setPlayers,
  addPlayer,
  deletePlayers,
  addWord
} from './gameSlice';
// import {
//   // selectPlayer,
//   selectWords,
//   setWord
// } from './playerSlice';

import cardsData from '../cards/cards.json'
import playersData from '../cards/players.json'

// interface CanvasProps {
//   width: number;
//   height: number;
// }

type Coordinate = {
  x: number;
  y: number;
};

// export const Canvas = ({ width, height }: CanvasProps) => {
export const Canvas = () => {

  const width = useAppSelector(selectWidth);
  const height = useAppSelector(selectHeight);

  const timer = useAppSelector(selectTimer);

  const players = useAppSelector(selectPlayers);

  // const player = useAppSelector(selectPlayer);


  // const context = useAppSelector(selectCanvas);

  // const { width, height } = useResponsiveSize()

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [context, setContext] = useState<CanvasRenderingContext2D | undefined>()

  // let [timer, setTimer] = useState<number | undefined>(60)

  const dispatch = useAppDispatch();

  async function init() {

    dispatch(setWidth(window.outerWidth))
    dispatch(setHeight(window.outerHeight))
    dispatch(setCard(cardsData[0]))
    dispatch(setTimer(600))
    dispatch(decrementIfTime())

    dispatch(deletePlayers())
    playersData.map((player) => {
      dispatch(addPlayer(player))
    })
  }

  useEffect(() => {

    const context = canvasRef?.current?.getContext("2d",{willReadFrequently:true});
    if (context) {
      setContext(context)

      init();
      // setContext(context)

      // dispatch(setWidth(window.outerWidth))
      // dispatch(setHeight(window.outerHeight))
      // dispatch(setCard(cardsData[0]))
      // dispatch(setTimer(600))
      // dispatch(decrementIfTime())

      // dispatch(deletePlayers())
      // playersData.map((player) => {
      //   dispatch(addPlayer(player))
      // })
    
    }

    // if (!canvasRef.current) {
    //   return;
    // }
    // const canvas: HTMLCanvasElement = canvasRef.current;
    // canvas.addEventListener('mousedown', takeSelector);
    // return () => {
    //   canvas.removeEventListener('mousedown', takeSelector);
    // };


  }, [])


  // const getCoordinates = useCallback((event: MouseEvent): Coordinate | undefined  => {
  //   if (!canvasRef.current) {
  //     return;
  //   }

  //   const canvas: HTMLCanvasElement = canvasRef.current;
  //   return { x: event.pageX - canvas.offsetLeft, y: event.pageY - canvas.offsetTop };
  // }, []); 

  // useEffect(() => {

  // }, [getCoordinates]);

//   const takeSelector = (originalMousePosition: Coordinate) => {
//     if (!canvasRef.current) {
//       return;
//     }
//     const mousePos = {
//       x: originalMousePosition.x,
//       y: originalMousePosition.y
//     };
//     const canvas: HTMLCanvasElement = canvasRef.current;
//     const context = canvas.getContext("2d");
//     const pixel = context?.getImageData(mousePos.x, mousePos.y, 1, 1).data;
//     const colorInfo = `${pixel![1]}`;

//     const sector = colorInfo.charAt(colorInfo.length-1)
//     if (Number(sector) < 9) {
//       dispatch(addLetter(sector))
//     } else if (Number(sector) === 9) {
//       dispatch(deleteLetter())
//     }

//     const button = colorInfo.slice(colorInfo.length-2, colorInfo.length)
//     if (+button === 29) {
//       console.log('Bumble!');
//       console.log(players, timer);
//       // players[0].

//       // players.map((player) => {
//       //   if (player.enabled) {
//       //     console.log('Bumble!');
//       //     // console.log(player.login)
//       //     // player.words.push(word);
//       //     // dispatch(addWord(player, '123'))
//       //   }
//       // })
// //
//     }

//   };

  // const [ coordinates, setCoordinates, canvasRef, canvasWidth, canvasHeight ] = useCanvas();

  const handleCanvasClick=(event: MouseEvent)=>{

    const currentCoord = { x: event.clientX, y: event.clientY };

    if (!canvasRef.current) {
      return;
    }
    const mousePos = {
      x: currentCoord.x,
      y: currentCoord.y
    };
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext("2d");
    const pixel = context?.getImageData(mousePos.x, mousePos.y, 1, 1).data;
    const colorInfo = `${pixel![1]}`;

    const sector = colorInfo.charAt(colorInfo.length-1)
    if (Number(sector) < 9) {
      dispatch(addLetter(sector))
    } else if (Number(sector) === 9) {
      dispatch(deleteLetter())
    }

    const button = colorInfo.slice(colorInfo.length-2, colorInfo.length)
    if (+button === 29) {
      console.log('Bumble!');
      console.log(players, timer);
      // players[0].

      // players.map((player) => {
      //   if (player.enabled) {
      //     console.log('Bumble!');
      //     // console.log(player.login)
      //     // player.words.push(word);
      //     // dispatch(addWord(player, '123'))
      //   }
      // })
//
    }

  };

  return (
    <>
      <CanvasContext.Provider value={{ context: context }}>
        <canvas
            id="canvas"
            ref={canvasRef}
            width={width}
            height={height}
            onClick={handleCanvasClick}
          ></canvas>
          <Game />
      </CanvasContext.Provider>
    </>
  )
}



  // const startPlay = useCallback((event: MouseEvent) => {
  //     getCoordinates(event);
  // }, []);

  // const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
  //   if (!canvasRef.current) {
  //       return;
  //   }

  //   const canvas: HTMLCanvasElement = canvasRef.current;
  //   return { x: event.pageX - canvas.offsetLeft, y: event.pageY - canvas.offsetTop };
  // };
