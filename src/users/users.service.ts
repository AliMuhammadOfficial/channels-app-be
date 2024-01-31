import { AppDataSource } from '../data-source'
import { User } from './entities/user.entity'

interface IUser {
  id: number
  email: string
  firstName: string
  lastName: string
}

export const getUserById = async (userId: number): Promise<IUser | null> => {
  // const user = mockDatabase[userId]
  const userRepository = AppDataSource.getRepository(User)
  const user = await userRepository.findOneBy({
    id: userId,
  })

  // Return null if the user is not found
  return user || null
}
