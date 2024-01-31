import * as dotenv from 'dotenv'
import { DataSourceOptions } from 'typeorm'
dotenv.config()

export const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT!),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE).valueOf(), // For development only
  logging: true,
  entities: ['src/**/entities/*.ts'],
  migrations: ['src/migrations/*.ts'],
  // cli: {
  //   migrationsDir: 'src/migrations',
  // },
}
