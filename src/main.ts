import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { select } from './plugins/vue-select/select'
import './assets/css/reset.css'
import './assets/css/weather-icons.min.css'

window.addEventListener('resize', () => {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`)
})

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(select)
  .mount('#app')
