import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import FlashMessage from '@smartweb/vue-flash-message';


const app = createApp(App)

app.use(router)

app.use(FlashMessage);

app.mount('#app')
