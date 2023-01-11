export type LeaderBoard = {
  leaders: Leaders,
  activeLeader: number,
  loading: boolean,
  error: Error | null,
}

export interface LeaderPayload {
  id?: number;
  avatar?: string;
  score: number;
  name: string;
}

export interface Leader {
  data: {
    id: number;
    place?: number;
    avatar?: string;
    score: number;
    name: string;
  }
}

export type Leaders = Leader[];
