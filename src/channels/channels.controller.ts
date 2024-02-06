// src/channels/channels.controller.ts
import { Request, Response } from 'express'
import ChannelsService from './channels.service'

class ChannelsController {
  getAllChannels = async (req: Request, res: Response) => {
    try {
      const channels = await ChannelsService.getAllChannels()
      res.json(channels)
    } catch (error) {
      console.error('Error getting channels:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  getChannelById = async (req: Request, res: Response) => {
    try {
      const channelId = req.params.id
      const channel = await ChannelsService.findChannelById(channelId)

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

  createChannel = async (req: Request, res: Response) => {
    console.log('req', req)
    console.log('req.user', req.user)
    try {
      if (req.user) {
        const channelData = { ...req.body, creatorId: req.user[0].id, creator: req.user[0] }
        const newChannel = await ChannelsService.createChannel(channelData)
        res.status(201).json(newChannel)
      }
    } catch (error) {
      console.error('Error creating channel:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}

export default new ChannelsController()
