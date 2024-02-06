import { Channel } from './entities/channel.entity'
import { AppDataSource } from '../data-source'

class ChannelsService {
  static async getAllChannels() {
    const channelRepository = AppDataSource.getRepository(Channel)

    return await channelRepository.find()
  }

  static async findChannelById(id: string) {
    const channelRepository = AppDataSource.getRepository(Channel)
    return await channelRepository.findOneBy({ id })
  }

  static async createChannel(channelData: Channel) {
    const channelRepository = AppDataSource.getRepository(Channel)
    const newChannel = channelRepository.create(channelData)
    return await channelRepository.save(newChannel)
  }
}

export default ChannelsService
