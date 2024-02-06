import { DataSource } from 'typeorm'
import { config } from './config/config'
// import { config } from './config/config'

// TypeORM creates connection pools and uses them for your requests
export const AppDataSource = new DataSource(config)
