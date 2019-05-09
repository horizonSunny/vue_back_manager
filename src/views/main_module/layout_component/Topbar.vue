<template>
  <div>
    <a-button type="primary" @click="toggleSideBar" style="margin-bottom: 16px">
      <a-icon :type="true ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
  </div>
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
