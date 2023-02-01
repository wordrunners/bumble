import { Router } from '@/pages'
import { MusicPlayer } from '@/components/MusicPlayer'
import { ThemeTogglerButton } from '@/components/ThemeTogglerButton';
import { CurrentTheme } from '@/utils/currentTheme';

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

  const style = CurrentTheme()

  return (
    <div className={`app ${style}`}>
      <Router />
      <MusicPlayer></MusicPlayer>
      <ThemeTogglerButton/>
    </div>
  )
}
