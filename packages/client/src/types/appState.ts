import type { ProfileState } from './'
import type { LeaderBoard } from './'
import type { Game } from './'
import type { AuthState } from './'

export type AppState = {
  auth: AuthState,
  leaderBoard: LeaderBoard,
  game: Game,
  user: ProfileState,
}

declare global {
  interface Window {
    __PRELOADED_STATE__?: AppState;
  }
}
