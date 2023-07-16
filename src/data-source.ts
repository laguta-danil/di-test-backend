import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Post } from './entity/post';
import { User } from './entity/user';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.SQL_DB_HOST,
  port: 5432,
  username: process.env.SQL_DB_USER,
  password: process.env.SQL_DB_PASSWORD,
  database: process.env.SQL_DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Post],
  migrations: [],
  subscribers: [],
});
