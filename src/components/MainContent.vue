<template>
  <div class="weather-app__main-content main-content">
    <div class="main-content__temperature-wrapper temperature-wrapper">
      <span class="main-content__today-temperature today-temperature">{{ '-13' }}&deg;</span>
      <i class="wi wi-night-sleet single-location__weather-icon weather-icon"></i>
    </div>
    <p class="main-content__weather-text weather-text">Снежная ночь</p>
    <div class="main-content__weather-parameters weather-parameters">
      <div class="weather-parameters__precipitation-chance precipitation-chance"></div>
      <div class="weather-parameters__humidity humidity"></div>
      <div class="weather-parameters__windiness windiness"></div>
      <p class="weather-parameters__parameters-text parameters-text">Generally snowy with storms.</p>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="sass">
.main-content
  display: flex
  flex-direction: column
  justify-content: flex-start
  flex: 1 0 auto
  &__temperature-wrapper
    margin-top: 10vh
  &__weather-text
    margin-top: 8px
  &__weather-parameters
    margin-top: auto
    margin-bottom: 7%
.temperature-wrapper
  display: flex
  justify-content: center
  align-items: center
.today-temperature
  font-weight: 300
  font-size: 96px
  margin-right: 10px
.weather-icon
  font-size: 62px
.weather-text
  font-size: 20px
  text-align: center
.weather-parameters
  display: grid
  grid-template-columns: repeat(3, 1fr)
  grid-template-rows: 2fr 1fr
  &__parameters-text
    grid-column-start: 1
    grid-column-end: 4
    margin: 0 auto
.parameters-text
  display: inline-flex
  font-size: 16px
</style>