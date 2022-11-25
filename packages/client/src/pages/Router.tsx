import {
  createBrowserRouter,
} from 'react-router-dom';

import { MapPage } from '@/pages/mapPage';
import { ErrorPage } from '@/pages/errorPage';
import { GamePage } from '@/pages/gamePage';

export const Router = createBrowserRouter([
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
  {
    path: '/error',
    element: <ErrorPage />,
    errorElement: <ErrorPage />,
    children: [],
  },
])
