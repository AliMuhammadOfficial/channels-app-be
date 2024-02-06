/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import passport from 'passport'
import { configurePassport } from './auth/strategies/passport-jwt.strategy'
import { usersRouter } from './users/users.router'
import { messagesRouter } from './messages/messages.router'
import { channelsRouter } from './channels/channels.router'
import { authRouter } from './auth/auth.router'

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
app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/channels', channelsRouter)
app.use('/messages', messagesRouter)

export default app
