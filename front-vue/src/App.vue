<template>
  <div id="app">
    <SocketClient />
    <div class="router-view">
      <router-view></router-view>
    </div>
  </div>
</template>
<style lang="scss">
@import "./assets/styles/app.scss";
</style>
<script>
import SocketClient from "./components/socket-client/SocketClient.vue";
export default {
  components: {
    SocketClient,
  },
};
</script>
