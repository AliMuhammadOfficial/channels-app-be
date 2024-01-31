/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */

import express, { Request, Response, NextFunction, Router } from 'express'
import { JwtSecretKey, RefreshTokenSecretKey } from './strategies/passport-jwt.strategy'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from '../users/entities/user.entity'
import { AppDataSource } from '../data-source'

const router: Router = Router()
router.use(express.json())

router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
  console.log('Headers:', req.headers)
  console.log('Body:', req.body)

  const { firstName, lastName, email, password } = await req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  try {
    const userRepository = AppDataSource.getRepository(User)
    const existingUser = await userRepository.findOneBy({
      email,
    })
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' })
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create a new user
    const newUser = new User()
    newUser.email = email
    newUser.firstName = firstName
    newUser.lastName = lastName
    newUser.password = hashedPassword

    await userRepository.save(newUser)

    // If signup is successful, generate a JWT token
    const token = jwt.sign({ sub: newUser.id }, JwtSecretKey, { expiresIn: '1h' })

    return res.json({ token })
  } catch (error) {
    return next(error)
  }
})

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOneBy({
      email,
    })
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Generate JWT token
    const token = jwt.sign({ sub: user.id }, JwtSecretKey, { expiresIn: '1h' })

    return res.json({ token })
  } catch (err) {
    next(err)
  }
})
// router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
//   const { email, password } = req.body

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password are required' })
//   }

//   passport.authenticate('jwt', { session: false }, (err: any, user: { email: string; password: string; id: any }) => {
//     if (err || !user) {
//       return res.status(401).json({ message: 'Unauthorized' })
//     }

//     // Validate the user's email and password (you may use a library like bcrypt for password hashing)
//     if (user.email !== email || user.password !== password) {
//       return res.status(401).json({ message: 'Invalid email or password' })
//     }

//     // If authentication is successful, generate a JWT token
//     const token = jwt.sign({ sub: user.id }, JwtSecretKey, { expiresIn: '1h' })

//     return res.json({ token })
//   })(req, res, next)
// })

router.post('/refresh-token', async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.body.refreshToken

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token is required' })
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, RefreshTokenSecretKey)

    // Generate a new JWT token
    const newToken = jwt.sign({ sub: decoded.sub }, JwtSecretKey, { expiresIn: '1h' })

    return res.json({ token: newToken })
  } catch (error) {
    return res.status(401).json({ message: 'Invalid refresh token' })
  }
})

export { router as authRoute }
