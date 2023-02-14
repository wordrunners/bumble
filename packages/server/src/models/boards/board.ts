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
  user_id: number
  title: string
  description?: string
}

@Table({
  tableName: 'boards',
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
