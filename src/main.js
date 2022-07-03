import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.css'
import 'plugins/setup'

import router from "./routes/index";

const app = createApp(App);
app.use(router);
app.mount('#app')
