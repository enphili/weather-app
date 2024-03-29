<template>
  <nav class="weather-app__navbar navbar" :class="{'navbar--shadow': isShadow}">
    <button class="navbar__menu-button menu-button" @click.stop="isMenuActive = true"><span></span></button>
    <span class="navbar__location-name location-name">{{ isSettingActive ? 'Настройки' : title }}</span>

    <Suspense>
      <favorite-locations
        v-model:menuActive="isMenuActive"
      />
    </Suspense>
  </nav>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import FavoriteLocations from './FavoriteLocations.vue'
import {useLocationsStore} from '../store/locations'

defineProps<{
  isShadow?: boolean,
  isSettingActive: boolean,
}>()

const store = useLocationsStore()

const isMenuActive = ref<boolean>(false)
const title = computed(() => store.currentLocationName)
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
    top: 0
    right: 0
    bottom: 0
    left: 0
  &__add-location-btn
    position: absolute
    bottom: 16px
    right: 35px
  &--shadow
    background-color: var(--nav-gbc)
    box-shadow: var(--nav-shadow)
    transition: var(--transition)
  &__menu-button
    margin: 0
.menu-button
  display: inline-block
  align-items: center
  min-width: 56px
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
  font-size: 18px
  overflow: hidden
  white-space: nowrap
  text-overflow: ellipsis
.collapse-menu
  display: none
  height: 100%
  width: 100%
  background-color: var(--collapse-menu-bgc)
  transition: var(--transition)
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
  user-select: none
  background-color: var(--nav-gbc)
  transition: var(--transition)
.collapse-close, .add-location-btn
  display: flex
  justify-content: center
  align-items: center
  width: 56px
  height: 56px
  border: none
  -webkit-appearance: none
  -moz-appearance: none
  appearance: none
  cursor: pointer
.collapse-close
  text-decoration: none !important
  background-color: var(--nav-gbc)
  transition: var(--transition)
  & img
    height: 20px
    width: 20px
.add-location-btn
  border-radius: 50%
  padding: 0
  background-color: var(--accent-color)
  box-shadow: 0 6px 6px rgba(0,0,0,0.24)
  transition: var(--transition)
  & img
    width: 32px
    height: 32px
.single-location
  display: flex
  align-items: center
  padding: 15px 15px
  color: var(--fot-nav-btn-color)
  cursor: pointer
  transition: var(--transition)
  &__weather-icon
    width: 20px
    margin-left: 5px
    margin-right: 15px
  &__location-text
    margin-right: 10px
  &__mark-btn
    width: 16px
    margin-left: auto
.temperature
  min-width: 40px
  font-size: 18px
  font-weight: bold
.location-text
  font-size: 13px
  line-height: 14px
  overflow: hidden
  color: var(--font-collor-default)
  transition: var(--transition)
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