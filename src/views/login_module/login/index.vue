
<template style="">
  <div class="background">
    <div class="title">燧人大脑</div>
    <a-form class="form_background padding_top" :form="form" @submit="login">
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="用户名"
        has-feedback
      >
        <a-input
          v-decorator="[
            'userName',
            {
              rules: [
                { required: true, message: '请输入用户名' },
                {
                  type: 'email',
                  message: '邮箱格式错误'
                }
              ]
            }
          ]"
          placeholder="请输入用户名 (电子邮箱地址)"
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        has-feedback
        label="密码"
      >
        <a-input
          v-decorator="[
            'password',
            {
              rules: [{ required: true, message: '请输入密码' }]
            }
          ]"
          placeholder="密码"
        />
        <!-- <a class="forget">忘记密码?</a> -->
        <router-link class="forget" to="/forget">忘记密码？</router-link>
      </a-form-item>
      <a-form-item
        :label-col="formTailLayout.labelCol"
        :wrapper-col="formTailLayout.wrapperCol"
      >
        <a-button type="primary" html-type="submit">
          登陆
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { token as getToken } from '@/api/login_module/index'
import { setToken, removeToken } from '@/utils/token'
import store from '@/store'
// import { validateRequire, validateEmail } from '@/utils/validate'
// import func from '../../../../vue-temp/vue-editor-bridge'

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 }
}
const formTailLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8, offset: 8 }
}
const userType = 0
export default {
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  data () {
    return {
      form: this.$form.createForm(this),
      formItemLayout,
      formTailLayout,
      errorMessage: false
    }
  },
  methods: {
    login (e) {
      removeToken()
      e.preventDefault()
      const user = {
        userType: userType
      }
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          Object.assign(user, values)
        }
      })
      console.log('login_userInfo_', user)
      getToken(user).then((response) => {
        // 预留处理返回数据,status为1是成功回掉
        console.log('Number(response.body.status)_', Number(response.data.status))
        if (Number(response.data.status) !== 1) {
          this.validate(response.data.message)
          console.log(123)
          return
        }
        // 这是mock测试数据，下面是上环境的数据
        console.log('login_Module', response)
        // const accesstoken = response.data.token
        const accesstoken = response.headers.token
        console.log('accesstoken_', accesstoken)
        setToken(accesstoken)
        this.$router.push({// 你需要接受路由的参数再跳转，最终跳转是在main函数里面
          path: '/main'
        })
      })
    },
    validate (errorMessage) {
      this.errorMessage = true
      this.form.setFields({ 'password': {
        'errors': [
          {
            'message': errorMessage,
            'field': 'password'
          }
        ]
      } })
    }
  },
  mounted: function () {
    // 只要进入login页面就清空数据
    store.commit('REMOVE_USRINFO')
  }
}
</script>
<style>
.background {
  background-color: rgba(0, 136, 255, 0.81);
  width: 100%;
  height: 100%;
  position: relative;
}
.form_background {
  border-radius: 4px;
  background-color: #fff;
  width: 50%;
  height: 200px;
  position: absolute;
  left: 50%;
  margin-left: -25%;
  top: 50%;
  margin-top: -100px;
}
.padding_top {
  padding-top: 20px;
}
.title {
  position: relative;
  top: 190px;
  font-size: 30px;
  color: #fff;
}
.forget {
  margin: 0px auto;
  position: absolute;
  width: 50%;
  font-size: 12px;
  left: 100%;
}
</style>
