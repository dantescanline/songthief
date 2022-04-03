<template>
  <div class="container">
    <h3 v-if="!currentVideo">Now Playing... nothing</h3>
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
      <h3>{{ currentVideo.title }}</h3>
      <span class="meta-info" v-if="currentVideo.uploader">uploaded by {{ currentVideo.uploader }}</span>
      <div v-if="currentVideo.playlists">
        Playlists
        <PlaylistChip
          v-for="playlist in currentVideo.playlists"
          v-bind:key="playlist.id"
          :playlist="playlist"
        />
      </div>
      <span @click="editVideo">Edit</span>
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
    }
  },
  methods: {
    editVideo() {
      this.$store.state.editingSong = this.currentVideo
      this.$router.push({ name: 'edit' })
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