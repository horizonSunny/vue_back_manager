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
      <a style="float:right" @click="logout">退出</a>
      <!-- <router-link style="float:right" to="/login">退出</router-link> -->
    </div>
  </a-layout-header>
</template>

<script>
import { removeCookie } from '@/utils/userInfo'

export default {
  methods: {
    toggleSideBar () {
      this.$store.dispatch('ToggleSideBar')
    },
    logout () {
      console.log('登出')
      removeCookie('loginUser')
      this.$router.push({// 你需要接受路由的参数再跳转，最终跳转是在main函数里面
        path: '/'
      })
    }
  }
}
</script>

<style>
</style>
