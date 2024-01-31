// import { EntityRepository, Repository } from 'typeorm'
// import { User } from './entities/user.entity'

// @EntityRepository(User)
// export class UserRepository extends Repository<User> {
//   async findByEmail(email: string): Promise<User | null> {
//     return this.findOne({ email })
//   }

//   async createUser(firstName: string = '', lastName: string = '', email: string, password: string): Promise<User> {
//     const newUser = this.create({
//       firstName,
//       lastName,
//       email,
//       password,
//       // Add other user properties if needed
//     })

//     return this.save(newUser)
//   }
//   // Add other custom repository methods as needed
// }
