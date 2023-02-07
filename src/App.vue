<template>
  <div class="weather-app" :style="{ backgroundImage: `url(${backgroundUrl})` }">
    <h1 class="weather-app__title">Приложение погоды</h1>
    <Navbar />
    <MainContent />
    <FooterNav />
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import FooterNav from './components/FooterNav.vue'
import MainContent from './components/MainContent.vue'
import backgroundUrl from './assets/img/clear_night.webp'


</script>

<style scoped lang="sass">
.weather-app
  display: flex
  justify-content: space-between
  flex-direction: column
  height: 100vh
  background-position: center
  background-size: cover
  font-family: "Roboto", sans-serif
  font-size: 14px
  color: #fff
.weather-app__title
  display: none
@media only screen and (min-width: 768px)
  .weather-app
    max-width: 480px
    margin: auto
</style>
