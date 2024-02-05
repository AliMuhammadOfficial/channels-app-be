import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm'
import { Message } from '../../messages/entities/message.entity'
import { Channel } from '../../channels/entities/channel.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  username!: string

  @Column()
  email!: string

  @Column({ select: false })
  password!: string

  @Column({ nullable: true })
  firstName?: string

  @Column({ nullable: true })
  lastName?: string

  @Column({ default: true })
  isActive!: boolean

  @Column({ nullable: true })
  profileImage?: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date

  @OneToMany(() => Message, (message) => message.user)
  messages!: Message[]

  @OneToMany(() => Channel, (channel) => channel.creator)
  createdChannels!: Channel[]

  @ManyToMany(() => Channel, (channel) => channel.members)
  @JoinTable()
  memberChannels!: Channel[]
}
