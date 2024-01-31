// src/channels/channels.route.ts
import { Router } from 'express'
import ChannelsController from './channels.controller'

const router = Router()

router.get('/', ChannelsController.getAllChannels)
router.get('/:id', ChannelsController.getChannelById)
router.post('/', ChannelsController.createChannel)

export { router as channelsRoute }
