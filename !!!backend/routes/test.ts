import express from 'express'
import axios from 'axios'

const router = express.Router()

const api = axios.create({ baseURL: 'https://fakestoreapi.com/products' })

router.get('/api/test', async (req, res, next) => {
  try {
    const url = '/1?lang=en'
    const response = await api(url)
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