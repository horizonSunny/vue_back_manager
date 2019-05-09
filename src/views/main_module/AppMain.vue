<template>
  <div class="relative">
    <Sidebar class="inline-block float-left"></Sidebar>
    <div class="inline-block float-left content ">
      <Topbar></Topbar>
      <!--
      <section class="app-main" style="min-height: 100%">
        <transition name="fade" mode="out-in">
          <router-view :key="key"></router-view>
        </transition>
      </section>
      -->
    </div>
  </div>
</template>
<script>
import { Sidebar, Topbar } from './layout_component/index.js'
export default {
  components: {
    Sidebar, Topbar
  }
}
</script>
<style lang="scss">
.main {
}
</style>
