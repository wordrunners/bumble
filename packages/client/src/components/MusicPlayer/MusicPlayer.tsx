import './MusicPlayer.scss';
import { Button } from '@/components/Button'
import { MusicData } from './MusicData';

export const MusicPlayer = () => {
  return (
    (typeof window !== 'undefined') 
      ? <MusicData></MusicData> 
      : <Button className={'toggleMusicButton'} >{'Unmute'}</Button>
  )  
}
