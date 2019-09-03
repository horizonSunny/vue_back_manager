<template>
  <div class="container">
    <a-tabs :activeKey="activeKey" @change="tabChange">
      <a-tab-pane tab="视屏" key="1">
        <VideoManagement v-if="activeKey === '1'"></VideoManagement>
      </a-tab-pane>
      <a-tab-pane tab="图文消息" key="2">
        <GraphicManagement v-if="activeKey === '2'"></GraphicManagement>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import VideoManagement from '../videoManagement/index'
import GraphicManagement from '../graphicManagement/index'
export default {
  data () {
    return {
      activeKey: this.$route.params.activeKey ? this.$route.params.activeKey : '1'
    }
  },
  mounted () {
    console.log('this.$route.params', this.$route.params)
    console.log('activeKey', this.activeKey)
  },
  components: {
    VideoManagement,
    GraphicManagement
  },
  methods: {
    tabChange (key) {
      this.activeKey = key
    }
  }
}
</script>

<style lang="scss" scoped>
  .container{
    text-align: left;
  }
</style>
