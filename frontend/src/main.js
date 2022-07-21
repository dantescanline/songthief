import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'

import store from './store.js'

const app = createApp(App)
app.use(store)
app.use(router)

app.mount('#app')

// animate the page title
let title = ''
let specials = ['*', '&', '#', '@']
function updateTitleBar() {
  if (Math.random() > 0.2) {
    if (Math.random() > 0.5) {
      title = '~' + title
    } else {
      title = '-' + title
    }
  } else {
    const character = specials[Math.floor(Math.random() * specials.length)]
    title = character + title
  }
  title = title.slice(0, 10)

  document.title = `Songthief ${title}`
}

setInterval(updateTitleBar, 550)