// import { useEffect } from 'react'
import { Router } from '@/pages'
import { MusicPlayer } from '@/components/MusicPlayer'
import { ThemeTogglerButton } from '@/components/ThemeTogglerButton';
import { ThemeContext } from './utils/themeContext';
import { useAppSelector } from './hooks';
import { selectTheme } from './store/themeSlice';

export function App() {

  // TODO - Узнать зачем это
  // useEffect(() => {
  //     const fetchServerData = async () => {
  //       const url = `http://localhost:${__SERVER_PORT__}/api`
  //       const response = await fetch(url)
  //       const data = await response.json()
  //       console.log(data)
  //     }
  //   fetchServerData()
  // }, []);

  // TODO--- При SSR - navigator is not defined ---
  //
  // function startServiceWorker() {
  //   if ("serviceWorker" in navigator) {
  //     window.addEventListener("load", () => {
  //       navigator.serviceWorker.register("/serviceWorker.js").then(registration => {
  //         console.log("ServiceWorker registration successful with scope: ", registration.scope);
  //       }).catch((error: string) => {
  //         console.log("ServiceWorker registration failed: ", error);
  //       });
  //     });
  //   }
  // }

  // startServiceWorker();
  const theme = useAppSelector(selectTheme);

  return (
  <ThemeContext.Provider value={theme}>
    <ThemeContext.Consumer>
    {theme => (
      <div className={`app ${theme.style}`}>
        <Router />
        <MusicPlayer></MusicPlayer>
        <ThemeTogglerButton/>
      </div>
    )}
    </ThemeContext.Consumer>
  </ThemeContext.Provider>
  )
}
