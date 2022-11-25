


import { FC } from 'react'
import { useCanvasContext } from '../hooks/useCanvas'
import useResponsiveSize from '../hooks/useResponsiveSize'
import WaveEntity from '../entity/WaveEntity'
import DrumEntity from '../entity/DrumEntity'

import useColor from '../hooks/useColor'

const Wave: FC = () => {
  const { context } = useCanvasContext()
  const { width, height } = useResponsiveSize()
  const { generateColor } = useColor()

  const frequency = 0.013
  const colors: { [key: string]: string } = generateColor()

  let timer = 1
  const waves = {
    frontWave: new WaveEntity([0.0211, 0.028, 0.015], 'rgba(255,179,0,0.88)'),
    backWave: new WaveEntity([0.0122, 0.018, 0.005], 'rgba(255,179,0,0.48)'),
  }

  const drum = new DrumEntity([0.0211, 0.028, 0.015], 'rgba(255,179,0,0.88)')
  const angel = 0

  const render = () => {
    context?.clearRect(0, 0, width, height)

    // const colors = ['yellow', 'red', 'green', 'yellow', 'red', 'yellow', 'green', 'red',]
    const multiplication = [2, 1, 3, 1, 2, 3, 1, 3, 2]
    const letters = ['Е', 'E', 'Ш', 'А', 'Л', 'Ц', 'Н', 'И', 'П', ]
    const amount = [0, 0, 2, 0, 0, 2, 0, 2, 0]
    drum.draw(context!, width, height, multiplication, letters, amount, frequency)

    // console.log(angel);
    // while (angel <= Math.PI * 2) {
    //   angel = angel + Math.PI / 18;
    // console.log(angel);
    //   drum.rotate(context!, width, height, angel);
    // } 
    // angel = 0



    // Object.entries(waves).forEach(([waveName, wave]) => {
    //   wave.waveColor = colors[waveName]
    //   wave.draw(context!, width, height, frequency)
    // })
    // if (timer === 500) {
    //   colors = generateColor()
    //   timer = 1
    // }
    timer++
    // frequency += 0.013
    requestAnimationFrame(render)
  }
  if (context) render()
  return null
}

export default Wave
