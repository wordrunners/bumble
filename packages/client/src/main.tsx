import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import '@/styles/index.scss';
import Root from '@/routes/root';
import ErrorPage from '@/routes/error-page';
import ForumPage from '@/routes/forum-page';
import GameOverPage from '@/routes/game-over-page';
import GamePage from '@/routes/game-page';
import GameStartPage from '@/routes/game-start-page';
import OnboardingPage from '@/routes/onboarding-page';
import ProfilePage from '@/routes/profile-page';
import LeadersPage from '@/routes/leaders-page';
import SignInPage from '@/routes/sign-in-page';
import SignUpPage from '@/routes/sign-up-page';


import Contacts, { 
  loader as contactsLoader, action as contactsAction, 
} from '@/routes/contacts/contacts';
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from '@/routes/contacts/contact';
import EditContact, {
  action as editAction,
} from '@/routes/contacts/edit';
import { 
  action as destroyAction 
} from '@/routes/contacts/destroy';
import Index from '@/routes/contacts/index';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: contactsLoader,
    action: contactsAction,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: '/forum',
    element: <ForumPage />,
    loader: contactsLoader,
    action: contactsAction,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: '/game-end',
    element: <GameOverPage />,
    loader: contactsLoader,
    action: contactsAction,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: '/game',
    element: <GamePage />,
    loader: contactsLoader,
    action: contactsAction,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: '/game-start',
    element: <GameStartPage />,
    loader: contactsLoader,
    action: contactsAction,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: '/leaders',
    element: <LeadersPage />,
    loader: contactsLoader,
    action: contactsAction,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: '/onboarding',
    element: <OnboardingPage />,
    loader: contactsLoader,
    action: contactsAction,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: '/profile',
    element: <ProfilePage />,
    loader: contactsLoader,
    action: contactsAction,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: '/sign-in',
    element: <SignInPage />,
    loader: contactsLoader,
    action: contactsAction,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
    loader: contactsLoader,
    action: contactsAction,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: '/contacts',
    element: <Contacts />,
    loader: contactsLoader,
    action: contactsAction,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: '/contacts/:contactId',
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: '/contacts/:contactId/edit',
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: '/contacts/:contactId/destroy',
            action: destroyAction,
            errorElement: <div>Oops!! There was an error.</div>,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
