import { createApp } from 'vue'
import './assets/css/reset.css'
import './assets/css/weather-icons.min.css'
import App from './App.vue'

window.addEventListener('resize', () => {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`)
})


createApp(App)
  .mount('#app')
