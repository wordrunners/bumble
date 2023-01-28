import { 
  Model,
  Table,
  Column,
  DataType,
  AllowNull
} from 'sequelize-typescript'

export type User = {
  id: number
  login: string
}

@Table({
  // http://stackoverflow.com/questions/338156/table-naming-dilemma-singular-vs-plural-names
  tableName: 'board_user',
  timestamps: false,
})
export class UserModel extends Model<User> {
  @AllowNull(false)
  @Column(DataType.STRING)
  login: string | undefined
}
