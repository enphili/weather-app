import {TLocation} from '../types/appTypes'

export const getFromStorage = (key: string): [] => {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : []
}

export const setToStorage = (key: string, arr: TLocation[]) => {
  localStorage.setItem(key, JSON.stringify(arr))
}

export const getCurrentLimit = (key: string): number => {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item).curLimitLoc : 0
}

export const getCurrentUnitsFromLS = (key: string): string => {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item).units ? JSON.parse(item).units : 'metric' : 'metric'
}

export const setWeatherSetting = (key: string, subKey: string, value: string | number) => {
  const item = localStorage.getItem(key)
  const data = item ? JSON.parse(item) : {}
  const obj = Object.assign(data, {[subKey]: value})
  localStorage.setItem(key, JSON.stringify(obj))
}

export const getTheme = (key: string): string => {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item)?.theme ?? '' : ''
}
