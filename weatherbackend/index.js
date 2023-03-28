import express from 'express'
import RateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import { responseHeaders } from './middlewares.js'
import { handleError } from './errorHandler.js'
import forecastWeather from './routes/forecastweather.js'
import openWeather from './routes/openweathermap.js'
import yandexWeather from './routes/yandexweatherapi.js'
import singletempandicon from './routes/singletempandicon.js'

dotenv.config()
const PORT = process.env.PORT ?? 3000
const app = express()
const limit = RateLimit({
  windowMs: 6000,
  max: 10
})

app.use(limit)
app.use(responseHeaders)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(forecastWeather)
app.use(openWeather)
app.use(yandexWeather)
app.use(singletempandicon)

app.use((err, req, res, _) => handleError(err, res))

app.listen(PORT, () => {
  console.log(`⚡️ Server has been started at http://localhost:${PORT}... ⚡️`)
})