import { AppDataSource } from '../data-source'
import { User } from './entities/user.entity'

interface IUser {
  id: number
  email: string
  firstName: string
  lastName: string
}

export const getUserById = async (userId: number): Promise<IUser | null> => {
  const userRepository = AppDataSource.getRepository(User)
  const user = await userRepository.findOneBy({
    id: userId,
  })

  return user || null
}

export const getAll = async (): Promise<IUser[] | null> => {
  const userRepository = AppDataSource.getRepository(User)
  const users = await userRepository.find()

  return users || null
}
