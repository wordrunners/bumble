import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import { selectUser } from '@/store/authSlice';
import { selectTheme  } from '@/store/theme/themeSlice';
import { changeTheme } from '@/store/theme'
import { AppDispatch } from '@/store/store'
import { toggleFullscreen } from '@/utils'

import BackgroundMusic from '@/assets/audio/POL-super-match-short.wav'

import './Togglers.scss';

export const Togglers = () => {
  if (typeof window !== 'undefined') {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector(selectUser);
    const theme = useSelector(selectTheme);
    const [themeChecked, setThemeChecked] = useState(false)

    const handleThemeChange = () => {
      if ((user) && (user.id)) {
        dispatch(
          changeTheme({
            userId: user.id,
            themeId: theme === 'dark' ? 2 : 1,
          })
        )
      }
      setThemeChecked(prevThemeChecked => !prevThemeChecked)
    }
    useEffect(() => {
      setThemeChecked(theme === 'dark')
    }, [theme])

    const [screenChecked, setScreenChecked] = useState(false)
    const handleScreenChange = () => {
      toggleFullscreen()
      setScreenChecked(prevScreenChecked => !prevScreenChecked)
    }

    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio(BackgroundMusic))
    const toggleIsPlaying = () =>{
      setIsPlaying(isPlaying => !isPlaying)
    }
    useEffect(() => {
      const startupConfig = (instance: HTMLAudioElement) => {
        instance.loop = true;
        instance.volume = 0.5;
        instance.defaultMuted = false;
        instance.autoplay = true;
      }
      startupConfig(audioRef.current);
      if (isPlaying) {
        audioRef.current.play().catch((e: Error) => {
          console.error(e.message)
        });
      } else {
        audioRef.current.pause();
      }
    }, [isPlaying]);

    return (
      <div className="toggler">
        <div className="emoji-toggle emoji-theme">
          <input type="checkbox" id="toggle1" className="toggle" onChange={handleThemeChange} checked={themeChecked}></input>
          <div className="emoji"></div>
          <label htmlFor="toggle1" className="well"></label>
        </div>

        <div className="emoji-toggle emoji-sound">
          <input type="checkbox" id="toggle1" className="toggle" onChange={toggleIsPlaying} checked={!isPlaying}></input>
          <div className="emoji"></div>
          <label htmlFor="toggle1" className="well"></label>
        </div>

        <div className="emoji-toggle emoji-screen">
          <input type="checkbox" id="toggle1" className="toggle" onChange={handleScreenChange} checked={screenChecked}></input>
          <div className="emoji"></div>
          <label htmlFor="toggle1" className="well"></label>
        </div>
      </div>
    ); 
  } else {
    return (
      <div className="toggler">
          <div className="emoji-toggle emoji-theme">
            <input type="checkbox" id="toggle1" className="toggle"></input>
            <div className="emoji"></div>
            <label htmlFor="toggle1" className="well"></label>
          </div>
          <div className="emoji-toggle emoji-sound">
            <input type="checkbox" id="toggle1" className="toggle"></input>
            <div className="emoji"></div>
            <label htmlFor="toggle1" className="well"></label>
          </div>
          <div className="emoji-toggle emoji-screen">
            <input type="checkbox" id="toggle1" className="toggle"></input>
            <div className="emoji"></div>
            <label htmlFor="toggle1" className="well"></label>
          </div>
      </div>
    )
  }
}; 
