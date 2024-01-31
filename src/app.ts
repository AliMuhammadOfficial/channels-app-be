/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import passport from 'passport'

import { userRoute } from './users/user.route'
import { configurePassport } from './auth/strategies/passport-jwt.strategy'
import { authRoute } from './auth/auth.route'

const app: Application = express()

// ################### Middlewares ###################
// Passport
app.use(passport.initialize())
configurePassport(passport)
// app.use(authenticationErrorHandler)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: err.message })
})

// Routes
app.use('/users', userRoute)
app.use('/auth', authRoute)

app.get('/secure-route', passport.authenticate('jwt', { session: false }), (req: Request, res: Response) => {
  return res.send(`Welcome, ${req?.user}!`)
})

export default app
