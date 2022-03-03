<script>
import VideoGrid from './components/VideoGrid.vue'
import VideoPlayer from './components/VideoPlayer.vue'
import VideoHistory from './components/VideoHistory.vue'
import Menu from './components/Menu.vue'

export default {
  components: {
    VideoGrid,
    Menu,
    VideoPlayer,
    VideoHistory
  },
  mounted() {
    this.$store.dispatch('fetchHistory')
    this.$store.dispatch('fetchSongs')
    this.$store.dispatch('fetchPlaylists')
  }
}
</script>

<template>
  <div class="menu-bar">
    <Menu />
  </div>
  <div id="container">
    <div id="split">
      <div id="left-panel">
        <router-view></router-view>
      </div>
      <div id="right-panel">
        <VideoPlayer />
        <VideoHistory />
      </div>
    </div>
  </div>
</template>

<style>
@import "./assets/base.css";

a {
  color: white;
}
a:visited {
  color: white;
}

#container {
  height: calc(100vh - 70px);
  margin: 0;
  padding: 10px;
}

.menu-bar {
  font-size: 20px;
  color: var(--vt-c-white-soft);
  height: 40px;
  /* background: var(--vt-c-black-soft); */
  background: linear-gradient(
    90deg,
    rgba(40, 9, 30, 1) 0%,
    rgba(10, 00, 54, 1) 100%
  );
  box-sizing: content-box;
}

#split {
  height: 100%;
  box-sizing: content-box;
  display: grid;
  grid-template-columns: 1fr 500px;
  grid-gap: 10px;
  overflow-y: auto;
}

#left-panel {
  background: var(--panel-purple);
  border-radius: 10px;
  box-sizing: border-box;
  padding: 10px;
  overflow-y: auto;
}

#right-panel {
  display: grid;
  overflow-y: hidden;
  grid-gap: 10px;
  grid-template-rows: min-content, minmax(200px, 0.5fr);
}
</style>
