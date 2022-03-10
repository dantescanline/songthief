<template>
  <div class="split">
    <div>
      <div class="form">
        <h2 class="span">Add new song</h2>
        <span class="label">Title</span>
        <input hint="title" v-model="title" placeholder="Best song ever" />
        <span class="label">Youtube ID</span>
        <input v-model="link" placeholder="video id or full link" />
        <span class="label">Playlist</span>
        <select name="list" v-model="playlistID">
          <option
            v-for="playlist in $store.state.playlists"
            :value="playlist.id"
          >{{ playlist.title }}</option>
        </select>
        <div class="span">.</div>
        <div></div>
        <button @click="submit" :disabled="formDisabled">Submit</button>
      </div>
      <div v-if="currentMessage" :class="{ error: hasError }">{{ currentMessage }}</div>
    </div>
    <div>
      <h2>Preview</h2>
      <img class="preview-image" :src="'https://img.youtube.com/vi/' + youtubeID + '/0.jpg'" />
    </div>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  data: function () {
    return {
      title: '',
      uploader: '',
      link: '',
      youtubeID: '',
      playlistID: 0,
      message: '',
      hasError: false
    }
  },
  methods: {
    submit() {
      this.$store.dispatch('createSong', {
        title: this.title,
        uploader: this.uploader,
        youtubeID: this.youtubeID,
        playlistID: this.playlistID
      })
        .then(() => {
          this.message = "Successful :)"
        })
        .catch(() => {
          this.message = 'there was an error'
          this.hasError = true
        })
    }
  },
  computed: {
    formDisabled() {
      if (!this.$store.state.account) {
        return true
      }

      if (!this.title || !this.youtubeID || !this.playlistID) {
        return true
      }

      return false
    },
    currentMessage() {
      if (!this.$store.state.account) {
        return 'Not Logged In'
      }
      return this.message
    }
  },
  watch: {
    link(newLink, old) {
      console.log(newLink)
      if (newLink.includes('v=')) {
        const parts = qs.parse(newLink.split('?')[1])
        console.log(parts)
        this.youtubeID = parts.v
      } else {
        this.youtubeID = newLink
      }
    }
  }
}
</script>

<style scoped>
h2 {
  color: var(--vt-c-white);
  margin-bottom: 20px;
}

.split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  padding: 10px;
}

.preview-image {
  width: 100%;
}
.form {
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-row-gap: 10px;
}

.span {
  grid-column: 1/3;
}

.label {
  font-size: 20px;
  margin-right: 20px;
  color: var(--vt-c-text-dark-1);
}
</style>