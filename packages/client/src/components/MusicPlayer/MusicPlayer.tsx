import React, { useEffect, useRef, useState } from 'react'
import './MusicPlayer.scss';
import BackgroundMusic from '../../assets/audio/POL-super-match-short.wav'
import MuteUnmute from '@/components/MusicPlayer/controls/MuteUnmute'

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(BackgroundMusic))

  // const startupConfig = (instance: HTMLAudioElement) => {
  //   instance.loop = true;
  //   instance.autoplay = true;
  //   instance.defaultMuted = false;
  //   instance.volume = 0.5;
  // }
  //
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
  //
  // // startupConfig(audioRef.current);
  // setTimeout(()=>{
  //   setIsPlaying(true);
  // }, 0)

  return (
    <div className="audio-player">
      <div className="audio-controls">
        <MuteUnmute></MuteUnmute>
      </div>
    </div>
  )
}
