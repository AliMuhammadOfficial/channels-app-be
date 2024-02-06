/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata'
import { Server } from 'socket.io'
import app from './app'
import { AppDataSource } from './data-source'

// import { User } from './users/entities/user.entity'

const PORT = process.env.PORT || 8000
let io: Server

AppDataSource.initialize()
  .then(() => {
    const httpServer = app.listen(PORT, () => {
      io = new Server(httpServer, {
        cors: {
          origin: ['http://localhost:8000', 'http://localhost:3000'],
        },
      })
      io.on('connection', (socket) => {
        console.log('socket connection', socket)
      })
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  })
  .catch((error) => console.log('TypeORM connection error: ', error))

export { io }
