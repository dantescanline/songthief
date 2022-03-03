<template>
  <div class="container">
    <h3>Now Playing... {{ currentVideo ? '' : ' nothing' }}</h3>
    <div v-if="currentVideo">
      <iframe
        width="480"
        height="400"
        :src="'https://www.youtube.com/embed/' + currentVideo.youtubeID + '?controls=1&autoplay=1&modestbranding=1'"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <br />
      <span class="title">{{ currentVideo.title }}</span>
      <br />
      <span class="meta-info">uploaded by {{ currentVideo.uploader }} - {{ timeSpan }}</span>
      <div v-if="currentVideo.playlists">
        Playlists
        <PlaylistChip
          v-for="playlist in currentVideo.playlists"
          v-bind:id="playlist.id"
          :playlist="playlist"
        />
      </div>
    </div>
  </div>
</template>
<script>

import PlaylistChip from './PlaylistChip.vue'

export default {
  components: {
    PlaylistChip
  },
  computed: {
    currentVideo() {
      return this.$store.getters.currentVideo
    },
    timeSpan() {
      if (this.currentVideo) {
        var minutes = Math.floor(this.currentVideo.duration / 60);
        var seconds = this.currentVideo.duration - minutes * 60;
        return `${minutes}:${zfill(seconds, 2)}`
      }
      return ''
    }
  }
}

function zfill(num, len) { return (Array(len).join("0") + num).slice(-len); }
</script>
<style scoped>
.container {
  padding: 10px;
  border-radius: 10px 10px;
  background: var(--panel-purple);
}

.meta-info {
  font-size: 16px;
}

div {
  font-size: 20px;
}
.title {
  color: var(--vt-c-white);
  font-size: 22px;
}
</style>