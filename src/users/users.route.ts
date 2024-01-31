import express, { Router } from 'express'
// import { findAll, getUserDetails } from './users..controller'
// import { requireAuth } from '../common/utils'
import passport from 'passport'
import UserController from './users..controller'

const router: Router = express.Router()

router.get('/', UserController.findAll)
router.get('/:id', passport.authenticate('jwt', { session: false }), UserController.getUserDetails)

export { router as usersRoute }
