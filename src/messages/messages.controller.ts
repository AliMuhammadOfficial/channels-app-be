// controllers/message.controller.ts

import { Request, Response } from 'express'
import messagesService from './messages.service'
import { Message } from './entities/message.entity'
import { AppDataSource } from '../data-source'

class MessageController {
  private messagesRepository = AppDataSource.getRepository(Message)
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const messages = await messagesService.findAll()
      res.json(messages)
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const message = await messagesService.findById(id)

      if (message) {
        res.json(message)
      } else {
        res.status(404).json({ error: 'Message not found' })
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { content, userId, channelId } = req.body
      const message = await messagesService.createAndBroadcast(content, userId, channelId)

      res.status(201).json(message)
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { content } = req.body

      const message = await this.messagesRepository.findOneBy({ id })

      if (!message) {
        return res.status(404).json({ error: `Message with ID ${id} not found` })
      }

      message.content = content

      const updatedMessage = await this.messagesRepository.save(message)
      res.json(updatedMessage)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      const message = await this.messagesRepository.findOneBy({ id })

      if (!message) {
        return res.status(404).json({ error: `Message with ID ${id} not found` })
      }

      await this.messagesRepository.remove(message)
      res.status(204).send()
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export default new MessageController()
