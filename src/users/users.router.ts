import { Router } from 'express'
// import { requireAuth } from '../common/utils'
import passport from 'passport'
import UserController from './users..controller'

const router: Router = Router()

router.get('/', UserController.findAll)
router.get('/:id', passport.authenticate('jwt', { session: false }), UserController.getUserDetails)

export { router as usersRouter }
