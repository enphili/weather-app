import { defineStore } from 'pinia'
import {computed, ref} from 'vue'
import {TForecast, TForecastList} from '../types/appTypes'
import axios from 'axios'

export const useForecastStore = defineStore('forecast', () => {
  
  // state
  const forecastData = ref({} as TForecast)
  
  // getters
  const getForecastList = computed(() => forecastData.value?.list ?? [])
  
  const getForecastDayChunk = computed(() => {
    const dayChunk = getForecastList.value.reduce((acc, cur: TForecastList) => {
      const key = cur.dt_txt.slice(0, 10)
      return { ...acc, [key]: [...(acc[key as keyof typeof acc] || []), cur] }
    }, {})
    const obj = Object.values(dayChunk)
    obj.shift()
    return obj as TForecastList[][]
  })
  
  // actions
  const getForecastFromApi = async (coords: [number, number], units: string, isUpdate: boolean): Promise<any> => {
    if (!isUpdate) {
      if (Object.keys(forecastData.value).length !== 0 ) return
    }
    try {
      const response = await axios.get(`/api/forecast?lat=${coords[0]}&lon=${coords[1]}&units=${units}`)
      forecastData.value = response.data
    }
    catch (e) {
      if (typeof e === 'string') {
        console.log(e)
      } else if (e instanceof Error) {
        console.log(e.message)
      }
    }
  }

  return {
    forecastData,
    getForecastList,
    getForecastDayChunk,
    getForecastFromApi
  }
})