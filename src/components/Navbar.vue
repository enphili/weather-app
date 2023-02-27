<template>
  <nav class="weather-app__navbar navbar" :class="{'navbar--shadow': isShadow}">
    <button class="navbar__menu-button menu-button" @click.stop="isMenuActive = !isMenuActive"><span></span></button>
    <span class="navbar__location-name location-name">{{ header }}</span>
    <div :class="[{'collapse-menu--active': isMenuActive}, 'navbar__collapse-menu', 'collapse-menu']">
      <div class="navbar__collapse-header collapse-header">
        <span class="navbar__collapse-title collapse-title">Избранные локации</span>
        <button class="navbar__collapse-close collapse-close" @click.stop="isMenuActive = !isMenuActive">&#10006;</button>
      </div>
      <div class="navbar__favorite-locations favorite-locations">

        <div
          class="favorite-locations__single-location single-location"
          v-for="(loc, index) in locations"
          :key="loc.name"
        >
          <span class="single-location__temperature temperature">{{ '+26' }}&deg;</span>
          <i class="wi wi-night-sleet single-location__weather-icon weather-icon"></i>
          <span class="single-location__location-text location-text">{{ loc.name }}</span>
          <button
            :class="[loc.current ? 'mark-btn--location' : 'mark-btn--remove', 'single-location__mark-btn', 'mark-btn']"
            @click="store.removeOneLocation(loc.current, index)"
          ></button>
        </div>

      </div>
      <div class="empty-block" @click.stop="isMenuActive = !isMenuActive"></div>

      <div class="navbar__collapse-menu collapse-menu mapping" :class="{'collapse-menu--active': showMap}">
        <div class="navbar__collapse-header collapse-header">
          <span class="navbar__collapse-title collapse-title">Выбор местоположения</span>
          <button class="navbar__collapse-close collapse-close" @click="addLocation">&#10006;</button>
        </div>
        <div id="map" ref="map" class="yandex-container"></div>
      </div>

      <button class="navbar__add-location-btn add-location-btn" @click="showMap = true">+</button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { loadYmap } from 'vue-yandex-maps'
import { onMounted, ref} from 'vue'
import {Placemark} from "yandex-maps"
import {useLocationsStore} from '../store/Locations'

// пропсы
const props = defineProps<{
  isShadow?: boolean,
  header: string,
}>()

// переменные
const store = useLocationsStore()
const map = ref<HTMLElement | null>(null)
let isMenuActive = ref<boolean>(false)
let showMap = ref<boolean>(false)
const mapSetting: {
  apiKey: string
  lang: string
  debug?: boolean
  version?: string
} = {
  apiKey: import.meta.env.VITE_YANDEX_API_KEY,
  lang: 'ru_RU',
  debug: false,
  version: '2.1'
}
const isChoose = ref<boolean>(false)
const coordinates = ref<[number, number]>([56.838441, 60.603436]) // начальные координаты
const iconCaption = ref<string>('')
const locations = store.getLocation

// методы
const addLocation = (): void => {
  showMap.value = !showMap.value
  if (!isChoose.value) return
  store.addNewLocation(iconCaption.value, coordinates.value)
}

// хуки
onMounted(async () => {
  await loadYmap(mapSetting)
  await ymaps.ready(() => {
    if (!map.value) return
    let myPlacemark: Placemark

    const myMap = new ymaps.Map(map.value, {
      center: coordinates.value,
      controls: ['zoomControl'],
      zoom: 10
    },
      {
      yandexMapDisablePoiInteractivity: true,
      yandexMapAutoSwitch: false,
      suppressObsoleteBrowserNotifier: true,
      suppressMapOpenBlock: true,
    })

    const createPlacemark = (coords: [number, number]) => {
      return new ymaps.Placemark(coords, {
        iconCaption: 'поиск...'
      }, {
        preset: 'islands#violetDotIconWithCaption',
        draggable: true
      })
    }

    const getAddress = (coords: [number, number]) => {
      myPlacemark.properties.set('iconCaption', 'поиск...')
      ymaps.geocode(coords).then(function (res) {
        const firstGeoObject = res.geoObjects.get(0)
        iconCaption.value = [
          firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas()
        ].filter(Boolean).join(', ')
        myPlacemark.properties.set('iconCaption', iconCaption.value)
      })
    }

    const searchControl = new ymaps.control.SearchControl({
      options: {
        provider: "yandex#map",
        noPlacemark: true
      }
    })

    myMap.events.add('click', function (e) {
      coordinates.value = e.get('coords')
      if (myPlacemark) {
        myPlacemark.geometry?.setCoordinates(coordinates.value)
      }
      else {
        myPlacemark = createPlacemark(coordinates.value)
        myMap.geoObjects.add(myPlacemark)
        myPlacemark.events.add('dragend', function () {
          getAddress(myPlacemark.geometry?.getCoordinates() as [number, number])
        })
      }
      getAddress(coordinates.value)
      isChoose.value = true
    })

    myMap.controls.add(searchControl)
  })

})

</script>

<style lang="sass">
.weather-app
  &__navbar
    position: fixed
    z-index: 10
.navbar
  display: flex
  align-items: center
  height: 56px
  width: 100%
  &__location-name
    margin-left: 12px
  &__collapse-menu
    position: fixed
    inset: 0
  &__add-location-btn
    position: absolute
    bottom: 16px
    right: 35px
  &--shadow
    background-color: #673AB7
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.12), 0 4px 4px rgba(0, 0, 0, 0.24)
.menu-button
  display: inline-block
  align-items: center
  width: 56px
  height: 56px
  padding: 20px 20px
  border: none
  background-color: transparent
  cursor: pointer
  & > span, & > span::before, & > span::after
    position: relative
    display: block
    width: 100%
    height: 2px
    background-color: #f1f5f6
  & > span::before
    content: ''
    top: -5px
  & > span::after
    content: ''
    top: 3px
.favorite-locations
  overflow-y: auto
.location-name
  font-size: 20px
.collapse-menu
  display: none
  height: 100%
  width: 100%
  background-color: #f1f5f6
  &--active
    display: flex
    flex-direction: column
.collapse-header
  display: flex
  justify-content: space-between
.collapse-title
  display: block
  width: 100%
  line-height: 56px
  padding-left: 16px
  font-size: 20px
  font-weight: bold
  color: rgba(225,225,225,0.95)
  background-color: #673AB7
.collapse-close, .add-location-btn
  display: block
  width: 56px
  height: 56px
  border: none
  cursor: pointer
.collapse-close
  font-size: 20px
  color: rgba(225,225,225,0.95)
  background-color: #673AB7
.add-location-btn
  border-radius: 50%
  padding: 0
  line-height: 56px
  font-size: 32px
  color: #fff
  background-color: #FF5722
  box-shadow: 0 6px 6px rgba(0,0,0,0.24)
.single-location
  display: flex
  align-items: center
  padding: 15px 15px
  color: rgba(0,0,0,0.75)
  &__weather-icon
    margin-left: 0
    margin-right: 15px
  &__location-text
    margin-right: 10px
  &__mark-btn
    margin-left: auto
.temperature
  width: 40px
  font-size: 18px
  font-weight: bold
.location-text
  font-size: 13px
  line-height: 14px
  overflow: hidden
  color: rgba(0,0,0,1)
.mark-btn
  min-height: 16px
  min-width: 16px
  padding: 0
  border: none
  background-color: transparent
  background-repeat: no-repeat
  background-position: center
  cursor: pointer
  &--remove
    background-image: url("../assets/img/close16.svg")
    background-size: 145%
  &--location
    background-image: url("../assets/img/localization.svg")
    background-size: contain
.weather-icon
  font-size: 18px
.empty-block
  flex: 1 0 auto
.mapping
  z-index: 9
.yandex-container
  height: 100%
@media only screen and (min-width: 768px)
  .navbar
    max-width: 480px
    &__collapse-menu
      max-width: 480px
      margin: auto
</style>