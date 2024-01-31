/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Request, Response, NextFunction } from 'express'
import { BadRequestError, UnauthorizedError, NotFoundError } from './exceptions'
import { sendErrorResponse } from './middlewares/error.middleware'
import passport from 'passport'

export const validateRequestBody = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) {
    const badRequestError = new BadRequestError('Request body is required.')
    sendErrorResponse(res, badRequestError)
  }
  next()
}

export const requireAuth = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false })(req, res, (err: any) => {
      if (err) {
        const unauthorizedError = new UnauthorizedError('Authentication required.')
        sendErrorResponse(res, unauthorizedError)
      } else {
        next()
      }
    })
  }
}

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  throw new NotFoundError(`Route not found: ${req.method} ${req.originalUrl}`)
}
