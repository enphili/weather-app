<template>
  <div
    class="weather-app"
    :class="image"
  >
    <h1 class="weather-app__title">Приложение погоды</h1>

      <Navbar
        :is-shadow="currentTab !== 0"
        :isSettingActive="isSettingActive"
      ></Navbar>

    <KeepAlive>
      <component
        :is="menuItems[currentTab].component"
        :theme="theme"
      ></component>
    </KeepAlive>

    <div class="weather-app__footer-nav footer-nav" :class="{'footer-nav--shadow': currentTab !== 0}">
      <FooterTab
        v-for="(menu, idx) in menuItems"
        :key="menu.title"
        :title="menu.title"
        :is-active="currentTab === idx"
        @click="changeTab(idx)"
      >
        <div v-html="menu.svg"></div>
      </FooterTab>
    </div>

  </div>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import FooterTab from './components/FooterTab.vue'
import Weather from './components/Weather.vue'
import Forecast from './components/Forecast.vue'
import Settings from './components/Settings.vue'
import { onMounted, ref} from 'vue'
import type { Component } from 'vue'
import {getTheme} from './utils/getfromstorage'
import {getMediaPreference} from './utils/getMediaPreference'

const currentTab = ref<number>(0)
const menuItems: {component: Component, title: string, svg: string}[] = [
  {
    component: Weather,
    title: 'Погода',
    svg: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n' +
    '          <path d="M4.11427 12C4.11427 11.4322 3.65349 10.9714 3.08569 10.9714H1.02859C0.460784 10.9714 0 11.4322 0 12C0 12.5678 0.460784 13.0286 1.02859 13.0286H3.08573C3.65349 13.0286 4.11427 12.5678 4.11427 12ZM5.14286 17.8286C4.85898 17.8286 4.60184 17.9438 4.41529 18.1296L3.04388 19.5011C2.85804 19.6876 2.74286 19.9447 2.74286 20.2286C2.74286 20.7964 3.20298 21.2572 3.77145 21.2572C4.05533 21.2572 4.31247 21.142 4.49831 20.9555L5.86976 19.584C6.05627 19.3982 6.17149 19.1411 6.17149 18.8572C6.17145 18.2894 5.71133 17.8286 5.14286 17.8286ZM12 4.11427C12.5685 4.11427 13.0286 3.65349 13.0286 3.08569V1.02859C13.0286 0.460784 12.5685 0 12 0C11.4315 0 10.9714 0.460784 10.9714 1.02859V3.08573C10.9714 3.65349 11.4315 4.11427 12 4.11427ZM18.8571 6.17145C19.141 6.17145 19.3982 6.05624 19.584 5.87043L20.9554 4.49898C21.1419 4.31247 21.2571 4.05533 21.2571 3.77145C21.2571 3.20369 20.797 2.74286 20.2285 2.74286C19.9447 2.74286 19.6875 2.85808 19.501 3.04459L18.1295 4.416C17.9437 4.60184 17.8285 4.85898 17.8285 5.14286C17.8286 5.71063 18.2887 6.17145 18.8571 6.17145ZM4.41529 5.87039C4.6018 6.0562 4.85894 6.17141 5.14286 6.17141C5.71063 6.17141 6.17145 5.71063 6.17145 5.14282C6.17145 4.85894 6.05624 4.6018 5.87043 4.41529L4.49898 3.04388C4.31247 2.85804 4.05533 2.74286 3.77145 2.74286C3.20369 2.74286 2.74286 3.20365 2.74286 3.77145C2.74286 4.05533 2.85808 4.31247 3.04388 4.49831L4.41529 5.87039ZM22.9714 10.9714H20.9143C20.3465 10.9714 19.8857 11.4322 19.8857 12C19.8857 12.5678 20.3465 13.0286 20.9143 13.0286H22.9714C23.5392 13.0286 24 12.5678 24 12C24 11.4322 23.5392 10.9714 22.9714 10.9714ZM19.5847 18.1296C19.3982 17.9438 19.1411 17.8286 18.8571 17.8286C18.2893 17.8286 17.8285 18.2894 17.8285 18.8572C17.8285 19.1411 17.9438 19.3982 18.1296 19.584L19.501 20.9555C19.6875 21.142 19.9447 21.2571 20.2285 21.2571C20.7964 21.2571 21.2571 20.7964 21.2571 20.2285C21.2571 19.9447 21.1419 19.6875 20.9561 19.501L19.5847 18.1296ZM12 19.8857C11.4315 19.8857 10.9714 20.3465 10.9714 20.9143V22.9715C10.9714 23.5392 11.4315 24 12 24C12.5685 24 13.0286 23.5392 13.0286 22.9714V20.9143C13.0286 20.3465 12.5685 19.8857 12 19.8857ZM12 4.8C8.02973 4.8 4.8 8.02973 4.8 12C4.8 15.9703 8.02973 19.2 12 19.2C15.9703 19.2 19.2 15.9703 19.2 12C19.2 8.02973 15.9703 4.8 12 4.8ZM12 17.1429C9.16388 17.1429 6.85714 14.8362 6.85714 12C6.85714 9.16388 9.16388 6.85714 12 6.85714C14.8361 6.85714 17.1429 9.16388 17.1429 12C17.1429 14.8361 14.8361 17.1429 12 17.1429Z"/>\n' +
    '        </svg>'
  },
  {
    component: Forecast,
    title: 'Прогноз',
    svg: '<svg width="24" height="18" viewBox="0 0 24 18" xmlns="http://www.w3.org/2000/svg">\n' +
    '          <path d="M23.9089 7.1591L21.0854 0.806161C20.9209 0.435572 20.5489 0.176514 20.1176 0.176514C19.6136 0.176514 19.1922 0.528043 19.0849 0.999572L16.296 13.272L12.6268 4.3624C12.468 3.97698 12.0889 3.70593 11.6471 3.70593C11.2101 3.70593 10.8353 3.97063 10.6736 4.34828L7.33765 12.1313L5.53553 8.5271C5.36259 8.17981 5.00329 7.94122 4.58824 7.94122C4.26141 7.94122 3.96847 8.08945 3.77506 8.3231L0.245647 12.5577C0.0924706 12.7419 0 12.9777 0 13.2353C0 13.8198 0.474353 14.2942 1.05882 14.2942C1.38565 14.2942 1.67859 14.1459 1.872 13.913L4.36447 10.9221L6.46377 15.12C6.63741 15.4673 6.99671 15.7059 7.41177 15.7059C7.84871 15.7059 8.22353 15.4412 8.38518 15.0636L11.6273 7.49863L15.6092 17.1678C15.7673 17.5525 16.1464 17.8236 16.5882 17.8236C17.0922 17.8236 17.5129 17.4713 17.6209 17.0005L20.4445 4.57698L21.9734 8.01745C22.1379 8.38804 22.5099 8.6471 22.9412 8.6471C23.5256 8.6471 24 8.17275 24 7.58828C24 7.43581 23.9675 7.2904 23.9089 7.1591Z"/>\n' +
    '        </svg>'
  },
  {
    component: Settings,
    title: 'Настройки',
    svg: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n' +
    '          <path d="M22.5 10.5H21.6225C21.3795 8.92875 20.7645 7.48427 19.8652 6.25498L20.5597 5.56051C20.8537 5.26725 21 4.884 21 4.5C21 4.116 20.8538 3.73275 20.5597 3.43949C20.2672 3.14624 19.8832 3 19.4992 3C19.1152 3 18.732 3.14624 18.4387 3.43949L17.7442 4.134C16.5157 3.23475 15.0712 2.62051 13.5 2.37749V1.5C13.5 0.672 12.8287 0 12 0C11.172 0 10.5 0.672 10.5 1.5V2.37749C8.92875 2.62051 7.48424 3.23624 6.25498 4.13475L5.55973 3.43949C5.26725 3.14549 4.88326 2.99926 4.49847 2.99926C4.11522 2.99926 3.73196 3.14549 3.43871 3.43949C3.14545 3.73275 2.99922 4.116 2.99922 4.5C2.99922 4.884 3.14545 5.26725 3.43871 5.56051L4.13396 6.25651C3.23471 7.48427 2.62047 8.92875 2.37745 10.5H1.5C0.672 10.5 0 11.172 0 12C0 12.828 0.672 13.5 1.5 13.5H2.37749C2.62047 15.0712 3.23549 16.5157 4.13475 17.745L3.43949 18.4395C3.14549 18.7328 2.99925 19.1175 3 19.503C3.00075 19.887 3.14702 20.2695 3.43949 20.5605C3.73275 20.8545 4.11675 21 4.5 21C4.88475 21 5.268 20.8538 5.56051 20.5605L6.25576 19.866C7.48502 20.7653 8.92879 21.3795 10.5 21.6225V22.5C10.5 23.3287 11.1713 24 12 24C12.8288 24 13.5 23.3287 13.5 22.5V21.6225C15.0713 21.3795 16.5158 20.7645 17.7443 19.8652L18.4388 20.5597C18.7328 20.8537 19.1168 21 19.5016 20.9992C19.8856 20.9985 20.2681 20.8522 20.5598 20.5597C20.8538 20.2665 20.9993 19.8825 20.9993 19.4992C20.9993 19.1145 20.8531 18.7312 20.5598 18.4387L19.8653 17.745C20.7646 16.5157 21.3796 15.0712 21.6226 13.5H22.5001C23.3281 13.5 24.0001 12.828 24.0001 12C24.0001 11.172 23.3287 10.5 22.5 10.5ZM12 19.5C7.86451 19.5 4.5 16.1355 4.5 12C4.5 7.86451 7.86451 4.5 12 4.5C16.1355 4.5 19.5 7.86451 19.5 12C19.5 16.1355 16.1355 19.5 12 19.5ZM12 7.5C9.51525 7.5 7.5 9.51451 7.5 12C7.5 14.4855 9.51451 16.5 12 16.5C14.4855 16.5 16.5 14.4855 16.5 12C16.5 9.51451 14.4855 7.5 12 7.5ZM12 14.25C10.7595 14.25 9.75 13.2405 9.75 12C9.75 10.7595 10.7595 9.75 12 9.75C13.2405 9.75 14.25 10.7595 14.25 12C14.25 13.2405 13.2405 14.25 12 14.25Z"/>\n' +
    '        </svg>'
  }
]
const isSettingActive = ref<boolean>(false)
const theme = ref<string>('')
const image = ref<string>('')

const timeNow = new Date().getHours()

switch (true) {
  case timeNow >= 6 && timeNow < 11:
    image.value = 'wa-bg-morning'
    break
  case timeNow >= 11 && timeNow < 18:
    image.value = 'wa-bg-day'
    break
  case timeNow >= 18 && timeNow <= 23:
    image.value = 'wa-bg-evening'
    break
  case timeNow >= 0 && timeNow < 6:
    image.value = 'wa-bg-night'
    break
}

const changeTab = (idx: number): void => {
  currentTab.value = idx
  isSettingActive.value = idx === menuItems.length - 1
}

onMounted(async (): Promise<void> => {
  theme.value = getTheme('weatherAppSettings') || getMediaPreference()
  document.documentElement.classList.add(theme.value)
})
</script>

<style lang="sass">
.weather-app
  display: flex
  justify-content: space-between
  flex-direction: column
  min-height: 100vh
  min-height: var(--vh)
  font-family: "Roboto", sans-serif
  font-size: 14px
  color: #fff
  &:before
    content: ''
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    background-position: center
    background-size: cover
    background-color: #383838
    background-attachment: fixed
    z-index: -1
.weather-app__title
  display: none
.no-webp
  & .wa-bg-morning:before
    background-image: url("/morning.jpg")
  & .wa-bg-day:before
    background-image: url("/day.jpg")
  & .wa-bg-evening:before
    background-image: url("/evening.jpg")
  & .wa-bg-night:before
    background-image: url("/night.jpg")
.webp
  & .wa-bg-morning:before
    background-image: url("/morning.webp")
  & .wa-bg-day:before
    background-image: url("/day.webp")
  & .wa-bg-evening:before
    background-image: url("/evening.webp")
  & .wa-bg-night:before
    background-image: url("/night.webp")
.footer-nav
  position: fixed
  bottom: 0
  display: grid
  grid-template-columns: repeat(3, 1fr)
  width: 100%
  &--shadow
    box-shadow: var(--nav-shadow)
.vue-notification
  margin: 0 5px 5px
  padding: 10px
  font-size: 12px
  color: #ffffff
  background: #12121FFF !important
  border-left: 5px solid var(--accent-color) !important
  .notification-title
    font-size: 13px
    margin-bottom: 10px
  .notification-content
    line-height: 16px
@media only screen and (min-width: 768px)
  .weather-app, .weather-app:before, .main-content--fill-white:before
    max-width: 480px
    margin: auto
  .footer-nav
    max-width: 480px
</style>

