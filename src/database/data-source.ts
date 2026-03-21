import { DataSource } from 'typeorm';
import { envs } from '../config/envs';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: envs.DATABASE_HOST,
  port: envs.DATABASE_PORT,
  username: envs.DATABASE_USERNAME,
  password: envs.DATABASE_PASSWORD,
  database: envs.DATABASE_NAME,
  entities: [__dirname + '/../**/*.model{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
});
