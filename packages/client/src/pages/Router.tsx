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

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/game" element={<GameStartPage />} />
      <Route path="/game-play" element={<GamePlayPage />} />
      <Route path="/game-over" element={<GameOverPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/change-password" element={<ChangePasswordPage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="/forum" element={<ForumPage />} />
      <Route path='*' element={<ErrorPage />}/>
    </Routes>
  )
}
