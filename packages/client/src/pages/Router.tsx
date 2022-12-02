import {
  createBrowserRouter,
} from 'react-router-dom';

import { MapPage } from '@/pages/mapPage';
import { StartPage } from '@/pages/startPage';
import { ErrorPage } from '@/pages/errorPage';
import { GamePlayPage } from '@/pages/gamePage';
import { GameStartPage } from '@/pages/gamePage';
import { GameOverPage } from '@/pages/gamePage';


export const Router = createBrowserRouter([
  {
    path: '/',
    element: <StartPage />,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: '/game',
    element: <GameStartPage />,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: '/game-play',
    element: <GamePlayPage />,
    errorElement: <GameStartPage />,
    children: [],
  },
  {
    path: '/game-over',
    element: <GameOverPage />,
    errorElement: <GameStartPage />,
    children: [],
  },
])
