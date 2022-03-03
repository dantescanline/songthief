import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'

import store from './store.js'

const app = createApp(App)
app.use(store)
app.use(router)

app.mount('#app')

