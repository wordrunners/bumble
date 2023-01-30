export type AddBoard = {
  title: string
  description: string
  userId?: number
  userLogin?: string
}

export type AddComment = {
  parentId: number | null
  comment: string
  boardId: number
  userId: number
  userLogin: string
}

export type AddLike = {
  isLike: boolean
  commentId: number
  userId: number
  userLogin: string
}
