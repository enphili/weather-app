import express from 'express'
import axios from 'axios'

const api = axios.create({baseURL: 'https://api.openweathermap.org/data/2.5/weather'})

const router = express.Router()

router.get('/api/tempandicon', async (req, res, next) => {
  try {
    const locations = req.query.locations || []
    const units = req.query.units
    const arrPromises = []
    const result = []
    for await (const loc of locations) {
      const url = `?lat=${loc.coords[0]}&lon=${loc.coords[1]}&appid=${process.env.WA_API_KEY}&units=${units}&lang=ru`
      const response = await api({url, method: 'GET'})
      arrPromises.push(response.data)
    }
    const promises = await Promise.allSettled(arrPromises)
    promises.forEach(promise => {
      if (promise.status === 'fulfilled') {
        const tempP = promise.value.main.temp
        const iconP = promise.value.weather[0].id
        result.push({
          temp: tempP ? tempP : NaN,
          icon: iconP ? 'wi-owm-' + iconP : 'wi-na'
        })
      } else {
        result.push({temp: NaN, icon: 'wi-na'})
      }
    })
    res.status(200).json(result)
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