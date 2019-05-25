<template>
  <div>
    <div class="titleContent">
      <a class="float-left goBack" href="">返回</a>
      <span class="float-left patientInfo">{{ operate }}脑健康管理师 </span>
      <div class="clear-both"></div>
    </div>
    <div class="content">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item
          label="姓名"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'fullname',
              {
                initialValue: this.fullname,
                rules: [{ required: true, message: 'Please input your note!' }]
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
            v-decorator="[
              'mobilenumber',
              {
                initialValue: this.mobilenumber,
                rules: [{ required: true, message: 'Please input your note!' }]
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
            v-decorator="[
              'sex',
              {
                initialValue: this.sex,
                rules: [{ required: true, message: 'Please input your note!' }]
              }
            ]"
          >
            <a-radio :value="1">女</a-radio>
            <a-radio :value="0">男</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="所属医院"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-cascader
            :options="options"
            v-decorator="[
              'hospitalName',
              {
                initialValue: hospitalName,
                rules: [
                  {
                    type: 'array',
                    required: true,
                    message: 'Please select your habitual residence!'
                  }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="邮箱"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'registerEmail',
              {
                initialValue: this.registerEmail,
                rules: [{ required: true, message: 'Please input your note!' }]
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
            v-decorator="[
              'idnumber',
              {
                initialValue: this.idnumber,
                rules: [{ required: true, message: 'Please input your note!' }]
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
            v-decorator="[
              'workePerience',
              {
                initialValue: this.workePerience,
                rules: [{ required: true, message: 'Please input your note!' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button @click="cancel()">
            取消
          </a-button>
          <span style="display:inline-block;width:10%"></span>
          <a-button type="primary" html-type="submit">
            保存
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { insertDoctor, updateDoctor } from '@/api/user_module/index'
// 涌来循环options，添加label 和 value 值
export default {
  data: function () {
    return {
      form: this.$form.createForm(this),
      operate: this.$route.params.operate,
      options: [],
      fullname: this.$route.params['info']['fullname'] || '',
      hospital: [],
      idnumber: this.$route.params['info']['idnumber'] || '',
      mobilenumber: this.$route.params['info']['mobilenumber'] || '',
      registerEmail: this.$route.params['info']['registerEmail'] || '',
      sex: this.$route.params['info']['sex'] || '',
      workePerience: this.$route.params['info']['workePerience'] || ''
    }
  },
  computed: {
    ...mapGetters(['hospitals'])
  },
  methods: {
    cancel () { },
    onChange (value) {
      console.log(value)
    },
    handleSubmit (e) {
      e.preventDefault()
      let assessment = {}
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          Object.assign(assessment, values)
        }
      })
      if (this.operate === '新建') {
        insertDoctor(assessment).then((res) => { })
      }
      if (this.operate === '编辑') {
        const updata = Object.assign(assessment, { uid: this.$route.params['info']['uid'] })
        updateDoctor(updata).then((res) => { })
      }
    },
    displayRender ({ labels }) {
      return labels[labels.length - 1]
    }
  },
  created () {
    console.log('this.hospitals_', this.hospitals)
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
