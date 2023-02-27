import { defineStore } from 'pinia'
import {computed, ref} from 'vue'
import { beyondGuard } from '../utils/preventArrayOverflow'
import {getCurrentLimit, getFromStorage, setCurrentLimit, setToStorage} from '../utils/getfromstorage'

export const useLocationsStore = defineStore('locations', () => {
  // state
  const selectData =[5,10,15,20]
  const selectCurrentItem = getCurrentLimit('weatherAppSettings')
  const selectCurrentValue = ref(beyondGuard(selectData, selectCurrentItem))
  const locations = ref<{name: string, coords: [number, number], current: boolean}[]>(getFromStorage('weatherApp'))
  
  // getters
  const getLocation = computed(() => locations.value)
  
  
  // actions
  const changeSelectValue = (index: number, value: number) => {
    setCurrentLimit('weatherAppSettings', index)
    selectCurrentValue.value = value
  }
  
  const reduceLocationsLength = (length: number) => {
    if (locations.value.length > length) {
      locations.value.length = length
      setToStorage('weatherApp', locations.value)
    }
  }
  
  const addNewLocation = (iconCaption: string, coords: [number, number]) => {
    const hasLocation = locations.value.map(el => el.name).includes(iconCaption)
    if (!hasLocation && iconCaption) {
      locations.value.forEach(loc => loc.current = false)
      locations.value.unshift({name: iconCaption, coords: coords, current: true})
      if (locations.value.length > selectCurrentValue.value) {
        locations.value.pop()
      }
      setToStorage('weatherApp', locations.value)
    }
  }
  
  const removeOneLocation = (isCurren: boolean, idx: number) => {
    if (isCurren) return
    locations.value.splice(idx, 1)
    setToStorage('weatherApp', locations.value)
  }
  
  return {
    selectData,
    selectCurrentItem,
    selectCurrentValue,
    getLocation,
    addNewLocation,
    removeOneLocation,
    changeSelectValue,
    reduceLocationsLength
  }
})