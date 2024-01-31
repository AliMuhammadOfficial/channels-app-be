import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  location!: string
}
