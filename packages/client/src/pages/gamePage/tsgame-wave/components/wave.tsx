


import { FC } from 'react'
import { useCanvasContext } from '../hooks/useCanvas'
import useResponsiveSize from '../hooks/useResponsiveSize'
// import useResponsiveData from '../hooks/useResponsiveData'
import WaveEntity from '../del/WaveEntity'
import DrumEntity from '../entity/DrumEntity'
import WordEntity from '../entity/WordEntity'
import * as data from '../cards/cards.json'

import useColor from '../hooks/useColor'

import { useAppSelector, useAppDispatch } from '../hooks/useStore';
import {
  decrement,
  increment,
  selectCount,
} from './counterSlice';
// interface CanvasProps {
  // word: string
// }

const Wave = () => {
// const Wave: FC = () => {
  const count = useAppSelector(selectCount);
  
  const { context } = useCanvasContext()
  const { width, height } = useResponsiveSize()
  const { generateColor } = useColor()
  // let { word } = useResponsiveData()

  // let frequency = 0.013
  // let colors: { [key: string]: string } = generateColor()

  let timer = 1
  // const waves = {
  //   frontWave: new WaveEntity([0.0211, 0.028, 0.015], 'rgba(255,179,0,0.88)'),
  //   backWave: new WaveEntity([0.0122, 0.018, 0.005], 'rgba(255,179,0,0.48)'),
  // }

  const drumCanvas = new DrumEntity([0.0211, 0.028, 0.015], 'rgba(255,179,0,0.88)')
  const wordCanvas = new WordEntity([0.0211, 0.028, 0.015], 'rgba(255,179,0,0.88)')
  // const angel = 0

  const render = () => {
    context?.clearRect(0, 0, width, height)
    // word = useResponsiveData()

    // Object.entries(waves).forEach(([waveName, wave]) => {
    //   wave.waveColor = colors[waveName]
    //   wave.draw(context!, width, height, frequency)
    // })
    if (timer === 500) {
      // colors = generateColor()
      timer = 1
    }
    timer++
    // frequency += 0.013
    requestAnimationFrame(render)

    // console.log(word);

    // const {name} = data;
    // console.log(name);

    const multiplication = [2, 1, 3, 1, 2, 3, 1, 3, 2]
    const letters = ['Е', 'E', 'Ш', 'А', 'Л', 'Ц', 'Н', 'И', 'П', ]
    const amount = [0, 0, 2, 0, 0, 2, 0, 2, 0]
        // console.log(amount);

    // const word = '';
    drumCanvas.draw(context!, width, height, multiplication, letters, amount)
    wordCanvas.draw(context!, width, height, count)
    // console.log(angel);
    // while (angel <= Math.PI * 2) {
    //   angel = angel + Math.PI / 18;
    // console.log(angel);
    //   drum.rotate(context!, width, height, angel);
    // } 
    // angel = 0




  }
  if (context) render()
  return null
}

// Wave.defaultProps = {
//   word: '2'
// };

export default Wave
