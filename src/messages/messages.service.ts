import ChannelsService from '../channels/channels.service'
import { AppDataSource } from '../data-source'
import { io } from '../main'
import usersService from '../users/users.service'
import { Message } from './entities/message.entity'

class MessageService {
  private messageRepository = AppDataSource.getRepository(Message)

  async findAll(): Promise<Message[]> {
    return this.messageRepository.find()
  }

  async findById(id: string): Promise<Message | null> {
    return this.messageRepository.findOneBy({
      id,
    })
  }

  async create(content: string, userId: string, channelId: string): Promise<Message> {
    const user = await usersService.findById(userId)
    const channel = await ChannelsService.findChannelById(channelId)

    if (!user) {
      throw new Error(`User with ID ${userId} not found`)
    }

    if (!channel) {
      throw new Error(`Channel with ID ${channelId} not found`)
    }

    const message = new Message()
    message.content = content
    message.user = user
    message.channel = channel

    return this.messageRepository.save(message)
  }

  async createAndBroadcast(content: string, userId: string, channelId: string): Promise<Message> {
    const message = await this.create(content, userId, channelId)

    io.to(channelId).emit('newMessage', message)

    return message
  }
}

export default new MessageService()
