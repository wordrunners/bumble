import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { Router } from '@/pages'
import { store } from '@/store/store'
import { Provider } from 'react-redux'
import { MusicPlayer } from '@/components/MusicPlayer'

export function App() {
  useEffect(() => {
      const fetchServerData = async () => {
        const url = `http://localhost:${__SERVER_PORT__}/api`
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
      }
    fetchServerData()
  }, []);

  // // --- При SSR - navigator is not defined ---
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


  return (
    <div className="app">
      <Router />
      <MusicPlayer></MusicPlayer>
    </div>
  )
}
