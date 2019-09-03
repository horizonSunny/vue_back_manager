
<template style="">
  <div class="background">
<<<<<<< HEAD
    <div class="title">重置密码</div>
    <a-form class="form_background padding_top" :form="form" @submit="reset">
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="邮箱"
=======
    <div class="title">燧人大脑</div>
    <a-form class="form_background padding_top" :form="form" @submit="login">
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="用户名"
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
        has-feedback
      >
        <a-input
          v-decorator="[
<<<<<<< HEAD
            'email',
            {
              rules: [
                { required: true, message: '请输入用户名!' },
                {
                  type: 'email',
                  message: '邮箱格式错误!'
=======
            'username',
            {
              rules: [
                { required: true, message: '请输入用户名' },
                {
                  type: 'email',
                  message: '邮箱格式错误'
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
                }
              ]
            }
          ]"
<<<<<<< HEAD
          placeholder="请输入邮箱地址(账户名)"
        />
        <a-button class="getVerific" v-if="!reload" @click="reGet">
          获取验证码
        </a-button>
        <a-button v-else class="getVerific" @click="getVerify">
          重新获取
        </a-button>
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="验证码"
        has-feedback
      >
        <a-input
          v-decorator="[
            'verifyCode',
            {
              rules: [{ required: true, message: '请输入验证码!' }]
            }
          ]"
          placeholder="请输入验证码"
=======
          placeholder="请输入用户名 (电子邮箱地址)"
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        has-feedback
        label="密码"
      >
        <a-input
<<<<<<< HEAD
          type="password"
          v-decorator="[
            'password',
            {
              rules: [
                { required: true, message: '请输入密码!' },
                ,
                {
                  pattern: /^[a-zA-Z0-9]{6,11}$/,
                  message: '请输入6-11位数字,字母组成的密码!'
                }
              ]
            }
          ]"
          placeholder="密码（6-11位数字、字母组成）"
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        has-feedback
        label="确认密码"
      >
        <a-input
          type="password"
          v-decorator="[
            'confirmPassword',
            {
              rules: [
                { required: true, message: '请重新输入密码!' },
                {
                  pattern: /^[a-zA-Z0-9]{6,11}$/,
                  message: '请输入6-11位数字,字母组成的密码!'
                }
              ]
            }
          ]"
          placeholder="确认密码（6-11位数字、字母组成）"
        />
=======
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
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
      </a-form-item>
      <a-form-item
        :label-col="formTailLayout.labelCol"
        :wrapper-col="formTailLayout.wrapperCol"
      >
        <a-button type="primary" html-type="submit">
<<<<<<< HEAD
          确定
        </a-button>
        <span style="display:inline-block;width:10%"></span>
        <a-button @click="cancel">
          取消
=======
          登陆
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
<<<<<<< HEAD
import { sendVerify, forgetPassword } from '@/api/login_module/index'
=======
import { token as getToken } from '@/api/login_module/index'
import { setToken, removeToken } from '@/utils/token'
import store from '@/store'
// import { validateRequire, validateEmail } from '@/utils/validate'
// import func from '../../../../vue-temp/vue-editor-bridge'
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 }
}
const formTailLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8, offset: 8 }
}
<<<<<<< HEAD
export default {
=======
const userType = 0
export default {
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
  data () {
    return {
      form: this.$form.createForm(this),
      formItemLayout,
      formTailLayout,
<<<<<<< HEAD
      errorMessage: false,
      reload: false
    }
  },
  methods: {
    reset (e) {
      e.preventDefault()
      const dataInfo = {}
      const password = this.form.getFieldValue('password')
      const confirmPassword = this.form.getFieldValue('confirmPassword')
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          Object.assign(dataInfo, values)
        }
      })
      if (password !== confirmPassword) {
        this.form.setFields({ 'confirmPassword': {
          'errors': [
            {
              'message': '密码输入不一致',
              'field': 'confirmPassword'
            }
          ]
        } })
        return
      }
      console.log('login_userInfo_', dataInfo)
      forgetPassword(dataInfo).then((resp) => {
        console.log(resp)
=======
      errorMessage: false
    }
  },
  methods: {
    login (e) {
      removeToken()
      // const user = {
      //   userName: this.admin,
      //   password: this.password,
      //   userType: this.userType
      // }
      // this.form.setFields({
      //   username: this.user.userName,
      //   password: this.user.password
      // })
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
        // 预留处理返回数据
        // if (response.message === '用户信息不存在' && response.status === 0) {
        //   this.validate(response.message)
        //   console.log(123)
        // }
        console.log('login_userInfo_response_', response)
        const accesstoken = response.headers.token
        console.log('accesstoken_', accesstoken)
        setToken(accesstoken)
        this.$router.push({// 你需要接受路由的参数再跳转，最终跳转是在main函数里面
          path: '/main'
        })
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
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
<<<<<<< HEAD
    },
    cancel () {
      if (this.$route.query.goindex === 'true') {
        this.$router.push('/')
      } else {
        this.$router.back(-1)
      }
    },
    reGet () {
      this.getVerify()
      this.reload = true
    },
    getVerify () {
      const emailInfo = this.form.getFieldValue('email')
      console.log('emailInfo_', emailInfo)
      sendVerify({ email: emailInfo }).then((res) => {
        console.log('成功')
      })
    }
  }
}
</script>
<style  scoped >
.background {
  background-color: rgb(221, 221, 221);
=======
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
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
  width: 100%;
  height: 100%;
  position: relative;
}
.form_background {
  border-radius: 4px;
  background-color: #fff;
  width: 50%;
<<<<<<< HEAD
  height: 350px;
=======
  height: 200px;
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
  position: absolute;
  left: 50%;
  margin-left: -25%;
  top: 50%;
<<<<<<< HEAD
  margin-top: -200px;
}
.getVerific {
  right: -120px;
  position: absolute;
  top: -7px;
=======
  margin-top: -100px;
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
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
