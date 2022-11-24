import {
  createBrowserRouter,
} from 'react-router-dom';

import { MapPage } from '@/pages/map';
import { ErrorPage } from '@/pages/error';
import { GamePage } from '@/pages/game';

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
