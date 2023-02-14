import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'

export type Theme = {
  themeId: number
  userId: number
}

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'theme',
})
export class ThemeModel extends Model<Theme> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  themeId: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId: number
}
