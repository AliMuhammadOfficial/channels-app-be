import { AppDataSource } from '../data-source'
import { User } from './entities/user.entity'

export const getUserById = async (userId: number): Promise<User | null> => {
  const userRepository = AppDataSource.getRepository(User)
  const user = await userRepository.findOneBy({
    id: userId,
  })

  return user
}

export const getAll = async (): Promise<User[] | null> => {
  const userRepository = AppDataSource.getRepository(User)
  const users = await userRepository.find()

  return users
}
