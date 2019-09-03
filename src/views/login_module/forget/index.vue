
<template style="">
  <div class="background">
    <div class="title">重置密码</div>
    <a-form class="form_background padding_top" :form="form" @submit="reset">
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="邮箱"
        has-feedback
      >
        <a-input
          v-decorator="[
            'email',
            {
              rules: [
                { required: true, message: '请输入用户名!' },
                {
                  type: 'email',
                  message: '邮箱格式错误!'
                }
              ]
            }
          ]"
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
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        has-feedback
        label="密码"
      >
        <a-input
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
      </a-form-item>
      <a-form-item
        :label-col="formTailLayout.labelCol"
        :wrapper-col="formTailLayout.wrapperCol"
      >
        <a-button type="primary" html-type="submit">
          确定
        </a-button>
        <span style="display:inline-block;width:10%"></span>
        <a-button @click="cancel">
          取消
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { sendVerify, forgetPassword } from '@/api/login_module/index'

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 }
}
const formTailLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8, offset: 8 }
}
export default {
  data () {
    return {
      form: this.$form.createForm(this),
      formItemLayout,
      formTailLayout,
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
  width: 100%;
  height: 100%;
  position: relative;
}
.form_background {
  border-radius: 4px;
  background-color: #fff;
  width: 50%;
  height: 350px;
  position: absolute;
  left: 50%;
  margin-left: -25%;
  top: 50%;
  margin-top: -200px;
}
.getVerific {
  right: -120px;
  position: absolute;
  top: -7px;
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
