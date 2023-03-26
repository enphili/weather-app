<template>
  <transition>
    <loader v-if="isLoader"></loader>
  </transition>

  <notifications position="top center" width="222px" classes="weather-notif" />

  <div :class="[{'collapse-menu--active': menuActive}, 'navbar__collapse-menu', 'collapse-menu']">

    <div class="navbar__collapse-header collapse-header">
      <span class="navbar__collapse-title collapse-title">Избранные локации</span>
      <button class="navbar__collapse-close collapse-close" @click.stop="$emit('update:menuActive', false)">&#10006;</button>
    </div>

    <div class="navbar__favorite-locations favorite-locations">
      <div
        class="favorite-locations__single-location single-location"
        v-for="(loc, index) in locations"
        :key="loc.name"
        @click="chooseLocation($event, index, loc.coords)"
      >
        <span class="single-location__temperature temperature">{{ Math.round(temps[index]?.temp) }}&deg;</span>
        <i class="wi single-location__weather-icon weather-icon" :class="temps[index]?.icon ? temps[index]?.icon : 'wi-na'"></i>
        <span class="single-location__location-text location-text">{{ loc.name }}</span>
        <button
          :class="[loc.current ? 'mark-btn--location' : 'mark-btn--remove', 'single-location__mark-btn', 'mark-btn']"
          @click="delLocation(loc.current, index)"
        ></button>
      </div>
    </div>

    <div class="empty-block" @click.stop="$emit('update:menuActive', false)"></div>

    <div class="navbar__collapse-menu collapse-menu mapping" :class="{'collapse-menu--active': showMap}">
      <div class="navbar__collapse-header collapse-header">
        <span class="navbar__collapse-title collapse-title">Выбор местоположения</span>
        <button class="navbar__collapse-close collapse-close" @click="addLocation">&#10006;</button>
      </div>
      <div id="map" ref="map" class="yandex-container"></div>
    </div>

    <button class="navbar__add-location-btn add-location-btn" @click="showMap = true">+</button>
  </div>
</template>

<script setup lang="ts">
import Loader from './Loader.vue'
import {computed, onMounted, ref} from 'vue'
import {useLocationsStore} from '../store/locations'
import {useWeatherStore} from '../store/weather'
import {useYandexWeatherStore} from '../store/yanweather'
import { loadYmap } from 'vue-yandex-maps'
import {Placemark} from 'yandex-maps'
import { useNotification } from '@kyvg/vue3-notification'
import {useTempsStore} from '../store/favoritelocationstemp'
import {useForecastStore} from '../store/forecast'

defineProps(['menuActive'])
defineEmits(['update:menuActive'])

const isLoader = ref<boolean>(false)
const store = useLocationsStore()
const tempsStore = useTempsStore()
const locations = store.getLocations
const showMap = ref<boolean>(false)
const units = computed(() => store.currentUnits)
const temps = computed(() => tempsStore.getTemps)
const map = ref<HTMLElement | null>(null)
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
const coordinates = ref<[number, number]>([56.838441, 60.603436]) // начальные координаты
const iconCaption = ref<string>('')
const isChoose = ref<boolean>(false)
const { notify } = useNotification()

const chooseLocation = async (e: MouseEvent, idx: number, coords: [number, number]) => {
  if (e.target instanceof HTMLElement) {
    if (e.target.tagName === 'BUTTON') return
  }
  store.changeCurrentLocation(idx)
  await useWeatherStore().weatherQueryDB(coords, store.currentUnits, true)
  await useYandexWeatherStore().yanWeatherQuery(coords, true)
  await useForecastStore().getForecastFromApi(coords, units.value, true)
  tempsStore.moveTempToFirst(idx)
}

const addLocation = async (): Promise<void> => {
  if (!isChoose.value) {
    notify({
      title: 'Внимание!',
      text: 'Для выбора местоположения необходимо кликнуть на карту',
      ignoreDuplicates: true,
      duration: 1000
    })
    return
  }
  showMap.value = !showMap.value
  store.addNewLocation(iconCaption.value, coordinates.value)
  isLoader.value = true
  await tempsStore.getSingleTempAndIcon(locations, units.value)
  await useForecastStore().getForecastFromApi(coordinates.value, units.value, true)
  await useWeatherStore().weatherQueryDB(coordinates.value, units.value,true)
  isLoader.value = false
}

const delLocation = (isCurren: boolean, idx: number) => {
  store.removeOneLocation(isCurren, idx)
  tempsStore.removeTemp(idx)
}

onMounted(async () => {
  isLoader.value = true
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
  await tempsStore.getSingleTempAndIcon(locations, units.value)
  isLoader.value = false
})

</script>

<style lang="sass">
.weather-notif
  margin: 0 5px 5px
  padding: 10px
  font-size: 12px
  background-color: #12121FFF
  color: #fff
  border-left: 5px solid var(--accent-color)
  .notification-title
    font-size: 13px
    margin-bottom: 10px
  .notification-content
    line-height: 16px
</style>