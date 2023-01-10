import { UserDTO } from "@/api/types";

export type LeaderBoard = {
  leaders: Leaders,
  activeLeader: number,
  loading: boolean,
  error: Error | null,
}

export interface LeaderPayload extends UserDTO {
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
