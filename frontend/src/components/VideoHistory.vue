<template>
  <div class="container">
    <h3>History</h3>
    <div
      class="history-item"
      v-for="video of $store.getters.historyVideos"
      v-bind:key="video.id"
      @click="setVideo(video.id)"
    >
      <img :src="'https://img.youtube.com/vi/' + video.youtubeID + '/2.jpg'" width="30" />
      {{ video.title }}
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    setVideo(id) {
      this.$store.dispatch('setCurrentVideo', id)
    },
  }
}
</script>
<style scoped>
.container {
  overflow-y: auto;
  scrollbar-width: thin;
  border-radius: 10px 10px;
  padding: 10px;
  background: var(--panel-purple);
}
h3 {
  font-size: 23px;
}

.history-item {
  overflow-x: hidden;
  padding: 2px 2px;
}

.history-item img {
  vertical-align: bottom;
}

.history-item:hover {
  cursor: pointer;
  background: var(--vt-c-black-mute);
}
</style>