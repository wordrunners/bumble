import React, { useEffect, useRef, useState } from 'react'
import './MusicPlayer.scss';
import BackgroundMusic from '../../assets/audio/POL-super-match-short.wav'
import { MuteUnmute } from '@/components/MusicPlayer/controls/MuteUnmute'

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(BackgroundMusic))

  const startupConfig = (instance: HTMLAudioElement) => {
    instance.loop = true;
    instance.volume = 0.5;
    instance.defaultMuted = false;
    instance.autoplay = true;
  }
  const click = () =>{
    startupConfig(audioRef.current);
    audioRef.current.play().catch(e => console.error(e))
    console.log('click', audioRef.current)
  }

  // audioRef.current.addEventListener("canplaythrough", event => {
  //   /* аудио может быть воспроизведено; проиграть, если позволяют разрешения */
  //   startupConfig(audioRef.current)
  //   audioRef.current.play().catch((e: Error) => {
  //     console.error(e.message)
  //   });
  // });

  // useEffect(() => {
  //   if (isPlaying) {
  //     audioRef.current.play().catch((e: Error) => {
  //       console.error(e.message)
  //     });
  //   } else {
  //     audioRef.current.pause();
  //   }
  // }, [isPlaying]);
  //
  // useEffect(() => {
  //   // Pause and clean up on unmount
  //   return () => {
  //     audioRef.current.pause();
  //   };
  // }, []);

  return (
    <div className="audio-player">
      <div className="audio-controls">
        <MuteUnmute onClick={()=>click()}></MuteUnmute>
      </div>
    </div>
  )
}
