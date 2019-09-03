
<template style="">
  <div class="main-container">
    <div class="login-box">
      <div class="login-title">登录燧人大脑</div>
      <div class="login-content">
        <a-form class="login-from" :form="form" @submit="login" >
          <a-form-item class="form-item" has-feedback >
            <a-input class="item" placeholder="请输入电子邮箱登录" v-decorator="[ 'userName',
              {
                rules: [ { required: true, message: '请输入用户名!' }, { type: 'email', message: '邮箱格式错误!' } ]
              }
            ]" />
          </a-form-item>
          <a-form-item has-feedback >
            <a-input class="item" placeholder="请输入密码" type="password" v-decorator="[ 'password',
                {
                  rules: [{ required: true, message: '请输入密码!' }]
                }
              ]" />
          </a-form-item>
          <div class="forget"><router-link to="/forget">忘记密码</router-link></div>
          <a-form-item >
            <a-button class="login-btn" html-type="submit">登陆</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script>
import { token as getToken } from '@/api/login_module/index'
import { setToken, removeToken } from '@/utils/token'
import { setCookie } from '@/utils/userInfo'
import { RSAencrypt } from '@/utils/rsa'
// import { asyncRouter } from '@/router/index'
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
      e.preventDefault()
      removeToken()
      store.commit('REMOVE_USRINFO')
      const user = {
        userType: userType
      }
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          let tempuser = {}
          tempuser.userName = values.userName
          if (values.password) {
            tempuser.password = RSAencrypt(values.password)
          }
          Object.assign(user, tempuser)
          getToken(user).then((response) => {
            // 预留处理返回数据,status为1是成功回掉
            if (response.data.status && Number(response.data.status) !== 1) {
              this.validate(response.data.message)
              console.log(123)
              return
            }
            const accesstoken = response.headers.token
            setCookie('loginUser', response.data.body.userName)
            setToken(accesstoken)
            this.$router.push({// 你需要接受路由的参数再跳转，最终跳转是在main函数里面
              path: '/main'
            })
          })
        }
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
    // console.log('asyncRouter_123_', JSON.stringify(asyncRouter))
    // localStorage.setItem('asyncRouter', JSON.stringify(asyncRouter))
  }
}
</script>
<style lang="scss" scoped>
.main-container {
  background: url('../../../assets/beijing.png') no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  min-width: 420px;
  position: relative;
}
.login-box{
  width: 440px;
  height: 380px;
  background: rgba(126,137,174,0.26);
  position: absolute;
  top: 50%;
  transform: translate(-10%, -50%);
  right: 10%;
  border-radius: 12px;
  text-align: center;
  padding-top: 25px;
  box-sizing: border-box;
  text-align: center;
  .login-title{
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #FFFFFF;
  }
  .login-content{
    margin: 31px 60px;
    .login-from{
      text-align: left;
    }
    .login-btn{
      background: #D8D8D8;
      background-image: linear-gradient(-180deg, #6E86A9 0%, #607594 100%);
      border-radius: 6px;
      margin-top: 19px;
      width: 320px;
      height: 50px;
      font-family: PingFangSC-Regular;
      font-size: 20px;
      color: #FFFFFF;
    }
    .form-item{
      margin-bottom: 30px;
    }
    .item {
      width: 320px;
      height: 50px;
      border-radius: 0;
    }
    .forget{
      text-align: right;
      margin-top: -15px;
      a {
        font-family: PingFangSC-Regular;
        /* font-size: 16px; */
        color: #FFFFFF;
      }
    }
  }
}
.main-container /deep/ .ant-btn{
  border-color: #6E86A9;
}

.main-container /deep/ .has-success.has-feedback .ant-form-item-children-icon{
  color: #6A8ABC;
}
</style>
