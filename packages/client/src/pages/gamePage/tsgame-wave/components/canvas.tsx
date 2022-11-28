import { useRef, FC, useEffect, useState, useCallback } from 'react'

import { CanvasContext } from '../hooks/useCanvas'
import useResponsiveSize from '../hooks/useResponsiveSize'
import useResponsiveData from '../hooks/useResponsiveData'
import Wave from './wave'
import { useCanvasContext } from '../hooks/useCanvas'
import { AppContext } from '../AppContext';
interface CanvasProps {
  width: number;
  height: number;
}




type Coordinate = {
  x: number;
  y: number;
};

// const Canvas: FC = () => {
export const Canvas = ({ width, height }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // let word = 'Bumble = ';
  // const { width, height } = useResponsiveSize()

  const [context, setContext] = useState<CanvasRenderingContext2D | undefined>()
  // AppContext.Provider.data.word













  useEffect(() => {
    const ctx = canvasRef?.current?.getContext("2d",{willReadFrequently:true});
    if (ctx) setContext(ctx)
  }, [])





  // let { items, setItems } = useResponsiveData()
  // const [word, setWord] = useState<string | undefined>()

  // useEffect(() => {
  //   const word = 'Bumble = ';
  //   if (word) setWord(word)
  // }, [])






  const [isPainting, setIsPainting] = useState(false);
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(undefined);

  const startPaint = useCallback((event: MouseEvent) => {
      const coordinates = getCoordinates(event);
      if (coordinates) {
          setMousePosition(coordinates);
          setIsPainting(true);
      }
  }, []);

  useEffect(() => {
      if (!canvasRef.current) {
          return;
      }
      const canvas: HTMLCanvasElement = canvasRef.current;
      canvas.addEventListener('mousedown', drawLine);
      return () => {
          canvas.removeEventListener('mousedown', drawLine);
      };
  }, [startPaint]);

  // const paint = useCallback(
  //     (event: MouseEvent) => {
  //         if (isPainting) {
  //             const newMousePosition = getCoordinates(event);
  //             if (mousePosition && newMousePosition) {
  //                 drawLine(mousePosition, newMousePosition);
  //                 setMousePosition(newMousePosition);
  //             }
  //         }
  //     },
  //     [isPainting, mousePosition]
  // );

  // useEffect(() => {
  //     if (!canvasRef.current) {
  //         return;
  //     }
  //     const canvas: HTMLCanvasElement = canvasRef.current;
  //     canvas.addEventListener('mousemove', paint);
  //     return () => {
  //         canvas.removeEventListener('mousemove', paint);
  //     };
  // }, [paint]);

  // const exitPaint = useCallback(() => {
  //     setIsPainting(false);
  //     setMousePosition(undefined);
  // }, []);

  // useEffect(() => {
  //     if (!canvasRef.current) {
  //         return;
  //     }
  //     const canvas: HTMLCanvasElement = canvasRef.current;
  //     canvas.addEventListener('mouseup', exitPaint);
  //     canvas.addEventListener('mouseleave', exitPaint);
  //     return () => {
  //         canvas.removeEventListener('mouseup', exitPaint);
  //         canvas.removeEventListener('mouseleave', exitPaint);
  //     };
  // }, [exitPaint]);

  const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
      if (!canvasRef.current) {
          return;
      }

      const canvas: HTMLCanvasElement = canvasRef.current;
      return { x: event.pageX - canvas.offsetLeft, y: event.pageY - canvas.offsetTop };
  };

  const drawLine = (originalMousePosition: Coordinate) => {
      if (!canvasRef.current) {
          return;
      }
      // console.log('1');
      const mousePos = {
        x: originalMousePosition.x,
        y: originalMousePosition.y
      };
      // const { context } = useCanvasContext()
      const canvas: HTMLCanvasElement = canvasRef.current;
      const context = canvas.getContext("2d",{willReadFrequently:true});
      // get pixel under cursor
      const pixel = context?.getImageData(mousePos.x, mousePos.y, 1, 1).data;
      let sector = `${pixel![1]}`;
      sector = sector.charAt(sector.length-1);
      // setItems(sector);
      console.log(sector);
      // word = word + sector.toString();
      // setWord(word)
      // console.log(word, '===', sector);
      // setCount(count + 1)
      // console.log(count)

      // context!.font = "40px Arial";
      // context?.fillText('word', width/4, height/12);


      // create rgb color for that pixel
      // const color = `rgb(${pixel?[0]},${pixel[1]},${pixel[2]})`;
    
      // find a circle with the same colour
      // circles.forEach(circle => {
      //   if (hasSameColor(color, circle)) {
      //     alert('click on circle: ' + circle.id);
      //   }
      // });


      // const canvas: HTMLCanvasElement = canvasRef.current;
      // const context = canvas.getContext('2d');
      // if (context) {
      //     context.strokeStyle = 'red';
      //     context.lineJoin = 'round';
      //     context.lineWidth = 5;

      //     context.beginPath();
      //     context.moveTo(originalMousePosition.x, originalMousePosition.y);
      //     context.lineTo(newMousePosition.x, newMousePosition.y);
      //     context.closePath();

      //     context.stroke();
      // }
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
        {/* <Wave word={word}/> */}
        <Wave/>
      </CanvasContext.Provider>
    </>
  )
}

export default Canvas


Canvas.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight,
  // count: 0
};
