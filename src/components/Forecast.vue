<template>
  <transition>
    <loader v-if="isLoader"></loader>
  </transition>

  <div class="weather-app__main-content main-content main-content--fill-white">

    <div class="date-block">
      <span class="today">Сегодня</span>
      <span class="todays-date">{{ new Date().toLocaleString().slice(0, 17) }}</span>
    </div>

    <div class="main-content__hourly-forecast hourly-forecast">
      <div class="weather-today"
           v-for="part in parts"
           :key="part.part_name"
      >
        <span class="certain-hour__temp">{{ part.temp_avg }}&deg;C</span>
        <img
          :src="`https://yastatic.net/weather/i/icons/funky/dark/${part.icon}.svg`"
          class="certain-hour__icon"
          alt="weather-icon"
        >
        <span class="certain-hour__time">{{ EPartName[part.part_name] }}</span>
      </div>
    </div>

    <div>
      <div class="weekly-forecast"
           v-for="(item, idx) in forecastList"
           :key="idx"
      >
        <div class="certain-hour">
          <span
            class="weekly-forecast__day"
          >
            {{ idx === 0 ? 'завтра' : EDays[new Date(item[0].dt_txt).getDay()] }}
          </span>
          <span
            v-if="idx !== 0"
            class="weekly-forecast__day"
          >
            {{ new Date(item[0].dt_txt).toLocaleDateString('ru-RU', {day: 'numeric', month: 'long'}) }}
          </span>
        </div>

        <i class="wi wi-day-sunny mt-auto"></i>
        <i class="wi mt-auto" :class="`wi-owm-${item[arrMaxIndex[idx]]?.weather[0].id}`"></i>
        <span class="weekly-forecast__weather-conditions ml10">{{ item[arrMaxIndex[idx]]?.weather[0].description }}</span>
        <span class="day-temp">{{ Math.round(item[arrMaxIndex[idx]]?.main.temp) }}&deg;</span>

        <i class="wi wi-moon-alt-waxing-crescent-4 mt-auto color-grey"></i>
        <i class="wi mt-auto color-grey" :class="`wi-owm-${item[arrMinIndex[idx]]?.weather[0].id}`"></i>
        <span class="weekly-forecast__weather-conditions ml10 color-grey">{{ item[arrMinIndex[idx]]?.weather[0].description }}</span>
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

const yanStore = useYandexWeatherStore()
const forecastStore = useForecastStore()
const locationStore = useLocationsStore()
const isLoader = ref<boolean>(false)
const weather = computed(() => yanStore.getYanWeather)
const parts = computed(() => weather.value?.forecast?.parts ?? [])
const coords = locationStore.currentLocationCoords
const units = locationStore.currentUnits
const forecastList = computed(() => forecastStore.getForecastDayChunk)
const arrMaxIndex = computed(() => forecastList.value.map(el => el.reduce((a, c, i) => el[a].main.temp > c.main.temp ? a : i, 0)))
const arrMinIndex = computed(() => forecastList.value.map(el => el.reduce((a, c, i) => el[a].main.temp < c.main.temp ? a : i, 0)))

onMounted(async () => {
  isLoader.value = true
  await forecastStore.getForecastFromApi(coords, units, false)
  isLoader.value = false
})

</script>

<style lang="sass">
.main-content
  &--fill-white
    padding: 46px 16px
    background-color: #fff
    color: black
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
  color: rgba(0,0,0,0.5)
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
  align-items: center
  &__icon
    margin-top: 2px
    margin-bottom: 7px
    width: 40px
  &__time
    font-size: 10px
    color: rgba(0,0,0,0.5)
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
  color: rgba(0,0,0,0.5)
.night-temp
  font-size: 20px
  text-align: right
  color: rgba(0,0,0,0.5)
</style>