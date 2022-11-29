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
  setHeight
} from './gameSlice';

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
  // const { width, height } = useResponsiveSize()

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [context, setContext] = useState<CanvasRenderingContext2D | undefined>()

  const dispatch = useAppDispatch();

  useEffect(() => {
    const context = canvasRef?.current?.getContext("2d",{willReadFrequently:true});
    if (context) {
      setContext(context)
      dispatch(setWidth(window.outerWidth*3))
      dispatch(setHeight(window.outerHeight*3))
    }
  }, [])


  // const setSizes = useCallback(() => {
  //   dispatch(setWidth(window.outerWidth))
  //   dispatch(setHeight(window.outerHeight))
  // }, [dispatch(setWidth(window.outerWidth)), dispatch(setHeight(window.outerHeight))])

  // useEffect(() => {
  //   window.addEventListener('resize', setSizes)
  //   setSizes()
  // }, [setSizes])


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

// export default Canvas

// Canvas.defaultProps = {
//   width: window.innerWidth,
//   height: window.innerHeight,
// };
