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
    <h3 v-if="!$store.state.account">Not logged In</h3>
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 0.33fr));
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
  line-height: 1.2;
}

.selected {
  border: 1px solid white;
}

.grid-item:hover {
  cursor: pointer;
}

.grid-item:hover {
  background: linear-gradient(155deg, #32091e, #0a0028);
  background-size: 400% 400%;

  -webkit-animation: BackgroundAnimation 5s ease infinite;
  -moz-animation: BackgroundAnimation 5s ease infinite;
  animation: BackgroundAnimation 5s ease infinite;
}

@-webkit-keyframes BackgroundAnimation {
  0% {
    background-position: 25% 0%;
  }
  50% {
    background-position: 76% 100%;
  }
  100% {
    background-position: 25% 0%;
  }
}
@-moz-keyframes BackgroundAnimation {
  0% {
    background-position: 25% 0%;
  }
  50% {
    background-position: 76% 100%;
  }
  100% {
    background-position: 25% 0%;
  }
}
@keyframes BackgroundAnimation {
  0% {
    background-position: 25% 0%;
  }
  50% {
    background-position: 76% 100%;
  }
  100% {
    background-position: 25% 0%;
  }
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