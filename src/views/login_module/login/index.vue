<template>
  <div>
    <a-button @click="getToken" type="primary">Primary</a-button>
  </div>
</template>
<script>
import { token } from '@/api/login_module/index'

export default {
  data () {
    return {
      admin: 'qinzhen@green-valley.com',
      password: '123456',
      userType: 0
    }
  },

  methods: {
    getToken () {
      const user = {
        userName: this.admin,
        password: this.password,
        userType: this.userType
      }
      token(user).then(() => {
        console.log(123)
      })
    }
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
