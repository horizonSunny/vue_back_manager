<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view></router-view>
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
  name: 'App',
  activated: function () {
    this.$setgoindex()
  },
  data () {
    return {
      locale: zhCN
    }
  }
}
</script>

<style lang="scss">
@import "./style/common.scss";
@import "./style/sidebar.scss";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  width: 100%;
<<<<<<< HEAD
  height: 100%;
=======
  height: 669px;
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
}
</style>
