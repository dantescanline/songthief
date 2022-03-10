import { createRouter, createWebHashHistory } from 'vue-router'

import VideoGrid from './components/VideoGrid.vue'
import NewSong from './components/NewSong.vue'
import Account from './components/Account.vue'
import About from './components/About.vue'
import Log from './components/Log.vue'

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: VideoGrid, name: 'home' },
  { path: '/new', component: NewSong, name: 'new' },
  { path: '/account', component: Account, name: 'account' },
  { path: '/about', component: About, name: 'about' },
  { path: '/log', component: Log, name: 'log' }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
export default createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

