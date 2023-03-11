import express, { Express, NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import { responseHeaders } from './middlewares'
import { handleError, ErrorHandler } from './errorHandler'
const openWeather = require('./routes/openweathermap')
const yandexWeather = require('./routes/yandexweatherapi')

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT ?? 3000

app.use(responseHeaders)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(openWeather)
app.use(yandexWeather)

app.use((err: ErrorHandler, req: Request, res: Response, next: NextFunction) => handleError(err, res))

app.listen(PORT, () => {
  console.log(`⚡️ Server has been started at http://localhost:${PORT}... ⚡️`)
})