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
        <div class="favorite-locations__single-location single-location">
          <span class="single-location__temperature temperature">{{ '+26' }}&deg;</span>
          <i class="wi wi-night-sleet single-location__weather-icon weather-icon"></i>
          <span class="single-location__location-text location-text">Novosibirsk</span>
          <button class="single-location__mark-btn mark-btn mark-btn--location"></button>
        </div>
        <div class="favorite-locations__single-location single-location">
          <span class="single-location__temperature temperature">{{ '-16' }}&deg;</span>
          <i class="wi wi-night-sleet single-location__weather-icon weather-icon"></i>
          <span class="single-location__location-text location-text">Екатеринбург</span>
          <button class="single-location__mark-btn mark-btn mark-btn--remove">&#10006;</button>
        </div>
      </div>
      <div class="empty-block" @click.stop="isMenuActive = !isMenuActive"></div>
      <button class="navbar__add-location-btn add-location-btn">+</button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import {Ref, ref} from 'vue'

let isMenuActive: Ref<boolean> = ref(false)

const props = defineProps<{
  isShadow?: boolean,
  header: string
}>()

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
    right: 16px
  &--shadow
    background-color: #673AB7
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.12), 0px 4px 4px rgba(0, 0, 0, 0.24)
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
  padding: 10px 15px
  color: rgba(0,0,0,0.75)
  &__weather-icon
    margin-left: 0
    margin-right: 15px
  &__location-text
    margin-top: 3px
  &__mark-btn
    margin-left: auto
.temperature
  width: 40px
  font-size: 18px
  font-weight: bold
.location-text
  max-width: 140px
  line-height: 20px
  overflow: hidden
  color: rgba(0,0,0,1)
.mark-btn
  height: 16px
  width: 16px
  padding: 0
  border: none
  cursor: pointer
  &--remove
    border-radius: 50%
    line-height: 10px
    background-color: #f1f5f6
    color: rgba(0,0,0,0.75)
  &--location
    background-color: transparent
    background-image: url("../assets/img/localization.svg")
    background-repeat: no-repeat
    background-size: contain
    background-position: center
.weather-icon
  font-size: 18px
.empty-block
  flex: 1 0 auto
@media only screen and (min-width: 768px)
  .navbar
    max-width: 480px
    &__collapse-menu
      max-width: 480px
      margin: auto
</style>