import { StartPage } from '@/pages/startPage'
import { ErrorPage } from '@/pages'
import { GameStartPage } from '@/pages'
import { GamePlayPage } from '@/pages'
import { GameOverPage } from '@/pages'
import { SigninPage } from './signinPage'
import { SignupPage } from './signupPage'
import { ProfilePage } from './profilePage'
import { ForumPage } from './forumPage'
import { ChangePasswordPage } from '@/pages/changePasswordPage'
import { LeaderboardPage } from './leaderboardPage'
import { Route, Routes } from 'react-router-dom'
import { 
  ROOT_ROUTE,
  GAME_ROUTE,
  GAME_PLAY_ROUTE,
  GAME_OVER_ROUTE,
  SIGNIN_ROUTE,
  SIGNUP_ROUTE,
  PROFILE_ROUTE,
  CHANGE_PASSWORD_ROUTE,
  LEADERBOARD_ROUTE,
  FORUM_ROUTE,
  ERROR_ROUTE,
} from '@/data/routes'

export const Router = () => {
  return (
    <Routes>
      <Route path={ROOT_ROUTE} element={<StartPage />} />
      <Route path={GAME_ROUTE} element={<GameStartPage />} />
      <Route path={GAME_PLAY_ROUTE} element={<GamePlayPage />} />
      <Route path={GAME_OVER_ROUTE} element={<GameOverPage />} />
      <Route path={SIGNIN_ROUTE} element={<SigninPage />} />
      <Route path={SIGNUP_ROUTE} element={<SignupPage />} />
      <Route path={PROFILE_ROUTE} element={<ProfilePage />} />
      <Route path={CHANGE_PASSWORD_ROUTE} element={<ChangePasswordPage />} />
      <Route path={LEADERBOARD_ROUTE} element={<LeaderboardPage />} />
      <Route path={FORUM_ROUTE} element={<ForumPage />} />
      <Route path={ERROR_ROUTE} element={<ErrorPage />}/>
    </Routes>
  )
}
