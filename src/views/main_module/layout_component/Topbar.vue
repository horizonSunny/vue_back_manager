<template class="text-align-left">
  <a-layout-header style="background: #fff; padding: 0px 20px">
    <div>
      <a-button
        type="primary"
        @click="toggleSideBar"
        style="margin-bottom: 16px"
      >
        <a-icon :type="true ? 'menu-unfold' : 'menu-fold'" />
      </a-button>
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
