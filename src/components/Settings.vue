<template>
  <div class="weather-app__main-content main-content main-content--fill-white">

    <div class="date-block">
      <span class="today">Настройки приложения</span>
    </div>

    <div>
      <div class="main-content__setting-point setting-point">
        <div class="setting-point__description description">
          <span class="setting-point__setting-name setting-name">Уведомления</span>
          <span class="setting-point__setting-description setting-description">Текущее место - Москва</span>
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
          <span class="setting-point__setting-description setting-description">Метрическая(С&deg; / км/ч / мм)</span>
        </div>
        <div class="setting-point__action-button action-button">
          <label class="switch" for="measure">
            <input type="checkbox" id="measure" />
            <div class="slider round"></div>
          </label>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">

</script>

<style lang="sass">
.main-content
  &__setting-point:first-child
    margin-top: 24px
    margin-bottom: 30px
  &__setting-point:not(:last-child)
    margin-bottom: 30px
.setting-point
  display: grid
  grid-template-columns: 5fr 1fr
  &__setting-description
    margin-top: 10px
.description
  display: flex
  flex-direction: column
.setting-name
  font-size: 16px
.setting-description
  color: rgba(0,0,0,0.5)
.action-button
  display: flex
  align-items: center
  margin-right: 7px
  margin-left: auto
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
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.12), 0px 1px 1px rgba(0, 0, 0, 0.237602)
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
</style>