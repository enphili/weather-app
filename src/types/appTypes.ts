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

export type TLocation = {
  name: string,
  coords: [number, number],
  current: boolean
}

type TInfo = {
  lat: number,
  lon: number,
  url: string
}

type TFact = {
  temp: number,
  feels_like: number,
  icon: string,
  condition: string,
  wind_speed: number,
  wind_gust: number,
  wind_dir: string,
  pressure_mm: number,
  pressure_pa: number,
  humidity: number,
  daytime: string,
  polar: boolean,
  season: string,
  obs_time: number
}

export enum EPartName {
  night = 'ночью',
  morning = 'утром',
  day = 'днём',
  evening = 'вечером'
}

export enum EDays {
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота'
}

type TParts = {
  part_name: EPartName,
  temp_min: number,
  temp_max: number,
  temp_avg: number,
  feels_like: number,
  icon: string,
  condition: string,
  daytime: string,
  polar: false,
  wind_speed: number,
  wind_gust: number,
  wind_dir: string,
  pressure_mm: number,
  pressure_pa: number,
  humidity: number,
  prec_mm: number,
  prec_period: number,
  prec_prob: number
}

export type TYanWeather = {
  now: number,
  now_dt: string,
  info: TInfo,
  fact: TFact,
  forecast: {
    date: string,
    date_ts: number,
    week: number,
    sunrise: string,
    sunset: string,
    moon_code: number,
    moon_text: string,
    parts: TParts[]
  }
}

type TForecastMain = {
  temp: number,
  feels_like: number,
  temp_min: number,
  temp_max: number,
  pressure: number,
  sea_level: number,
  grnd_level: number,
  humidity: number,
  temp_kf: number
}

type TForecastWind = {
  speed: number,
  deg: number,
  gust: number
}

export type TForecastList = {
  dt: number,
  main: TForecastMain,
  weather: TWeather,
  clouds: {
    all: number
  },
  wind: TForecastWind,
  visibility: number,
  pop: number,
  rain: {
    "3h": number
  },
  sys: {
    pod: string
  },
  dt_txt: string
}

export type TForecast = {
  cod: string,
  message: number,
  cnt: number,
  list: TForecastList[],
  "city": {
    id: number,
    name: string,
    coord: TCoordinates,
    country: string,
    population: number,
    timezone: number,
    sunrise: number,
    sunset: number
  }
}