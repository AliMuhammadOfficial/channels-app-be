import express, { Router } from 'express'
import { findAll, getUserDetails } from './users..controller'
// import { requireAuth } from '../common/utils'
import passport from 'passport'

const router: Router = express.Router()

router.get('/', findAll)
router.get('/:id', passport.authenticate('jwt', { session: false }), getUserDetails)

export { router as usersRoute }
