
<template style="">
  <div class="background">
    <div class="title">燧人大脑</div>
    <a-form class="form_background padding_top" :form="form">
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="用户名"
        has-feedback
      >
        <a-input
          v-decorator="[
            'username',
            {
              rules: [
                { required: true, message: '请输入用户名' },
                {
                  pattern:
                    '^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$',
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
              rules: [
                { required: true, message: '请输入密码' },
                {
                  required: errorMessage,
                  message: errorMessage.info
                }
              ]
            }
          ]"
          placeholder="密码"
        />
        <a class="forget">忘记密码?</a>
      </a-form-item>
      <a-form-item
        :label-col="formTailLayout.labelCol"
        :wrapper-col="formTailLayout.wrapperCol"
      >
        <a-button type="primary" @click="login">
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
const user = {
  userName: {
    value: '',
    status: 'success',
    help: '',
    focus: false
  },
  password: {
    value: '',
    status: 'success',
    help: '',
    focus: false
  }
}
export default {
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  data () {
    return {
      form: this.$form.createForm(this),
      formItemLayout,
      formTailLayout,
      user,
      errorMessage: true
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
    },
    validate (event) {
      // var el = event.currentTarget
      console.log('当前对象的内容：' + event.target.value)
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
