<template>
  <div>
    <h2>Log</h2>
    <div
      v-for="item in logItems"
      v-bind:key="item.id"
      :class="{ 'has-error': item.error }"
    >{{ item.time }} : {{ item.message }}</div>
  </div>
</template>

<style scoped>
.has-error {
  color: #c55;
}
</style>

<script>
export default {
  computed: {
    logItems: function () {
      return this.$store.state.log.slice().reverse()
    }
  },
  mounted() {
    this.$store.state.logHasNotification = false
  }
}
</script>
