import {
  createBrowserRouter,
} from 'react-router-dom';

import { MapPage } from '@/pages/mapPage';
import { StartPage } from '@/pages/startPage';
import { ErrorPage } from '@/pages/errorPage';
import { GamePage } from '@/pages/gamePage';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <StartPage />,
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
