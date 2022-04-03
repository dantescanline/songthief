<template>
  <div>
    <h1>Edit</h1>
    <div class="form">
      <span class="label">Title</span>
      <input hint="title" v-model="title" placeholder="Best song ever" />
      <span class="label">Youtube ID</span>
      <input v-model="youtubeID" placeholder="video id or full link" />
      <span class="label">Playlist</span>
      <!-- <select name="list" v-model="playlistID">
        <option v-for="playlist in $store.state.playlists" :value="playlist.id">{{ playlist.title }}</option>
      </select>-->
      <div class="span">.</div>
      <div></div>
      <button @click="submit" :disabled="formDisabled">Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formDisabled: false,
      title: '',
      uploader: '',
      youtubeID: ''
    }
  },
  mounted() {
    this.setup()
  },
  methods: {
    submit() {

    },
    setup() {
      if (this.song) {

        this.title = this.song.title
        this.uploader = this.song.uploader
        this.youtubeID = this.song.youtubeID
      }
    }
  },
  watch: {
    song() {
      this.setup()
    }
  },
  computed: {
    song() {
      return this.$store.state.editingSong
    }
  }
}
</script>

<style>
</style>