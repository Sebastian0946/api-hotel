import { DataSource } from 'typeorm';
import Entities from './entities';
import { DB_DATABASE,DB_HOST,DB_PASSWORD,DB_PORT,DB_USER } from './config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: DB_DATABASE,
  entities: Entities,
  synchronize: true,
});
