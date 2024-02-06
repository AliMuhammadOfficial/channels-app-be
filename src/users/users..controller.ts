/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response, NextFunction } from 'express'
import { NotFoundError } from '../common/exceptions'
import { sendErrorResponse } from '../common/middlewares/error.middleware'
import usersService from './users.service'

class UserController {
  static findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await usersService.fingAll()

      return res.status(200).json(users)
    } catch (error) {
      next(error)
    }
  }

  static getUserDetails = async (req: Request<{ id: string }>, res: Response) => {
    const userId = req.params.id

    try {
      const user = await usersService.findById(userId)

      if (!user) {
        const notFoundError = new NotFoundError(`User not found with ID: ${userId}`)
        UserController.sendErrorResponse(res, notFoundError)
        return
      }

      res.json({ user })
    } catch (error: any) {
      UserController.sendErrorResponse(res, error)
    }
  }
  private static sendErrorResponse(res: Response, error: any) {
    sendErrorResponse(res, error)
  }
}

export default UserController
