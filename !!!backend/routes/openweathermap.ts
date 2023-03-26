import express from 'express'
import axios from 'axios'

const router = express.Router()

const api = axios.create({baseURL: 'https://api.openweathermap.org/data/2.5/weather'})

router.get('/api/weather', async (req, res, next) => {
  try {
    const { lat, long, units } = req.query
    const url = `?lat=${lat}&lon=${long}&appid=${process.env.WA_API_KEY}&units=${units}&lang=ru`
    const response = await api({url, method: 'GET'})
    res.status(200).json(response.data)
    next()
  }
  catch (e) {
    if (typeof e === 'string') {
      console.log(e)
    } else if (e instanceof Error) {
      console.log(e.message)
    }
    next(e)
  }
})

export default router