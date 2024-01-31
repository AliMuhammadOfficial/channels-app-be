import { Channel } from './entities/channel.entity'
import { AppDataSource } from '../data-source'

class ChannelsService {
  static async getAllChannels() {
    const channelRepository = AppDataSource.getRepository(Channel)

    return await channelRepository.find()
  }

  static async getChannelById(id: number) {
    const channelRepository = AppDataSource.getRepository(Channel)
    return await channelRepository.findOneBy({ id })
  }

  static async createChannel(channelData: { name: string; location: string }) {
    const channelRepository = AppDataSource.getRepository(Channel)
    const newChannel = channelRepository.create(channelData)
    return await channelRepository.save(newChannel)
  }
}

export default ChannelsService
