import './assets/globals.css'
import 'iconify-icon'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.config.errorHandler = (err) => {
  console.error(err)
}

app.mount('#app')
