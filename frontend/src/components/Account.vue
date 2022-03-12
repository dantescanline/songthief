<template>
  <div class="container">
    <div v-if="$store.state.account">
      <h2>Logged in as {{ $store.state.account.name }}</h2>
      <h3>user '{{ $store.state.account.name }}', id {{ $store.state.account.id }}</h3>
      <br />
      <br />
      <button @click="logout">Log Out</button>
      <br />
      <br />
      <br />
      <h3>Change Password</h3>

      <input type="text" v-model="oldPassword" placeholder="old password" />
      <br />

      <input type="text" v-model="newPassword" placeholder="new password" />
      <br />
      <button @click="submitChangePassword" :disabled="disable">Submit</button>
      <div v-if="errorMessage">{{ errorMessage }}</div>
    </div>
    <div v-else>
      <h2>Login</h2>

      <input type="text" v-model="username" placeholder="username" />
      <br />

      <input type="text" v-model="password" placeholder="password" />
      <br />
      <button @click="submitLogin" :disabled="disable">Log In</button>
      <div v-if="errorMessage">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 500px;
  margin: 0 auto;
}
</style>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      oldPassword: '',
      newPassword: '',
      errorMessage: '',
      submitDisabled: false
    }
  },
  computed: {
    disable() {
      return this.submitDisabled
    }
  },
  methods: {
    async submitLogin() {
      this.submitDisabled = true
      this.errorMessage = ''
      this.$store.dispatch('login', {
        username: this.username,
        password: this.password
      }).then((error) => {
        this.submitDisabled = false
        if (error) {
          this.errorMessage = error
        }
      })
    },
    async submitChangePassword() {
      this.submitDisabled = true
      this.errorMessage = ''
      this.$store.dispatch('changePassword', {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      }).then((error) => {
        this.submitDisabled = false
        if (error) {
          this.errorMessage = error
        } else {
          this.oldPassword = ''
          this.newPassword = ''
          this.errorMessage = 'Password changed successfully :)'
        }
      })
    },
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>