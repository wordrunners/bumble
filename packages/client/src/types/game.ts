export type Game = {
  totalPlayers: number
  activePlayer: number
  activeCard: number
  word: string
  points: number
  status: Status
  width: number,
  height: number,
  card: Card | null,
  cards: Cards,
  timer: number,
  timeou: null,
  players: Players,
  settings: Settings,
  activeSettings: Settings,
  bumble: Bumble
}

export type Status = 'start' | 'loading' | 'game' | 'over'

export type Cards = Array<Card>

export type Card = Array<Sector>

export type Sector = {
  letter: string
  set: number
  point: number
  selected?: boolean | null
  enabled?: boolean | null
}

export type Players = Array<Player>

export type Player = {
  login: string
  words: Array<string>
  score: number
  enabled: boolean
}

export type Settings = 'local' | 'online' | 'players' | 'ready' | 'default'

export type Bumble = 'send' | 'error' | 'default'
