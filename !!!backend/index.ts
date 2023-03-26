import express, { Express, NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import { responseHeaders } from './middlewares'
import { handleError, ErrorHandler } from './errorHandler'
import openWeather from './routes/openweathermap'
import yandexWeather from './routes/yandexweatherapi'
import forecastWeather from './routes/forecastweather'
import test from './routes/test'

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT ?? 3000

app.use(responseHeaders)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(openWeather)
app.use(yandexWeather)
app.use(forecastWeather)
app.use(test)
app.use((err: ErrorHandler, req: Request, res: Response, next: NextFunction) => handleError(err, res))

app.listen(PORT, () => {
  console.log(`⚡️ Server has been started at http://localhost:${PORT}... ⚡️`)
})