import { Response } from 'express'

export class ErrorHandler extends Error {
  readonly statusCode: number
  readonly message: string
  
  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
    this.message = message
  }
}

export const handleError = (err: ErrorHandler, response: Response) => {
  const statusCode = isNaN(err.statusCode) ? 500 : err.statusCode
  const message =  err.message ? err.message : err
  response.status(statusCode).json({
    success: false,
    status: 'error',
    errorCode: statusCode,
    message
  })
}
