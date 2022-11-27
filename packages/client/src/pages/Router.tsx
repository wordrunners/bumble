import { createBrowserRouter } from 'react-router-dom'

import { MapPage } from '@/pages/mapPage'
import { StartPage } from '@/pages/startPage'
import { ErrorPage } from '@/pages/errorPage'
import { GamePage } from '@/pages/gamePage'
import { SigninPage } from './signinPage'
import { SignupPage } from './signupPage'
import { ProfilePage } from './profilePage'
import { ForumPage } from './forumPage'
import { ChangePasswordPage } from '@/pages/changePasswordPage'

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
  {
    path: '/signin',
    element: <SigninPage />,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: '/signup',
    element: <SignupPage />,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: '/profile',
    element: <ProfilePage />,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: '/change-password',
    element: <ChangePasswordPage />,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: '/forum',
    element: <ForumPage />,
    errorElement: <ErrorPage />,
    children: [],
  },
])
