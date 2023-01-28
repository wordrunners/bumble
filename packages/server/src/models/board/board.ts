import {
  AllowNull,
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
} from 'sequelize-typescript'
import { UserModel } from './user'

type Board = {
  id?: number,
  user_id: number
  title: string
  description?: string
}

@Table({
  // http://stackoverflow.com/questions/338156/table-naming-dilemma-singular-vs-plural-names
  tableName: 'board',
})
export class BoardModel extends Model<Board> {
  @AllowNull(false)
  @Column(DataType.STRING)
  title: string | undefined

  @AllowNull(true)
  @Column(DataType.STRING)
  description: string | undefined

  @BelongsTo(() => UserModel, {
    foreignKey: 'user_id',
    as: 'user',
  })
  user_id: number | undefined
}
