// src/channels/channels.route.ts
import { Router } from 'express'
import ChannelsController from './channels.controller'
import passport from 'passport'

const router: Router = Router()

router.get('/', ChannelsController.getAllChannels)
router.get('/:id', ChannelsController.getChannelById)
router.post('/', passport.authenticate('jwt', { session: false }), ChannelsController.createChannel)

export { router as channelsRouter }
