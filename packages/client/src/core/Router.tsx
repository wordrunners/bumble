import {
  createBrowserRouter,
} from 'react-router-dom';

import MapPage from '@/routes/map-page';
import ErrorPage from '@/routes/error-page';
import GamePage from '@/routes/game-page';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <MapPage />,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: '/game',
    element: <GamePage />,
    errorElement: <ErrorPage />,
    children: [],
  },
])

export default Router
