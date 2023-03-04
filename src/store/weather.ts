import { defineStore } from 'pinia'
import axios from 'axios'
import {ISingleWeather} from '../types/appTypes'


export const useWeatherStore = defineStore({
  id: 'weather',
  state: () => ({
    weatherData: {} as ISingleWeather
  }),
  
  getters: {
    getSingleWeather: (state) => state.weatherData
  },
  
  actions: {
    async weatherQueryDB(coords: [number, number], isUpdate: boolean): Promise<any> {
      if (!isUpdate) {
        if (Object.keys(this.weatherData).length !== 0 ) return
      }
      try {
        const response = await axios.get(`/api/weather?lat=${coords[0]}&long=${coords[1]}&units=${'metric'}`)
        this.weatherData = response.data
      }
      catch (e) {
        if (typeof e === 'string') {
          console.log(e)
        } else if (e instanceof Error) {
          console.log(e.message)
        }
      }
    }
  }
})