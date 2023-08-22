import { DataSource } from 'typeorm';
import Entities from './entities';
import { DB_DATABASE,DB_HOST,DB_PASSWORD,DB_PORT,DB_USER, DATABASE_URL } from './config';

// export default new DataSource({
//   type: 'postgres',
//   host: process.env.DB_HOST || DB_HOST,
//   username: process.env.DB_USER || DB_USER,
//   password: process.env.DB_PASSWORD || DB_PASSWORD,
//   port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : DB_PORT,
//   database: process.env.DB_DATABASE || DB_DATABASE,
//   entities: Entities,
//   synchronize: true,
// });

export default new DataSource({
  type: 'postgres',
  url: DATABASE_URL,
  entities: Entities,
  synchronize: true,
  ssl: true
});