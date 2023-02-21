export interface BoardsState {
  boards: BoardDTO[]
  comments: Comment[]
  likes: Like[]
  error: string | null
  status: 'INIT' | 'FETCHING' | 'FETCH_FULFILLED' | 'FETCH_FAILED' | null
}

export type Comment = {
  id: number
  createdAt: string
  board_id: number
  parent_id: number | null
  user_id: number
  user_login: string
  comment: string
}

export type Like = {
  user_id: number
  comment_id: number
  isLike: boolean
}

export type BoardDTO = {
  user_id: number
  title: string
  description?: string
  id: number
  createdAt: Date | string
}

export interface Board {
  title: string
  description: string
  userId: number
  userLogin: string
}
