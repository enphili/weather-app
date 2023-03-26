import { NextFunction, Request, Response } from 'express'

export const responseHeaders = function(req: Request, res: Response, next: NextFunction) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token, Access-Control-Allow-Headers, Authorization")
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
  next()
}
