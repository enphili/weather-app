import { defineStore } from 'pinia'
import axios from 'axios'
import {TYanWeather} from '../types/appTypes'


export const useYandexWeatherStore = defineStore({
  id: 'yanweather',
  state: () => ({
    yanWeatherData: {} as TYanWeather
  }),
  
  getters: {
    getYanWeather: (state) => state.yanWeatherData
  },
  
  actions: {
    async yanWeatherQuery(coords: [number, number], isUpdate: boolean): Promise<any> {
      if (!isUpdate) {
        if (Object.keys(this.yanWeatherData).length !== 0 ) return
      }
      try {
        const response = await axios.get(`/api/yanweather?lat=${coords[0]}&lon=${coords[1]}`)
        this.yanWeatherData = response.data
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