import {
  Sequelize,
  SequelizeOptions
} from 'sequelize-typescript';
import { 
  CommentModel, 
  BoardModel, 
  UserModel, 
  LikeModel, 
} from './src/models/boards'
import { ThemeModel } from './src/models/themes'


const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = process.env;

const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_HOST || 'localhost',
  port: parseInt(POSTGRES_PORT || ''),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
  models: [
    ThemeModel,
    CommentModel,
    BoardModel,
    UserModel,
    LikeModel,
  ]
};

const sequelize = new Sequelize(sequelizeOptions);

export async function createClientAndConnect() {
  try {
    await sequelize.authenticate();
    await sequelize.sync()
    console.log(' ➜ 🎸 Connected to the Postgres database! Yeap!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
