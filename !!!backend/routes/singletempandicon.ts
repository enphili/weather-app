import express from 'express'
import axios from 'axios'
import {TLocation, TTempAndIcon} from '../../src/types/appTypes'

// const api = axios.create({baseURL: 'https://api.openweathermap.org/data/2.5/weather'})
const api = axios.create({baseURL: 'https://api.escuelajs.co/api/v1'})

const router = express.Router()

router.get('/api/tempandicon', async (req, res, next) => {
  const response = await api('/categories',{ method: 'GET'})
  res.status(200).json(response.data)
  next()
  // console.log('1',req.query)
  // try {
  //   console.log('2',req.query)
  //   const locations = req.query.locations || []
  //   const units = req.query.units
  //   const arrPromises = []
  //   const result: TTempAndIcon[] = []
  //   for await (const loc of locations as unknown as TLocation[]) {
  //     const url: string = `?lat=${loc.coords[0]}&lon=${loc.coords[1]}&appid=${process.env.WA_API_KEY}&units=${units}&lang=ru`
  //     console.log(url)
  //     const response = await api({url, method: 'GET'})
  //     arrPromises.push(response.data)
  //   }
  //   const promises = await Promise.allSettled(arrPromises)
  //   promises.forEach(promise => {
  //     if (promise.status === 'fulfilled') {
  //       result.push({temp: promise.value.main.temp, icon: 'wi-owm-' + promise.value.weather[0].id})
  //     } else {
  //       result.push({temp: NaN, icon: 'wi-na'})
  //     }
  //   })
  //   res.status(200).json(result)
  //   next()
  // }
  // catch (e) {
  //   if (typeof e === 'string') {
  //     console.log(e)
  //   } else if (e instanceof Error) {
  //     console.log(e.message)
  //   }
  //   next(e)
  // }
})

module.exports = router