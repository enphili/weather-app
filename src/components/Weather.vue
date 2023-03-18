<template>
  <transition>
    <loader v-if="isLoader"></loader>
  </transition>

  <div class="weather-app__main-content main-content">
    <div class="main-content__present-weather present-weather">
      <div class="main-content__temperature-wrapper temperature-wrapper">
        <span class="main-content__today-temperature today-temperature">{{ temp }}&deg;</span>
        <i class="wi main-weather-icon" :class="`wi-owm-${iconCode}`"></i>
      </div>
      <p class="main-content__weather-text weather-text">{{ weatherDescription }}</p>
      <p class="main-content__feels-like feels-like">Ощущается как: {{ feelsLike }}&deg;</p>
    </div>
    <div class="main-content__weather-parameters weather-parameters">
      <div class="weather-parameters__extended-data extended-data">
        <i class="wi wi-barometer weather-parameters__extended-icon extended-icon"></i>
        <span class="extended-data__value">{{ pressure }}</span>
        <span class="extended-data__units">{{ whatIsUnitPressure }}</span>
      </div>
      <div class="weather-parameters__extended-data extended-data">
        <i class="wi wi-humidity weather-parameters__extended-icon extended-icon"></i>
        <span class="extended-data__value">{{ humidity }}%</span>
        <span class="extended-data__units"> </span>
      </div>
      <div class="weather-parameters__extended-data extended-data">
        <i class="wi wi-strong-wind weather-parameters__extended-icon extended-icon"></i>
        <span class="extended-data__value">{{ windSpeed }}</span>
        <span class="extended-data__units">{{ whatIsUnitWindSpeed }} ({{ windDeg }})</span>
      </div>
      <div class="weather-parameters__parameters-text">
        <i class="wi wi-sunrise">: {{ sunrise }}</i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="wi wi-sunset">: {{ sunset }}</i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Loader from './Loader.vue'
import {useWeatherStore} from '../store/weather'
import {computed, onMounted, ref} from 'vue'
import {useLocationsStore} from '../store/locations'
import {useYandexWeatherStore} from '../store/yanweather'

const store = useWeatherStore()
const locStore = useLocationsStore()
const yanStore = useYandexWeatherStore()
const isLoader = ref<boolean>(false)

onMounted(async () => {
  isLoader.value = true
  await store.weatherQueryDB(locStore.currentLocationCoords, locStore.currentUnits,false)
  await yanStore.yanWeatherQuery(locStore.currentLocationCoords, false)
  isLoader.value = false
})

const weather = computed(() => store.getSingleWeather)
const yanWeather = computed(() => yanStore.getYanWeather)
const temp = computed(() => Math.round(weather.value?.main?.temp ?? 0))
const weatherDescription = computed(() => {
  const str = weather.value?.weather?.[0]?.description ?? 'нет данных'
  return str.charAt(0).toUpperCase() + str.slice(1)
})
const feelsLike = computed(() => Math.round(weather.value?.main?.feels_like ?? 0))
const pressure = computed(() => {
  const data = Math.round(weather.value?.main?.pressure ?? 730)
  return locStore.currentUnits === 'metric' ? Math.round(data * 0.75) : data
})
const whatIsUnitPressure = computed(() => locStore.currentUnits === 'metric' ? 'мм рт.ст.' : 'гПа')
const humidity = computed(() => weather.value?.main?.humidity ?? 0)
const windSpeed = computed(() => {
  const speed = weather.value?.wind?.speed ?? 0
  return Math.round(speed)
})
const whatIsUnitWindSpeed = computed(() => locStore.currentUnits === 'metric' ? 'м/с' : 'mph')
const windDeg = computed(() => {
  const deg = weather.value?.wind?.deg ?? 0
  const directions = ['С', 'ССВ', 'СВ', 'ВВС', 'В', 'ВЮВ', 'ЮВ', 'ЮЮВ', 'Ю', 'ЮЮЗ', 'ЮЗ', 'ЗЮЗ', 'З', 'ЗСЗ', 'СЗ', 'ССЗ']
  const windDirection = Math.round(deg / 22.5)
  return directions[windDirection]
})
const iconCode = computed(() => weather.value?.weather?.[0]?.id ?? 200)
const sunrise = computed(() => yanWeather.value?.forecast?.sunrise ?? '00:00')
const sunset = computed(() => yanWeather.value?.forecast?.sunset ?? '00:00')
</script>

<style lang="sass">
.v-enter-active, .v-leave-active
  transition: opacity 0.5s ease
.v-enter-from, .v-leave-to
  opacity: 0
.weather-app
  &__main-content
    margin-top: 56px
    margin-bottom: 59px
.main-content
  display: flex
  flex-direction: column
  justify-content: flex-start
  flex: 1 0 auto
  &__present-weather
    flex: 1 0 auto
    margin-bottom: 20px
  &__weather-text
    margin-top: 12px
  &__feels-like
    margin-top: 5px
  &__weather-parameters
    flex: 0 1 auto
.present-weather
  display: flex
  flex-direction: column
  justify-content: center
.temperature-wrapper
  display: flex
  justify-content: center
  align-items: center
.today-temperature
  font-weight: 300
  font-size: 70px
  margin-right: 10px
  overflow: hidden
.main-weather-icon
  font-size: 62px
.weather-text
  font-size: 20px
  text-align: center
.feels-like
  text-align: center
.weather-parameters
  display: grid
  grid-template-columns: repeat(3, 1fr)
  grid-row-gap: 20px
  &__parameters-text
    grid-column: 1/ -1
    margin: 0 auto 20px auto
.extended-data
  display: flex
  flex-direction: column
  justify-content: space-between
  align-items: center
  &__value
    font-size: 22px
  &__units
    font-size: 18px
.extended-icon
  font-size: 28px
  margin-bottom: 13px
.parameters-text
  font-size: 16px
  margin-bottom: 10px
  &:last-child
    margin-bottom: 20px
</style>