import { createStore } from 'vuex'
import axios from './axios.js'

const HISTORY = 'videoHistory'
// Create a new store instance.
export default createStore({
  state() {
    return {
      currentVideoID: 0,
      editingSong: null,
      date: 'asc',
      history: [],
      songs: [],
      playlists: [],
      account: null,
      log: [],
      logHasNotification: false
    }
  },
  getters: {
    currentVideo(state) {
      if (state.currentVideoID) {
        for (const video of state.songs) {
          if (video.id === state.currentVideoID) {
            return video
          }
        }
      }
      return null
    },
    getSongByID(state, videoID) {
      return () => {
        return state.songs.find((s) => {
          return s.id === videoID
        })
      }
    },
    historyVideos(state) {
      const vids = state.history.map(id => {
        for (const video of state.songs) {
          if (video.id == id) {
            return video
          }
        }
        return null
      })
      return vids.filter(vid => { return (vid != null) }).reverse()
    }
  },
  mutations: {
    SET_ACCOUNT(state, account) {
      state.account = account
    },
    SET_SONGS(state, songs) {
      state.songs = songs
    },
    SET_PLAYLISTS(state, playlists) {
      state.playlists = playlists
    },
    SET_CURRENT_VIDEO(state, videoID) {
      state.currentVideoID = videoID
    },
    SET_HISTORY(state, videoID) {
      if (state.history[state.history.length - 1] != videoID) {
        state.history.push(videoID)
        // truncate history too 100 entries
        state.history = state.history.slice(Math.max(state.history.length - 100, 0))
        localStorage.setItem(HISTORY, JSON.stringify(state.history))
      }
    },
    SET_ALL_HISTORY(state, data) {
      state.history = data
    },
    ADD_LOG_ITEM(state, log) {
      log.id = Math.floor(Math.random() * 1032419).toString()
      log.time = new Date().toISOString()
      state.log.push(log)

      if (log.error) {
        state.logHasNotification = true
      }
    }
  },
  actions: {
    fetchAccount(context) {
      axios.get('/api/users/account')
        .then(response => {
          context.commit('SET_ACCOUNT', response.data.account)
          if (response.data.account) {
            context.dispatch('addLogItem', { message: 'Account fetched', error: false })
            context.dispatch('fetchSongs')
            context.dispatch('fetchPlaylists')
          }
        })
    },
    async login(context, payload) {
      return axios.post('/api/login', payload)
        .then((response) => {
          context.dispatch('addLogItem', { message: 'Logged in', error: false })
          context.dispatch('fetchAccount')
          return false
        })
        .catch((e) => {
          console.log('error logging in', e)
          context.dispatch('addLogItem', { message: 'error logging in', error: false })
          return 'Error logging in'
        })
    },
    async changePassword(context, payload) {
      return axios.put('/api/users/account/password', payload)
        .then((response) => {
          context.dispatch('addLogItem', { message: 'Changed password', error: false })
          context.dispatch('fetchAccount')
          return false
        })
        .catch((e) => {
          console.log(e)
          context.dispatch('addLogItem', { message: 'error changing password', error: false })
          if (e.response.data.message) {
            return e.response.data.message
          }
          return 'Error changing password'
        })
    },
    logout(context) {
      axios.get('/api/logout')
        .then(() => {
          context.dispatch('fetchAccount')
        })
    },
    fetchSongs(context) {
      axios.get('/api/songs')
        .then(response => {
          context.commit('SET_SONGS', response.data)
        }).catch(e => {
          if (e.response.status == 401) {
            context.commit('SET_SONGS', [])
          }
        })
    },
    async createSong(context, payload) {
      return axios.post('/api/songs', payload)
        .then((response) => {
          context.dispatch('fetchSongs')
        })
        .catch((e) => {
          console.log('error happened in creating new song... ', e)
          throw e
        })
    },
    fetchPlaylists(context) {
      axios.get('/api/playlists')
        .then(response => {
          context.commit('SET_PLAYLISTS', response.data)
        })
    },
    setCurrentVideo(context, videoID) {
      context.commit("SET_CURRENT_VIDEO", videoID)
      context.commit("SET_HISTORY", videoID)
    },
    fetchHistory(context) {
      const history = localStorage.getItem(HISTORY)
      if (history) {
        const data = JSON.parse(history)
        context.commit("SET_ALL_HISTORY", data)
      }
    },
    // expect message and error
    addLogItem(context, logPayload) {
      context.commit('ADD_LOG_ITEM', logPayload)
    }
  }
})