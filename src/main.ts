import 'reflect-metadata'

import app from './app'

import { AppDataSource } from './data-source'

// import { User } from './users/entities/user.entity'

const PORT = process.env.PORT || 8000

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  })
  .catch((error) => console.log('TypeORM connection error: ', error))
