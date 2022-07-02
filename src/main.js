import { createApp } from 'vue'
import App from './App.vue'

import 'plugins/setup'

import '@icon-park/vue-next/styles/index.css'
import IconPark from 'plugins/iconPark'

import router from "./routes/index";

const app = createApp(App);
app.use(router);
app.use(IconPark)
app.mount('#app')
