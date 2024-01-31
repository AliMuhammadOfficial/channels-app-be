import { Request, Response, NextFunction } from 'express'
import { NotFoundError } from '../common/exceptions'
import { getUserById } from './users.service'
import { sendErrorResponse } from '../common/middlewares/error.middleware'

export const findById = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ message: 'Hello, this is sample data!' })
  } catch (error) {
    next(error)
  }
}

export const findAll = (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.json({ message: 'Hello, this is sample data!' })
  } catch (error) {
    next(error)
  }
}

export const getUserDetails = async (req: Request<{ id: number }>, res: Response) => {
  const userId = req.params.id

  try {
    const user = await getUserById(userId)

    if (!user) {
      const notFoundError = new NotFoundError(`User not found with ID: ${userId}`)
      sendErrorResponse(res, notFoundError)
      return
    }

    res.json({ user })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    sendErrorResponse(res, error)
  }
}
