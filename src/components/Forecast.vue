<template>
  <div class="weather-app__main-content main-content main-content--fill-white">

    <div class="date-block">
      <span class="today">{{ 'Сегодня' }}</span>
      <span class="todays-date">{{ '20 января' }}</span>
    </div>

    <div class="main-content__hourly-forecast hourly-forecast">
      <div class="certain-hour"
           v-for="items in 5"
      >
        <span class="certain-hour__temp">{{ '24' }}&deg;</span>
        <i class="wi wi-night-sleet certain-hour__icon"></i>
        <span class="certain-hour__time">{{ '13:00' }}</span>
      </div>
    </div>

    <div>
      <div class="weekly-forecast">
        <span></span>
        <span></span>
        <span></span>
        <i class="wi wi-day-sunny text-align-right mr10"></i>
        <i class="wi wi-moon-alt-waxing-crescent-4 text-align-right mr10"></i>
      </div>
      <div class="weekly-forecast"
           v-for="item in 6"
      >
        <span class="weekly-forecast__day">{{ 'Завтра' }}</span>
        <i class="wi wi-night-sleet"></i>
        <span class="weekly-forecast__weather-conditions">{{ 'Солнечно' }}</span>
        <span class="day-temp">{{ '26' }}&deg;</span>
        <span class="night-temp">{{ '18' }}&deg;</span>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">

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
  grid-template-columns: repeat(5, 1fr)
.certain-hour
  display: flex
  flex-direction: column
  align-items: center
  &__icon
    margin-top: 5px
    margin-bottom: 15px
    font-size: 22px
  &__time
    font-size: 10px
    color: rgba(0,0,0,0.5)
.weekly-forecast
  display: grid
  grid-template-columns: 2fr 0.5fr 2fr 1fr 1fr
  align-items: center
  &:not(:last-child)
    margin-bottom: 25px
  &:first-child
    margin-bottom: 10px
  &__day
    font-size: 13px
    color: rgba(0,0,0,0.5)
  &__weather-conditions
    font-size: 13px
.text-align-right
  text-align: right
.mr10
  margin-right: 10px
.day-temp
  font-size: 20px
  text-align: right
.night-temp
  font-size: 20px
  text-align: right
  color: rgba(0,0,0,0.5)
</style>