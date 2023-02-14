import {
  Model,
  Table,
  Column,
  DataType,
  AllowNull,
  BelongsTo,
} from 'sequelize-typescript'
import { UserModel } from './user'
import { CommentModel } from './comment'

export type Like = {
  user_id: number
  comment_id: number
  isLike: boolean
}

@Table({
  // http://stackoverflow.com/questions/338156/table-naming-dilemma-singular-vs-plural-names
  tableName: 'board_like',
})
export class LikeModel extends Model<Like> {
  @AllowNull(true)
  @Column(DataType.BOOLEAN)
  isLike: boolean | undefined

  @BelongsTo(() => UserModel, {
    foreignKey: 'user_id',
    as: 'user',
  })
  user_id: number | undefined

  @BelongsTo(() => CommentModel, {
    foreignKey: 'comment_id',
    as: 'comment',
  })
  comment_id: number | undefined
}
