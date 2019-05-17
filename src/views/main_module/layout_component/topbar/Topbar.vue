<template class="text-align-left">
  <a-layout-header style="background: #fff; padding: 0px 20px">
    <div>
      <a-button
        type="primary"
        @click="toggleSideBar"
        class="float-left"
        style="margin-bottom: 16px;margin-top:6px"
      >
        <a-icon :type="true ? 'menu-unfold' : 'menu-fold'" />
      </a-button>
      <!-- 预留退出按钮 -->
      <router-link style="float:right" to="/login">退出</router-link>
    </div>
  </a-layout-header>
</template>

<script>
export default {
  methods: {
    toggleSideBar () {
      this.$store.dispatch('ToggleSideBar')
    }
  }
}
</script>

<style>
</style>
