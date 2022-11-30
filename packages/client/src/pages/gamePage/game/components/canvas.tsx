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
} from './gameSlice';

import cards from '../cards/cards.json'

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


  // const context = useAppSelector(selectCanvas);

  // const { width, height } = useResponsiveSize()

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [context, setContext] = useState<CanvasRenderingContext2D | undefined>()

  // let [timer, setTimer] = useState<number | undefined>(60)

  const dispatch = useAppDispatch();

  // dispatch(setTimer(60))

  //   setInterval(() => {
  //   // const t = 
  //   // dispatch(setTimer(useAppSelector(selectTimer)))
  //   // timer--
  //   // timer = timer - 1;
  //   dispatch(decrementTimer())
  //   console.log(timer);
  // }, 1000);



  useEffect(() => {

    const context = canvasRef?.current?.getContext("2d",{willReadFrequently:true});
    if (context) {
      setContext(context)
      // dispatch(setCanvas(context))
      console.log(timer,'12')

      dispatch(setWidth(window.outerWidth))
      dispatch(setHeight(window.outerHeight))
      dispatch(setCard(cards[0]))
      dispatch(setTimer(600))
      dispatch(decrementIfTime())

      const newPlayer1 = {  
        name: 'Игрок 1',
        words: ['Раздватри', 'Дватрираз', 'Трираздва'],
        score: 0,
        enabled: true
      }
      const newPlayer2 = {  
        name: 'Игрок 2',
        words: ['Раздватри', 'Дватрираз', 'Трираздва'],
        score: 0,
        enabled: false
      }
      const newPlayers = [newPlayer1, newPlayer2]
      dispatch(setPlayers(newPlayers))

      

    }
  }, [])



  const startPlay = useCallback((event: MouseEvent) => {
      getCoordinates(event);
  }, []);

  const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) {
        return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    return { x: event.pageX - canvas.offsetLeft, y: event.pageY - canvas.offsetTop };
  };

  useEffect(() => {
      if (!canvasRef.current) {
        return;
      }
      const canvas: HTMLCanvasElement = canvasRef.current;
      canvas.addEventListener('mousedown', takeSelector);
      return () => {
        canvas.removeEventListener('mousedown', takeSelector);
      };
  }, [startPlay]);

  const takeSelector = (originalMousePosition: Coordinate) => {
      if (!canvasRef.current) {
        return;
      }
      const mousePos = {
        x: originalMousePosition.x,
        y: originalMousePosition.y
      };
      const canvas: HTMLCanvasElement = canvasRef.current;
      const context = canvas.getContext("2d",{willReadFrequently:true});
      const pixel = context?.getImageData(mousePos.x, mousePos.y, 1, 1).data;
      const colorInfo = `${pixel![1]}`;
      const sector = colorInfo.charAt(colorInfo.length-1)
      if (Number(sector) < 9) {
        dispatch(addLetter(sector))
      } else if (Number(sector) === 9) {
        dispatch(deleteLetter())
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
          ></canvas>
          <Game />
      </CanvasContext.Provider>
    </>
  )
}

