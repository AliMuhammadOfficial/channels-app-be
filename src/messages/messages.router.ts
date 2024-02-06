import { Router } from 'express'
import messagesController from './messages.controller'

const router: Router = Router()

router.get('/', messagesController.getAll)
router.get('/:id', messagesController.getById)
router.post('/', messagesController.create)
router.put('/:id', messagesController.update)
router.delete('/:id', messagesController.delete)

export { router as messagesRouter }
