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
  user_login: string
  comment: string
}

@Table({
  // http://stackoverflow.com/questions/338156/table-naming-dilemma-singular-vs-plural-names
  tableName: 'board_comment',
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
    foreignKey: 'user_login',
    as: 'user',
  })
  @AllowNull(false)
  @Column(DataType.STRING)
  user_login: string | undefined

  @AllowNull(false)
  @Column(DataType.STRING)
  comment: string | undefined
}
