import {
  Model,
  Table,
  Column,
  DataType,
  AllowNull,
  BelongsTo,
} from 'sequelize-typescript'
import { UserModel } from './user'
import { BoardModel } from './board'

type Comment = {
  board_id: number
  parent_id: number | null
  user_id: number
  user_login: string
  comment: string
}

@Table({
  tableName: 'boards_comments',
})
export class CommentModel extends Model<Comment> {
  @BelongsTo(() => BoardModel, {
    foreignKey: 'board_id',
    as: 'board',
  })
  board_id: number | undefined

  @BelongsTo(() => CommentModel, {
    foreignKey: 'parent_id',
    as: 'parent',
  })
  parent_id: number | null | undefined

  @BelongsTo(() => UserModel, {
    foreignKey: 'user_id',
    as: 'user',
  })
  user_id: number | undefined

  @AllowNull(false)
  @Column(DataType.STRING)
  user_login: string | undefined

  @AllowNull(false)
  @Column(DataType.STRING)
  comment: string | undefined
}
