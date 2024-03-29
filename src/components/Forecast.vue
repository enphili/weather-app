<template>
  <transition>
    <loader v-if="isLoader"></loader>
  </transition>

  <div class="weather-app__main-content main-content main-content--fill-white">

    <div class="date-block">
      <span class="today">Сегодня</span>
      <span class="todays-date">{{ new Date().toLocaleDateString('ru-RU', {day: 'numeric', month: 'long'})}}</span>
    </div>

    <div class="main-content__hourly-forecast hourly-forecast">
      <div class="weather-today"
           v-for="part in parts"
           :key="part.temp_avg"
      >
        <span class="certain-hour__temp">
          {{ units === 'metric'
          ? Math.round(part.temp_avg)
          : units === 'standard'
            ? Math.round(part.temp_avg + 273.15)
            : Math.round(part.temp_avg * 9/5 + 32) }}
          &deg;
          {{ units === 'metric' ? 'С' : units === 'standard' ? 'K' : 'F' }}
        </span>
        <img
          v-if="part.icon"
          :src="`https://yastatic.net/weather/i/icons/funky/dark/${part.icon}.svg`"
          class="certain-hour__icon"
          alt="weather-icon"
        >
        <span class="certain-hour__time">{{ daysTime[part.part_name] }}</span>
      </div>
    </div>

    <div>
      <div class="weekly-forecast"
           v-for="(item, idx) in forecastList"
           :key="idx"
      >
        <div class="certain-hour">
          <span class="weekly-forecast__day">
            {{ idx === 0 ? 'завтра' : EDays[new Date(item[0].dt_txt).getDay()] }}
          </span>
          <span v-if="idx !== 0" class="weekly-forecast__day">
            {{ new Date(item[0].dt_txt).toLocaleDateString('ru-RU', {day: 'numeric', month: 'long'}) }}
          </span>
        </div>

        <i class="wi wi-day-sunny mt-auto"></i>
        <i
          class="wi mt-auto"
          :class="item[arrMaxIndex[idx]]?.weather[0].id ? `wi-owm-${item[arrMaxIndex[idx]]?.weather[0].id}` : 'wi-na'"
        ></i>
        <span class="weekly-forecast__weather-conditions ml10">
          {{ item[arrMaxIndex[idx]]?.weather[0]?.description ? item[arrMaxIndex[idx]]?.weather[0].description : 'нет данных' }}
        </span>
        <span class="day-temp">{{ Math.round(item[arrMaxIndex[idx]]?.main.temp) }}&deg;</span>

        <i class="wi wi-moon-alt-waxing-crescent-4 mt-auto color-grey"></i>
        <i
          class="wi mt-auto color-grey"
          :class="item[arrMinIndex[idx]]?.weather[0].id ? `wi-owm-${item[arrMinIndex[idx]]?.weather[0].id}` : 'wi-na'"
        ></i>
        <span class="weekly-forecast__weather-conditions ml10 color-grey">
          {{ item[arrMinIndex[idx]]?.weather[0]?.description ? item[arrMinIndex[idx]]?.weather[0].description : 'нет данных'}}
        </span>
        <span class="night-temp">{{ Math.round(item[arrMinIndex[idx]]?.main.temp) }}&deg;</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useYandexWeatherStore} from '../store/yanweather'
import {computed, onMounted, ref} from 'vue'
import {EDays, EPartName} from '../types/appTypes'
import {useForecastStore} from '../store/forecast'
import {useLocationsStore} from '../store/locations'
import Loader from './Loader.vue'

defineProps<{
  theme?: string
}>()

const yanStore = useYandexWeatherStore()
const forecastStore = useForecastStore()
const locationStore = useLocationsStore()
const isLoader = ref<boolean>(false)
const weather = computed(() => yanStore.getYanWeather)
const parts = computed(() => weather.value?.forecast?.parts ?? [])
const coords = locationStore.currentLocationCoords
const units = computed(() => locationStore.currentUnits)
const forecastList = computed(() => forecastStore.getForecastDayChunk)
const arrMaxIndex = computed(() => {
  return forecastList.value.map(el => {
    return el.reduce((a, c, i) => el[a].main.temp > c.main.temp ? a : i, 0)
  })
})
const arrMinIndex = computed(() => {
  return forecastList.value.map(el => {
    return el.reduce((a, c, i) => el[a].main.temp < c.main.temp ? a : i, 0)
  })
})
const daysTime: EPartName = {
  night: 'ночью',
  morning: 'утром',
  day: 'днём',
  evening: 'вечером'
}

onMounted(async () => {
  isLoader.value = true
  await forecastStore.getForecastFromApi(coords, units.value, false)
  isLoader.value = false
})

</script>

<style lang="sass">
.main-content
  &--fill-white
    padding-top: 102px
    padding-left: 16px
    padding-right: 16px
    background-color: var(--content-bgc)
    color: var(--content-txt-color)
    transition: var(--transition)
    &:before
      content: ''
      position: fixed
      top: 0
      right: 0
      left: 0
      bottom: 0
      background-color: var(--content-bgc)
      z-index: -1
  &__hourly-forecast
    margin-top: 24px
    margin-bottom: 48px
.date-block
  display: flex
  justify-content: space-between
  align-items: center
.today
  font-size: 20px
.todays-date
  font-size: 12px
  color: var(--content-txt-color-gray)
  transition: var(--transition)
.hourly-forecast
  display: grid
  grid-template-columns: 1fr 1fr
.weather-today
  display: flex
  flex-direction: column
  align-items: center
.certain-hour
  grid-column-start: 1
  grid-column-end: 2
  grid-row-start: 1
  grid-row-end: span 2
  display: flex
  flex-direction: column
  &__icon
    margin-top: 2px
    margin-bottom: 7px
    width: 40px
  &__time
    font-size: 10px
    color: var(--content-txt-color-gray)
    transition: var(--transition)
.weekly-forecast
  display: grid
  grid-template-columns: 1fr 0.3fr 0.3fr 1.5fr 0.4fr
  align-items: center
  &:not(:last-child)
    margin-bottom: 25px
  &__day
    font-size: 13px
  &__weather-conditions
    font-size: 13px
.text-align-right
  text-align: right
.mr10
  margin-right: 10px
.ml10
  margin-left: 10px
.mt-auto
  margin: 0 auto
.day-temp
  font-size: 20px
  text-align: right
.color-grey
  color: var(--content-txt-color-gray)
  transition: var(--transition)
.night-temp
  font-size: 20px
  text-align: right
  color: var(--content-txt-color-gray)
  transition: var(--transition)
</style>