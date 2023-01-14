import React, { useEffect, useRef, useState } from 'react'
import './MusicPlayer.scss';
import BackgroundMusic from '../../assets/audio/POL-super-match-short.wav'
import { Button } from '@/components/Button'

export const MusicPlayer = () => {
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
    console.log('click', audioRef.current)
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
    <div className="audio-player">
      <div className="audio-controls">
        <Button className={'toggleMusicButton'} onClick={()=>toggleIsPlaying()}>{!isPlaying ? 'Unmute' : 'mute'}</Button>
      </div>
    </div>
  )
}
