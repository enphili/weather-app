<script setup lang="ts">
</script>

<template>
  <div class="weather-app">
    <h1 class="weather-app__title">Приложение погоды</h1>
    <nav class="weather-app__navbar navbar">
      <button class="navbar__menu-button menu-button"></button>
      <span class="navbar__location-name location-name"></span>
      <div class="navbar__collapse-menu collapse-menu">
        <span class="navbar__collapse-title collapse-title"></span>
        <div class="navbar__favorite-locations favorite-locations">
          <div class="favorite-locations__single-location single-location">
            <span class="single-location__temperature temperature"></span>
            <img src="" alt="" class="single-location__weather-icon weather-icon">
            <button class="single-location__remove-btn remove-btn"></button>
          </div>
        </div>
        <button class="navbar__add-location-btn add-location-btn">+</button>
      </div>
    </nav>
    <div class="weather-app__main-wrapper main-wrapper">
      <span class="main-wrapper__today-temperature today-temperature"></span>
      <canvas id="icon1" width="69" height="69" class="main-wrapper__today-weather-icon today-weather-icon"></canvas>
      <p class="main-wrapper__weather-text weather-text"></p>
    </div>
    <div class="weather-app__weather-parameters weather-parameters">
      <div class="weather-parameters__precipitation-chance precipitation-chance"></div>
      <div class="weather-parameters__humidity humidity"></div>
      <div class="weather-parameters__windiness windiness"></div>
      <p class="weather-parameters__text parameters-text">Generally snowy with storms.</p>
    </div>
    <div class="weather-app__footer footer">
      <button class="footer__weather weather">Погода</button>
      <button class="footer__forecast forecast">Прогноз</button>
      <button class="footer__settings settings">Настройки</button>
    </div>
  </div>
</template>

<style scoped lang="sass">
</style>
