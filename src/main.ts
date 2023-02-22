import { createApp } from 'vue'
import './assets/css/reset.css'
import './assets/css/weather-icons.min.css'
import App from './App.vue'
import {select} from './plugins/vue-select/select'
import {SelectOptions} from './plugins/vue-select/types'

window.addEventListener('resize', () => {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`)
})

const selectOptions: SelectOptions = {}

createApp(App)
  .use(select, selectOptions)
  .mount('#app')
