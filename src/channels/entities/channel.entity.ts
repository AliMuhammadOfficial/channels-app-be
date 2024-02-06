import { Entity, Column, OneToMany, ManyToOne, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm'
import { nanoid } from 'nanoid'
import { User } from '../../users/entities/user.entity'
import { Message } from '../../messages/entities/message.entity'

@Entity()
export class Channel {
  @Column({ type: 'text', primary: true, default: () => "'" + nanoid() + "'" })
  id!: string

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

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt!: Date

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = nanoid()
    }
  }
}
