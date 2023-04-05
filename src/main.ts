import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { select } from './plugins/vue-select/select'
import Notifications from '@kyvg/vue3-notification'
import './assets/css/reset.css'
import './assets/css/weather-icons.min.css'
import './utils/modernizr-custom.js'

window.addEventListener('resize', () => {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`)
})

const baseURL = () => {
  if (import.meta.env.DEV) return `http://localhost:3000`
  if (import.meta.env.PROD) return 'https://weather.webfldev.ru'
}

axios.defaults.baseURL = baseURL()

const pinia = createPinia()
const app = createApp(App)

app
  .use(pinia)
  .use(VueAxios, axios)
  .use(select)
  .use(Notifications)
  .provide('axios', app.config.globalProperties.axios)
  .mount('#app')
