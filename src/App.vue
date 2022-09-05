<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style lang="less">
@import url(@/assets/css/base.css);
@font-face {
  font-family: "Dosis";
  src: url("@/assets/font/Dosis.woff2");
}
#app {
  line-height: 1.5;
  // font-family: Dosis, Avenir, Helvetica, Arial, sans-serif;
  font-family: "PingFang SC", "Microsoft YaHei", "Microsoft Jhenghei", -apple-system, system-ui, "Hiragino Sans GB", STHeitiTC-Light, tahoma, arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
