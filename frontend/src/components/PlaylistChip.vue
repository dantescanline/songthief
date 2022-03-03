<template>
  <span class="container2">{{ playlist.title }}</span>
</template>

<script>
export default {
  props: ['playlist']
}
</script>

<style scoped>
.container2 {
  background: var(--vt-c-black-mute);
  color: var(--vt-c-white-mute);
  padding: 5px 10px;
  font-size: 16px;
  margin-right: 20px;
  border-radius: 10px 10px;
}
</style>