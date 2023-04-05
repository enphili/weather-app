<template>
  <div class="weather-app__main-content main-content main-content--fill-white">

    <div class="date-block">
      <span class="today">Выберите предпочтения</span>
    </div>

    <div>
      <div class="main-content__setting-point setting-point">
        <div class="setting-point__description description">
          <div class="pro-mode-wrap">
            <span class="setting-point__setting-name setting-name">Уведомления</span>
            <span v-if="!isProMode" class="pro-mode">pro</span>
          </div>
          <span class="setting-point__setting-description setting-description">Текущее место - {{ header }}</span>
        </div>
        <div class="setting-point__action-button action-button">
          <label class="switch" for="notifications">
            <input type="checkbox" id="notifications" :disabled="!isProMode"/>
            <div class="slider round"></div>
          </label>
        </div>
      </div>

      <div class="main-content__setting-point setting-point">
        <div class="setting-point__description description">
          <div class="pro-mode-wrap">
            <span class="setting-point__setting-name setting-name">Ослеживание</span>
            <span v-if="!isProMode" class="pro-mode">pro</span>
          </div>
          <span class="setting-point__setting-description setting-description">Погода в текущем местоположении</span>
        </div>
        <div class="setting-point__action-button action-button">
          <label class="switch" for="follow-me">
            <input type="checkbox" id="follow-me" :disabled="!isProMode"/>
            <div class="slider round"></div>
          </label>
        </div>
      </div>

      <div class="main-content__setting-point setting-point">
        <div class="setting-point__description description">
          <span class="setting-point__setting-name setting-name">Единицы измерения</span>
          <span
            class="setting-point__setting-description setting-description"
            v-for="unit in unitsData"
            :key="unit.value"
          >
          {{ unit.title }} ({{ unit.si }})
        </span>
        </div>
        <div class="setting-point__action-button action-button mr17 action-button--radio">
          <label
            class="metric"
            v-for="unit in unitsData"
            :for="unit.value"
          >
            <input
              type="radio"
              :id="unit.value"
              :value="unit.value"
              name="radio-group"
              v-model="units"
            >
            <span class="design"></span>
          </label>
        </div>
      </div>

      <div class="main-content__setting-point setting-point">
        <div class="setting-point__description description">
          <span class="setting-point__setting-name setting-name">Избранные локаций</span>
          <span class="setting-point__setting-description setting-description">Максимальное количество локаций которые можно добавить в избранное</span>
        </div>

        <div class="setting-point__action-button action-button">
          <vue-select
            :is-placeholder-need="false"
            :show-arrow-down="false"
            :data="locationsStore.selectData"
            :selected-item="locationsStore.selectCurrentItem"
          ></vue-select>
        </div>
      </div>

      <div class="main-content__setting-point setting-point">
        <div class="setting-point__description description">
          <span class="setting-point__setting-name setting-name">Темный режим</span>
          <span class="setting-point__setting-description setting-description">Выбрать темную или светлую тему приложения</span>
        </div>
        <div class="setting-point__action-button action-button">
          <label class="switch" for="dark-mode">
            <input
              type="checkbox"
              id="dark-mode"
              v-model="darkMode"
            />
            <div class="slider round"></div>
          </label>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import VueSelect from '../plugins/vue-select/VueSelect.vue'
import {useLocationsStore} from '../store/locations'
import {useWeatherStore} from '../store/weather'
import {computed, ref} from 'vue'
import {useForecastStore} from '../store/forecast'
import { setWeatherSetting} from '../utils/getfromstorage'
import {useTempsStore} from '../store/favoritelocationstemp'

const props = defineProps<{
  theme?: string
}>()

const locationsStore = useLocationsStore()
const weatherStore = useWeatherStore()
const forecastStore = useForecastStore()
const tempsStore = useTempsStore()
const header = computed(() => locationsStore.currentLocationName)
const isProMode = ref(false)
const unitsData = [
  {
    title: 'Metric',
    si: 'С° / км/ч / мм рт.ст.',
    value: 'metric'
  },
  {
    title: 'Imperial',
    si: 'F° / mph / hPa',
    value: 'imperial'
  },
  {
    title: 'Standard',
    si: 'K° / mph / hPa',
    value: 'standard'
  },
]

const units = computed({
  get() {
    return locationsStore.currentUnits
  },
  set(value) {
    locationsStore.changeUnits(value)
    weatherStore.weatherQueryDB(locationsStore.currentLocationCoords, value, true)
    forecastStore.getForecastFromApi(locationsStore.currentLocationCoords, value, true)
    tempsStore.getSingleTempAndIcon(locationsStore.getLocations, value)
  }
})

const darkMode = computed({
  get(): boolean {
    return props.theme === 'dark'
  },
  set(value: boolean) {
    const theme = value ? 'dark' : 'light'
    setWeatherSetting('weatherAppSettings', 'theme', theme)
    if (value) {
      document.documentElement.classList.remove('light')
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
    }
  }
})

</script>

<style lang="sass">
.main-content
  &__setting-point:first-child
    margin-top: 30px
    margin-bottom: 30px
  &__setting-point:not(:last-child)
    margin-bottom: 40px
.setting-point
  display: grid
  grid-template-columns: 5fr 1fr
  &__setting-description
    margin-top: 15px
    margin-right: 10px
.description
  display: flex
  flex-direction: column
  align-items: flex-start
.pro-mode
  position: absolute
  top: -6px
  margin-left: 5px
  padding: 2px 7px
  border-radius: 10px
  background-color: var(--accent-color)
  font-size: 10px
  color: #fff
  transition: var(--transition)
  &-wrap
    position: relative
.setting-name
  font-size: 16px
.setting-description
  color: var(--content-txt-color-gray)
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  margin-right: 7px
  transition: var(--transition)
  &--radio
    justify-content: flex-end
.mr17
  margin-top: 22px
  margin-right: 17px
  margin-left: 10px
.switch
  position: relative
  display: inline-block
  width: 34px
  height: 15px
.switch input
  display: none
.slider
  position: absolute
  top: 0
  right: 0
  bottom: 0
  left: 0
  height: 15px
  background-color: var(--switch-bgc)
  cursor: pointer
  transition: .4s, var(--transition)
.slider:before
  position: absolute
  content: ""
  left: -6px
  bottom: -2px
  height: 20px
  width: 20px
  background-color: var(--switch-before-bgc)
  box-shadow: var(--switch-before-shadow)
  transition: .4s, var(--transition)
input:checked + .slider
  background-color: var(--sinput-checked-bgc)
  transition: var(--transition)
input:checked + .slider:before
  background-color: var(--accent-color)
  transform: translateX(26px)
  transition: var(--transition)
.slider.round
  border-radius: 34px
.slider.round:before
  border-radius: 50%
.metric
  display: flex
  align-items: center
  margin-top: 11px
  cursor: pointer
label input[type="radio"]
  display: none
.design
  position: relative
  width: 8px
  height: 8px
  border-radius: 50%
  margin-bottom: 10px
  &:before
    content: ''
    position: absolute
    top: -7px
    right: -7px
    bottom: -7px
    left: -7px
    border: 3px solid var(--switch-bgc)
    border-radius: 50%
label input[type="radio"]:checked~.design
  background: var(--accent-color)
  transition: var(--transition)
label input[type="radio"]:checked~.design:before
  border: 3px solid var(--sinput-checked-bgc)
  transition: var(--transition)
</style>