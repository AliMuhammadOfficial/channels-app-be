import { Entity, Column, OneToMany, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm'
import { Message } from '../../messages/entities/message.entity'
import { Channel } from '../../channels/entities/channel.entity'
import { nanoid } from 'nanoid'

@Entity()
export class User {
  @Column({ type: 'text', primary: true, default: () => "'" + nanoid() + "'" })
  id!: string

  @Column({ unique: true })
  username!: string

  @Column()
  email!: string

  @Column()
  password!: string

  @Column({ nullable: true })
  firstName?: string

  @Column({ nullable: true })
  lastName?: string

  @Column({ default: true })
  isActive!: boolean

  @Column({ nullable: true })
  profileImage?: string

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt!: Date

  @OneToMany(() => Message, (message) => message.user)
  messages!: Message[]

  @OneToMany(() => Channel, (channel) => channel.creator)
  createdChannels!: Channel[]

  @ManyToMany(() => Channel, (channel) => channel.members)
  @JoinTable()
  memberChannels!: Channel[]

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = nanoid()
    }
  }

  @BeforeInsert()
  generateUsernameFromEmail() {
    if (!this.username) {
      this.username = this.email.split('@')[0]
    }
  }
}
