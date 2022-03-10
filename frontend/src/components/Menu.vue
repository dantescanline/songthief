<template>
  <div class="layout">
    <div class="logo" @click.stop="change">
      <span class="logo-text">Songthief</span>
      <span class="emoji">{{ emoji }}</span>&nbsp;
    </div>
    <div class="buttons-area">
      <router-link to="/">
        <div class="nav-button" :class="{ current: isCurrent('home') }">Home</div>
      </router-link>
      <router-link to="/new">
        <div class="nav-button" :class="{ current: isCurrent('new') }">Add Song</div>
      </router-link>
      <router-link to="/account">
        <div class="nav-button" :class="{ current: isCurrent('account') }">{{ loginText }}</div>
      </router-link>
    </div>
    <div class="right-area">
      <router-link to="/about">
        <div class="nav-button" :class="{ current: isCurrent('about') }">About</div>
      </router-link>
      <router-link to="/log">
        <div class="nav-button" :class="{ current: isCurrent('log') }">
          <span v-if="$store.state.logHasNotification" style="color: #fff;">⚠️</span>
          Log
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
const emojis = ['🎵', '💰', '👽', '🔑', '🛠️', '🚫', '🐼', '🏴', '✔️', '😂']

let emojiTimeout = null

export default {
  data: function () {
    return {
      emoji: '🎵'
    }
  },
  computed: {
    loginText() {
      if (this.$store.state.account) {
        return 'Account'
      } else {
        return 'Login'
      }
    }
  },
  mounted() {
    emojiTimeout = setTimeout(this.change, 10000)
    // this.change()
  },
  methods: {
    change() {
      clearTimeout(emojiTimeout)
      emojiTimeout = setTimeout(this.change, 20000)
      this.emoji = emojis[Math.floor(Math.random() * emojis.length)]
    },
    isCurrent(input) {
      return (this.$route.name === input)
    }
  }
}
</script>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 170px 1fr 215px;
}

.buttons-area {
  display: flex;
}

.right-area {
  text-align: right;
  flex-flow: row-reverse;
  display: flex;
}

.emoji {
  padding-left: 10px;
}

.emoji:hover {
  cursor: pointer;
}

.nav-button {
  padding: 2px 20px;
  margin-right: 0px;
  color: rgba(235, 235, 235, 0.64);
}

a {
  text-decoration: none;
}

.nav-button:hover {
  cursor: pointer;
  color: white;
}

.current {
  color: white;
}

.logo {
  font-size: 20px;
  color: grey;
  user-select: none;
  text-align: left;
  padding-top: 3px;
  padding-left: 15px;
}

.logo-text {
  font-style: italic;
}
</style>
