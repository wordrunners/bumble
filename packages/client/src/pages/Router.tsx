import { Route, Routes } from 'react-router-dom'
import { 
  StartPage,
  SigninPage,
  SignupPage,
  ChangePasswordPage,
  LeaderboardPage,
  GamePlayPage,
  GameStartPage,
  GameOverPage,
  BoardPage,
  BoardsPage,
  ErrorPage,
  ProfilePage,
} from '@/pages'
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
  BOARDS_ROUTE,
  BOARD_ROUTE,
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
      <Route path={BOARDS_ROUTE} element={<BoardsPage />} />
      <Route path={BOARD_ROUTE} element={<BoardPage />} />
      <Route path={ERROR_ROUTE} element={<ErrorPage />}/>
    </Routes>
  )
}
