import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany, JoinTable } from 'typeorm'
import { Message } from '../../messages/entities/message.entity'
import { User } from '../../users/entities/user.entity'

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  location!: string

  @Column()
  creatorId!: number

  @ManyToOne(() => User, (user) => user.createdChannels)
  creator!: User

  @ManyToMany(() => User, (user) => user.memberChannels)
  @JoinTable()
  members!: User[]

  @Column({ default: 0 })
  memberCount!: number

  @OneToMany(() => Message, (message) => message.channel)
  messages!: Message[]
}
