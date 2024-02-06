import { User } from '../../users/entities/user.entity'

export interface CreateChannelDTO {
  name: string
  location: string
  creator: User
}
