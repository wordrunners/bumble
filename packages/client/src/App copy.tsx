import React, { useEffect } from 'react';
import './App.css';
import Router from '@/core/router';

// import MapPage from '@/routes/map-page';
// import ErrorPage from '@/routes/error-page';
// import GamePage from '@/routes/game-page';

import {
  RouterProvider,
} from 'react-router-dom';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <MapPage />,
//     errorElement: <ErrorPage />,
//     children: [],
//   },
//   {
//     path: '/game',
//     element: <GamePage />,
//     errorElement: <ErrorPage />,
//     children: [],
//   },
// ])

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return <div className="App">
    1
    {/* <RouterProvider router={Router} /> */}
  </div>
}

export default App
