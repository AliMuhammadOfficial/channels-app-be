import { AppDataSource } from '../data-source'
import { User } from './entities/user.entity'

class UsersService {
  private userRepository = AppDataSource.getRepository(User)
  async fingAll() {
    return await this.userRepository.find()
  }

  async findById(id: string) {
    return await this.userRepository.findOneBy({ id })
  }

  async create(userData: {
    username: string
    email: string
    password: string
    firstName?: string
    lastName?: string
    isActive?: boolean
    profileImage?: string
  }): Promise<User> {
    const newUser = this.userRepository.create(userData)
    return await this.userRepository.save(newUser)
  }
}
export default new UsersService()
