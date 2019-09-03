
<template>
  <!-- 专门为各个模块新建的router -->
  <!-- <keep-alive :include="this.canActives"> -->
  <keep-alive :include="canActives">
    <router-view></router-view>
  </keep-alive>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'moduleMainComponent',
  computed: {
    ...mapGetters(['canAlived']),
    canActives: function () {
      console.log('moduleMain_this.canAlived_', this.canAlived)
      return this.canAlived
      // return 'recordList-alive'
    }

  }
}
</script>
