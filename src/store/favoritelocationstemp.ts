import { defineStore } from 'pinia'
import {computed, ref} from 'vue'
import {TLocation, TTempAndIcon} from '../types/appTypes'
import axios from 'axios'

export const useTempsStore = defineStore('tempsandicons', () => {
  // state
  const temps = ref<TTempAndIcon[]>([])
  
  // getters
  const getTemps = computed(() => temps.value)
  
  // actions
  const getSingleTempAndIcon = async (locations: TLocation[], units: string): Promise<void> => {
    try {
      const options = {
        params: {
          locations,
          units
        }
      }
      const response = await axios.get('/api/tempandicon', options)
      temps.value = await response.data
    }
    catch (e) {
      if (typeof e === 'string') {
        console.log(e)
      } else if (e instanceof Error) {
        console.log(e.message)
      }
    }
  }
  
  const moveTempToFirst = (idx: number) => temps.value.unshift(...temps.value.splice(idx, 1))
  
  const removeTemp = (idx: number) => temps.value.splice(idx, 1)
  
  const reduceTempsLength = (length: number) => {
    if (temps.value.length > length) temps.value.length = length
  }
  
  return {
    temps,
    getTemps,
    getSingleTempAndIcon,
    moveTempToFirst,
    removeTemp,
    reduceTempsLength
  }
})