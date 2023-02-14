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
  tableName: 'boards_users',
  timestamps: false,
})
export class UserModel extends Model<User> {
  @AllowNull(false)
  @Column(DataType.STRING)
  login: string | undefined
}
