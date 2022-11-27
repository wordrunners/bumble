import { createBrowserRouter } from 'react-router-dom'

import { MapPage } from '@/pages/mapPage'
import { StartPage } from '@/pages/startPage'
import { ErrorPage } from '@/pages/errorPage'
import { GamePage } from '@/pages/gamePage'
import { SigninPage } from './signinPage'
import { SignupPage } from './signupPage'
import { ProfilePage } from './profilePage'
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
    element: (
      <ProfilePage
        id={31}
        login={'Семен'}
        firstName={'Семен'}
        secondName={'Семенов'}
        displayName={'Семен'}
        avatar={
          '/46f3061f-ca1f-4a29-8f0e-a921109bdc10/24b0e54b-9e9f-4e8e-94d7-dfd129a4d58a_round-avatar.png'
        }
        phone={'+789545623'}
        email={'aasd@bk.ru'}
      />
    ),
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: '/change-password',
    element: (
      <ChangePasswordPage
        id={31}
        login={'Семен'}
        firstName={'Семен'}
        secondName={'Семенов'}
        displayName={'Семен'}
        avatar={
          '/46f3061f-ca1f-4a29-8f0e-a921109bdc10/24b0e54b-9e9f-4e8e-94d7-dfd129a4d58a_round-avatar.png'
        }
        phone={'+789545623'}
        email={'aasd@bk.ru'}
      />
    ),
    errorElement: <ErrorPage />,
    children: [],
  },
])
