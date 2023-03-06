<template>
  <div class="weather-app__main-content main-content main-content--fill-white">

    <div class="date-block">
      <span class="today">Выберите предпочтения</span>
    </div>

    <div>
      <div class="main-content__setting-point setting-point">
        <div class="setting-point__description description">
          <span class="setting-point__setting-name setting-name">Уведомления</span>
          <span class="setting-point__setting-description setting-description">Текущее место - {{ header }}</span>
        </div>
        <div class="setting-point__action-button action-button">
          <label class="switch" for="notificatons">
            <input type="checkbox" id="notificatons" />
            <div class="slider round"></div>
          </label>
        </div>
      </div>

      <div class="main-content__setting-point setting-point">
        <div class="setting-point__description description">
          <span class="setting-point__setting-name setting-name">Ослеживание</span>
          <span class="setting-point__setting-description setting-description">Погода в текущем местоположении</span>
        </div>
        <div class="setting-point__action-button action-button">
          <label class="switch" for="followme">
            <input type="checkbox" id="followme" />
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
        {{ units }}
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
            :data="store.selectData"
            :selected-item="store.selectCurrentItem"
          ></vue-select>

        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import VueSelect from '../plugins/vue-select/VueSelect.vue'
import {useLocationsStore} from '../store/locations'
import {useWeatherStore} from '../store/weather'
import {computed } from 'vue'

const store = useLocationsStore()
const weatherStore = useWeatherStore()
const header = computed(() => store.currentLocationName)

const unitsData = [
  {
    title: 'Metric',
    si: 'С° / км/ч / мм',
    value: 'metric'
  },
  {
    title: 'Imperial',
    si: 'F° / mph / inHg',
    value: 'imperial'
  },
  {
    title: 'Standard',
    si: 'K° / mph / inHg',
    value: 'standard'
  },
]

const units = computed({
  get() {
    return store.currentUnits
  },
  set(val) {
    store.changeUnits(val)
    weatherStore.weatherQueryDB(store.currentLocationCoords, val, true)
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
.setting-name
  font-size: 16px
.setting-description
  color: rgba(0,0,0,0.5)
.action-button
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  margin-right: 7px
  margin-left: auto
  &--radio
    justify-content: flex-end
.mr17
  margin-right: 17px
.switch
  position: relative
  display: inline-block
  width: 34px
  height: 15px
.switch input
  display: none
.slider
  position: absolute
  inset: 0
  height: 15px
  background-color: rgba(34, 31, 31, 0.26)
  transition: .4s
  cursor: pointer
.slider:before
  position: absolute
  content: ""
  left: -6px
  bottom: -2px
  height: 20px
  width: 20px
  background-color: #F1F1F1
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.237602)
  transition: .4s
input:checked + .slider
  background-color: rgba(255, 87, 34, 0.5)
input:checked + .slider:before
  background-color: #FF5722
  transform: translateX(26px)
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
  width: 8px
  height: 8px
  border-radius: 50%
  outline-offset: 4px
  outline: 3px solid rgba(34, 31, 31, 0.26)
  margin-bottom: 10px
label input[type="radio"]:checked~.design
  outline-color: rgba(255, 87, 34, 0.5)
  background: #FF5722
</style>