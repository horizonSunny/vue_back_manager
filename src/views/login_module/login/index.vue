<template>
  <div>
    <a-button @click="login" type="primary">Primary</a-button>
  </div>
</template>
<script>
import { token as getToken } from '@/api/login_module/index'
import { setToken, removeToken } from '@/utils/token'
import store from '@/store'

export default {
  data () {
    return {
      admin: 'zhanshengbai@green-valley.com',
      password: '123456',
      userType: 0
    }
  },

  methods: {
    login () {
      removeToken()
      const user = {
        userName: this.admin,
        password: this.password,
        userType: this.userType
      }
      getToken(user).then((response) => {
        console.log(123)
        const accesstoken = response.headers.token
        console.log('accesstoken_', accesstoken)
        setToken(accesstoken)
        this.$router.push({// 你需要接受路由的参数再跳转，最终跳转是在main函数里面
          path: '/main'
        })
      })
    }
  },
  mounted: function () {
    // 只要进入login页面就清空数据
    store.commit('REMOVE_USRINFO')
  }
}
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
