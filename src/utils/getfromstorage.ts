import {TLocation} from '../types/appTypes'

const getLocationFromNavi = (): Promise<TLocation[]> => new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const result: TLocation[] = [{
            name: 'Ваше текущее местоположение',
            coords: [position.coords.latitude, position.coords.longitude],
            current: true
          }]
          resolve(result)
        },
        (error: GeolocationPositionError) => {
          console.warn(`ERROR(${error.code}): ${error.message}`)
          const result: TLocation[] = [{
            name: 'Москва',
            coords: [55.75417898652652,37.619532149780696],
            current: true
          }]
          reject(result)
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 10000,
        }
      )
  })

export const getFromStorage = async (key: string): Promise<TLocation[]> => {
  const item = localStorage.getItem(key)
  if (item) return JSON.parse(item)
  else return await getLocationFromNavi()
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
