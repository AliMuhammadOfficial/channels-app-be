import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { User } from '../../users/entities/user.entity'
import { Channel } from '../../channels/entities/channel.entity'

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  content!: string

  @ManyToOne(() => User, (user) => user.messages)
  user!: User

  @ManyToOne(() => Channel, (channel) => channel.messages)
  channel!: Channel
}
