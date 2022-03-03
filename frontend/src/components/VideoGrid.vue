<template>
  <div>
    <input v-model="searchString" placeholder="search" />
    <div>
      <span
        v-if="searchString"
      >{{ videos.length == 100 ? videos.length + '+' : videos.length }} videos</span>
      <span v-else>{{ $store.state.songs.length }} videos</span>
    </div>
    <div class="grid">
      <div
        v-for="video in videos"
        v-bind:id="video.id"
        :class="{ 'grid-item': true, 'selected': video.id === $store.state.currentVideoID }"
        @click="setVideo(video.id)"
      >
        <div>
          <img :src="'https://img.youtube.com/vi/' + video.youtubeID + '/0.jpg'" />
        </div>
        <div>{{ video.title }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      searchString: ''
    }
  },
  methods: {
    setVideo(id) {
      this.$store.dispatch('setCurrentVideo', id)
    },
  },
  computed: {
    videos() {
      const videos = this.$store.state.songs
      if (!this.searchString) {
        return videos.slice().sort((a, b) => {
          if (a.id > b.id) {
            return -1
          } else if (b.id > a.id) {
            return 1
          }
          return 0
        }).slice(0, 100)
      } else {
        let search = this.searchString.toLowerCase()
        return videos.filter(video => {
          return video.title.toLowerCase().includes(search)
        }).slice(0, 100)
      }
    }
  }
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 0.33fr));
  grid-gap: 10px;
}

::placeholder {
  color: var(--color-text);
}

.grid-item {
  border-radius: 5px 5px;
  background: var(--vt-c-black);
  padding: 10px;
  border: 1px solid var(--vt-c-black);
}

.selected {
  border: 1px solid white;
}

.grid-item:hover {
  cursor: pointer;
  background: var(--vt-c-black-mute);
}

.grid-item img {
  width: 100%;
}

input {
  width: 100%;
  background-color: var(--vt-c-black);
  border: none;
  font-size: 20px;
  margin-bottom: 10px;
  color: var(--vt-c-text-dark-1);
}
</style>