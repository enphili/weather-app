type TCoordinates = {
  lon: number,
  lat: number
}

type TWeather = {
  id: number,
  main: string,
  description: string,
  icon: string
}[]

type TMainData = {
  temp: number,
  feels_like: number,
  temp_min: number,
  temp_max: number,
  pressure: number,
  humidity: number
}

type TWind = {
  speed: number,
  deg: number
}

type TClouds = {
  all: number
}

type TSystemData = {
  type: number,
  id: number,
  country: string,
  sunrise: number,
  sunset: number
}

export interface ISingleWeather {
  coord: TCoordinates,
  weather: TWeather,
  base: string,
  main: TMainData,
  visibility: number,
  wind: TWind,
  clouds: TClouds,
  dt: number,
  sys: TSystemData,
  timezone: number,
  id: number,
  name: string,
  cod: number
}