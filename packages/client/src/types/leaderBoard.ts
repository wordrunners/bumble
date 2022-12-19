export type LeaderBoard = {
  leaders: Leaders,
  activeLeader: number
}

export type Leaders = Array<Leader>

export type Leader = {
  id: number
  place: number
  login: string
  avatar: string
  score: number
}
