import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { select } from './plugins/vue-select/select'
import './assets/css/reset.css'
import './assets/css/weather-icons.min.css'

window.addEventListener('resize', () => {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`)
})

const baseURL = () => {
  if (import.meta.env.DEV) return `http://localhost:3000`
  if (import.meta.env.PROD) return `https://...` // TODO add real url after finish app
}

axios.defaults.baseURL = baseURL()

const pinia = createPinia()
const app = createApp(App)

app
  .use(pinia)
  .use(VueAxios, axios)
  .use(select)
  .provide('axios', app.config.globalProperties.axios)
  .mount('#app')
