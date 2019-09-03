<template>
  <div>
    <div class="titleContent">
      <a class="float-left goBack" @click="reback">返回</a>
      <span class="float-left patientInfo">{{ operate }}脑健康管理师 </span>
      <div class="clear-both"></div>
    </div>
    <div class="content">
      <a-form :form="form" @submit="handleSubmit" disabled>
        <a-form-item
          label="姓名"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            :disabled="disabledInfo"
            v-decorator="[
              'fullname',
              {
                initialValue: this.fullname,
                rules: [
                  { required: true, message: '请输入脑健康师姓名!' },
                  {
                    pattern: /^[\u0391-\uFFE5A-Za-z]+$/,
                    message: '请输英文和汉字的组合!'
                  }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="手机号码"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            :disabled="disabledInfo"
            v-decorator="[
              'mobilenumber',
              {
                initialValue: this.mobilenumber,
                rules: [
                  { required: true, message: '请输入手机号!' },
                  {
                    pattern: /^1[34578]\d{9}$/,
                    message: '请校验手机格式是否正确!'
                  }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="性别"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-radio-group
            :disabled="disabledInfo"
            v-decorator="[
              'sex',
              {
                initialValue: this.sex,
                rules: [{ required: true, message: '请选择性别!' }]
              }
            ]"
          >
            <a-radio :value="1">女</a-radio>
            <a-radio :value="0">男</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="出生日期"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-date-picker
            :disabled="disabledInfo"
            style="width:100%"
            @change="dateChange"
            format="YYYY-MM-DD"
            v-decorator="[
              'birthDate',
              {
                initialValue: this.birthDate
                  ? this.moment(this.birthDate, 'YYYY/MM/DD')
                  : this.moment(undefined),
                rules: [
                  {
                    required: true,
                    message: '请输入出生日期!'
                  }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="所属医院"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          required
        >
          <MultipleCascader
            :option-cascader="options"
            option-operate="default"
            :have-select="[hospital]"
            :change-select="false"
            select-function="hospital"
            @selectValues="hospitalSelectChange"
            :disabled-info="disabledInfo"
          />
        </a-form-item>
        <a-form-item
          label="邮箱"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            :disabled="disabledInfo"
            v-decorator="[
              'registerEmail',
              {
                initialValue: this.registerEmail,
                rules: [
                  { required: true, message: '请输入邮箱!' },
                  {
                    type: 'email',
                    message: '邮箱格式错误'
                  }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="身份证号"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            :disabled="disabledInfo"
            v-decorator="[
              'idnumber',
              {
                initialValue: this.idnumber
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="个人简介"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-textarea
            :disabled="disabledInfo"
            v-decorator="[
              'workePerience',
              {
                initialValue: this.workePerience
              }
            ]"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button :disabled="disabledInfo" @click="cancel()">
            取消
          </a-button>
          <span style="display:inline-block;width:10%"></span>
          <a-button
            :disabled="disabledInfo"
            :loading="loading"
            type="primary"
            html-type="submit"
          >
            保存
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import { insertDoctor, updateDoctor } from '@/api/user_module/index'
import MultipleCascader from '@/components/MultipleCascader'
// 涌来循环options，添加label 和 value 值
export default {
  components: {
    MultipleCascader
  },
  data: function () {
    return {
      form: this.$form.createForm(this),
      operate: this.$route.params.operate,
      options: [],
      fullname: this.$route.params['info']['fullname'] || '',
      idnumber: this.$route.params['info']['idnumber'] || '',
      mobilenumber: this.$route.params['info']['mobilenumber'] || '',
      registerEmail: this.$route.params['info']['registerEmail'] || '',
      // sex: this.$route.params['info']['sex'] || '',
      workePerience: this.$route.params['info']['workePerience'] || '',
      birthDate: this.$route.params['info']['birthDate'] || '',
      hospital: this.$route.params['info']['hospitalUid'] || '',
      disabledInfo: false,
      loading: false
    }
  },
  computed: {
    ...mapGetters(['hospitals']),
    sex: function () {
      const item = this.$route.params['info']['sex']
      if (item === 0 || item !== undefined || item !== null) {
        return item
      } else {
        return ''
      }
    }
  },
  methods: {
    moment,
    cancel () {
      this.reback()
    },
    onChange (value) {
      console.log(value)
    },
    handleSubmit (e) {
      e.preventDefault()
      let assessment = {}
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          Object.assign(assessment, values, { hospitals: Array.isArray(this.hospital) ? this.hospital : [this.hospital] })
          if (this.hospital['length'] === 0) {
            this.$message.info('请选中所属医院')
            return
          }
          delete assessment['hospital']
          // 接口
          this.loading = true
          if (this.operate === '新建') {
            insertDoctor(assessment).then((res) => {
              this.reback()
              this.loading = false
            })
          }
          if (this.operate === '编辑') {
            const updata = Object.assign(assessment, { uid: this.$route.params['info']['uid'] })
            updateDoctor(updata).then((res) => {
              this.reback()
              this.loading = false
            })
          }
        }
      })
    },
    displayRender ({ labels }) {
      return labels[labels.length - 1]
    },
    reback () {
      if (this.$route.query.goindex === 'true') {
        this.$router.push('/')
      } else {
        this.$router.back(-1)
      }
    },
    dateChange (date, dateString) {
      console.log('date_', date)
      this.birthDate = dateString
    },
    hospitalSelectChange (value) {
      console.log('value_', value)
      this.hospital = value
      console.log('this.hospital_', this.hospital)
    }
  },
  created () {
    console.log('this.$route.params_', this.$route.params['operate'])
    if (this.$route.params['operate'] === '查看') {
      this.disabledInfo = true
    }
    this.options = this.hospitals
  }
}
</script>
<style lang="scss">
.titleContent {
  .patientInfo {
    font-size: 18px;
    margin-left: 20px;
  }
  .goBack {
    display: inline-block;
    height: 27px;
    line-height: 27px;
  }
}
.content {
  margin-top: 20px;
  .marginTop {
    margin-top: 20px;
    .roleWidth {
      width: 70%;
    }
    .contentRow {
      text-align: left;
      padding-left: 20px;
      border: 1px solid rgba(128, 128, 128, 0.7);
      // border: 1px solid rgba(0, 145, 255, 0.926);
      border-bottom: 0px;
      height: 55px;
      line-height: 55px;
      overflow: hidden;
    }
    .tabelStyle {
      display: inline-block;
      width: 70%;
      vertical-align: middle;
    }
    table {
      border: 1px solid #ddd;
      tr td {
        border: 1px solid #ddd;
        word-wrap: break-word;
        word-break: break-all;
        overflow: hidden;
      }
      td {
        max-width: 150px;
        padding-left: 20px;
        .ant-checkbox-wrapper {
          float: left;
        }
      }
    }
    .tableWidth {
      width: 85%;
      vertical-align: middle;
      display: inline-block;
    }
  }
  .tableLeft {
    margin-left: 6%;
  }
}
</style>
