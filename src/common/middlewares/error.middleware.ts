// error.middleware.ts

import { Request, Response, NextFunction } from 'express'
import { NotFoundError } from '../exceptions'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const authenticationErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).send('Authentication failed')
  }

  console.error(err.stack)
  res.status(500).json({ error: 'Internal Server Error' })
}

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const error = new NotFoundError(`Route not found: ${req.method} ${req.originalUrl}`)

  // Log the error for debugging purposes
  console.error(error.stack)

  // Send a response with the error message
  res.status(error.statusCode).json({ error: error.message })

  // Continue with the middleware chain
  next()
}

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number
  ) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

// Utility function to send error response
export const sendErrorResponse = (res: Response, error: AppError) => {
  res.status(error.statusCode).json({ error: error.message })
}

// Middleware for handling errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    // Handle known application errors
    sendErrorResponse(res, err)
  } else {
    // Handle other unexpected errors
    console.error(err.stack)
    sendErrorResponse(res, new AppError('Internal Server Error', 500))
  }
}
