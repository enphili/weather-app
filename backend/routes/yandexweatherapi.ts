import express from 'express'
import axios from 'axios'

const api = axios.create({baseURL: 'https://api.weather.yandex.ru/v2/informers'})
const router = express.Router()

router.get('/api/yanweather', async (req, res, next) => {
  try {
    const { lat, lon } = req.query
    const url = `?lat=${lat}&lon=${lon}&lang=ru_RU`
    const response = await api(url, {
      method: 'GET',
      headers: {
        'X-Yandex-API-Key': process.env.YA_API_KEY,
        'Content-Type': 'application/json',
      }
    })
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

module.exports = router