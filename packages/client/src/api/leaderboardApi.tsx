import { request } from "@/Core";
import { LeaderPayload, Leaders } from "@/types";

export interface LeaderboardRequest {
    ratingFieldName: string,
    cursor: number,
    limit: number,
};

export interface LeaderboardNewLeaderRequest {
    data: LeaderPayload,
    ratingFieldName: string,
    teamName: string,
};

export const teamName = 'wordrunners';

export const leaderboardAPI = {
    getLeaderboard: (data: LeaderboardRequest) => request.post<Leaders>(`/leaderboard/${teamName}`, data),
    addUserToLeaderboard: (data: LeaderboardNewLeaderRequest) => request.post<LeaderboardNewLeaderRequest>('/leaderboard', data),
  }