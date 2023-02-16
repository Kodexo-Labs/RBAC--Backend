require('dotenv').config();
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import config from 'config';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';

const postgresConfig = config.get<{
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}>('postgresConfig');

export const AppDataSource = new DataSource({
  ...postgresConfig,
  type: 'postgres',
  synchronize: true,
  logging: false,
  entities: [User, Role],
  migrations: [],
  subscribers: [],
});
