<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
@import "assets/iconfont/iconfont.css";
@import "style/index";
@import "style/ui-rewrite";
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
#app {
  height: 100%;
  font-family: "PingFangSC-Regular", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.app-container {
  .flex-v;
  height: 100%;
  img {
    max-width: 100%;
  }
}
</style>
