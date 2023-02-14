import {
  Model,
  Table,
  Column,
  DataType,
  AllowNull,
  PrimaryKey
} from 'sequelize-typescript'

export type User = {
  login: string
}

@Table({
  // http://stackoverflow.com/questions/338156/table-naming-dilemma-singular-vs-plural-names
  tableName: 'board_user',
  timestamps: false,
})
export class UserModel extends Model<User> {
  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.STRING)
  login: string | undefined
}
