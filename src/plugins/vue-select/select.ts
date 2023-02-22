import {App, Plugin} from 'vue'
import VueSelect from './VueSelect.vue'

export const select: Plugin = {
  install: (app: App) => {
    app.component('vue-select', VueSelect)
  }
}