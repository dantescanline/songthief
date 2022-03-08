<template>
  <div>
    <div v-if="$store.state.account">
      <h2>Logged in</h2>
      <h3>{{ $store.state.account.name }} - id {{ $store.state.account.id }}</h3>
      <button @click="logout">Log Out</button>
    </div>
    <div v-else>
      <h2>Login</h2>

      <input type="text" v-model="username" placeholder="username" />
      <br />

      <input type="text" v-model="password" placeholder="password" />
      <br />
      <button @click="submit" :disabled="disable">Log In</button>
      <div v-if="errorMessage">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<style scoped>
</style>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      submitDisabled: false
    }
  },
  computed: {
    disable() {
      if (this.submitDisabled) return true
      if (!this.username || !this.password) return true
      return false
    }
  },
  methods: {
    async submit() {
      this.submitDisabled = true
      this.errorMessage = ''
      this.$store.dispatch('login', {
        username: this.username,
        password: this.password
      }).then((error) => {
        if (error) {
          this.submitDisabled = false
          this.errorMessage = error
        }
      })
    },
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>