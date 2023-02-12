<template>
  <div class="weather-app__main-content main-content">
    <div class="main-content__present-weather present-weather">
      <div class="main-content__temperature-wrapper temperature-wrapper">
        <span class="main-content__today-temperature today-temperature">{{ '-13' }}&deg;</span>
        <i class="wi wi-night-sleet main-weather-icon"></i>
      </div>
      <p class="main-content__weather-text weather-text">Снежная ночь</p>
    </div>
    <div class="main-content__weather-parameters weather-parameters">
      <div class="weather-parameters__extended-data extended-data">
        <i class="wi wi-night-sleet weather-parameters__extended-icon extended-icon"></i>
        {{ '73' }}%</div>
      <div class="weather-parameters__extended-data extended-data">
        <i class="wi wi-humidity weather-parameters__extended-icon extended-icon"></i>
        {{ '59' }}%</div>
      <div class="weather-parameters__extended-data extended-data">
        <i class="wi wi-strong-wind weather-parameters__extended-icon extended-icon"></i>
        {{ '15' }}м/с</div>
      <p class="weather-parameters__parameters-text parameters-text">Generally snowy with storms.</p>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="sass">
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
  font-size: 96px
  margin-right: 10px
.main-weather-icon
  font-size: 62px
.weather-text
  font-size: 20px
  text-align: center
.weather-parameters
  display: grid
  grid-template-columns: repeat(3, 1fr)
  grid-template-rows: 2fr 1fr
  grid-row-gap: 15px
  &__parameters-text
    grid-column: 1/ -1
    margin: 0 auto
.extended-data
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  gap: 13px
  font-size: 22px
.extended-icon
  font-size: 24px
.parameters-text
  font-size: 16px
  height: 40px
</style>