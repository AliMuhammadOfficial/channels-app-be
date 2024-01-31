// src/channels/channels.controller.ts
import { Request, Response } from 'express'
import ChannelsService from './channels.service'

class ChannelsController {
  static getAllChannels = async (req: Request, res: Response) => {
    try {
      const channels = await ChannelsService.getAllChannels()
      res.json(channels)
    } catch (error) {
      console.error('Error getting channels:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  static getChannelById = async (req: Request, res: Response) => {
    try {
      const channelId = parseInt(req.params.id, 10)
      const channel = await ChannelsService.getChannelById(channelId)

      if (channel) {
        res.json(channel)
      } else {
        res.status(404).json({ message: 'Channel not found' })
      }
    } catch (error) {
      console.error('Error getting channel by ID:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  static createChannel = async (req: Request, res: Response) => {
    try {
      const channelData = req.body
      const newChannel = await ChannelsService.createChannel(channelData)
      res.status(201).json(newChannel)
    } catch (error) {
      console.error('Error creating channel:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}

export default ChannelsController
