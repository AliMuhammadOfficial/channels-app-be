import { Entity, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm'
import { User } from '../../users/entities/user.entity'
import { Channel } from '../../channels/entities/channel.entity'
import { nanoid } from 'nanoid'

@Entity()
export class Message {
  @Column({ type: 'text', primary: true, default: () => "'" + nanoid() + "'" })
  id!: string

  @Column()
  content!: string

  @ManyToOne(() => User, (user) => user.messages)
  user!: User

  @ManyToOne(() => Channel, (channel) => channel.messages)
  channel!: Channel

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
