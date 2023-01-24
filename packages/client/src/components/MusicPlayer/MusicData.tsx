import { useEffect, useRef, useState } from 'react'
import BackgroundMusic from '@/assets/audio/POL-super-match-short.wav'
import { Button } from '@/components/Button'

export const MusicData = () => {
  if (typeof window !== 'undefined') {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio(BackgroundMusic))
  
    const startupConfig = (instance: HTMLAudioElement) => {
      instance.loop = true;
      instance.volume = 0.5;
      instance.defaultMuted = false;
      instance.autoplay = true;
    }
    const toggleIsPlaying = () =>{
      setIsPlaying(!isPlaying)
    }
  
    startupConfig(audioRef.current);
  
    // audioRef.current.addEventListener("canplaythrough", event => {
    //   /* аудио может быть воспроизведено; проиграть, если позволяют разрешения */
    //   setIsPlaying(!isPlaying);
    // });
  
    useEffect(() => {
      if (isPlaying) {
        audioRef.current.play().catch((e: Error) => {
          console.error(e.message)
        });
      } else {
        audioRef.current.pause();
      }
    }, [isPlaying]);
  
    useEffect(() => {
      // Pause and clean up on unmount
      return () => {
        audioRef.current.pause();
      };
    }, []);
  
    return (

          <Button className={'toggleMusicButton'} onClick={()=>toggleIsPlaying()}>{!isPlaying ? 'Unmute' : 'mute'}</Button>

    ) 
  } else {
    return (
      <Button className={'toggleMusicButton'} >{'Unmute'}</Button>
    )
  }
  
}
