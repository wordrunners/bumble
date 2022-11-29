import { useRef, FC, useEffect, useState, useCallback } from 'react'

import { CanvasContext } from '../hooks/useCanvas'
import useResponsiveSize from '../hooks/useResponsiveSize'
import useResponsiveData from '../hooks/useResponsiveData'
import Game from './game'
import { useCanvasContext } from '../hooks/useCanvas'

import { useAppSelector, useAppDispatch } from '../hooks/useStore';
import {
  deleteLetter,
  addLetter,
} from './gameSlice';

interface CanvasProps {
  width: number;
  height: number;
}


type Coordinate = {
  x: number;
  y: number;
};

export const Canvas = ({ width, height }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [context, setContext] = useState<CanvasRenderingContext2D | undefined>()

  const dispatch = useAppDispatch();

  useEffect(() => {
    const ctx = canvasRef?.current?.getContext("2d",{willReadFrequently:true});
    if (ctx) setContext(ctx)
  }, [])

  // const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(undefined);

  const startPlay = useCallback((event: MouseEvent) => {
      const coordinates = getCoordinates(event);
      // if (coordinates) {
      //     setMousePosition(coordinates);
      // }
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
      const lastColorIndex = colorInfo.charAt(colorInfo.length-1)
      let sector = ''
      if (Number(lastColorIndex) < 9) {
        sector = lastColorIndex;
      } else if (Number(lastColorIndex) === 9) {
        dispatch(deleteLetter())
      }


      console.log(sector);
      dispatch(addLetter(sector))
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

export default Canvas

Canvas.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight,
};
