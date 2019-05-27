<template>
  <div>
    <div class="titleContent">
      <a class="float-left goBack" @click="reback">返回</a>
      <span class="float-left patientInfo">{{ operate }}角色 </span>
      <div class="clear-both"></div>
    </div>
    <div class="content">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item
          label="部门"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-cascader
            :options="options"
            v-decorator="[
              'orgId',
              {
                initialValue: this.orgId,
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
          label="邮箱"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'email',
              {
                initialValue: this.email,
                rules: [{ required: true, message: 'Please input your note!' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="角色"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-radio-group
            v-decorator="[
              'roleIds',
              {
                initialValue: this.roleIds,
                rules: [{ required: true, message: 'Please input your note!' }]
              }
            ]"
          >
            <a-radio :value="0">项目经理</a-radio>
            <a-radio :value="1">销售经理</a-radio>
            <a-radio :value="2">市场经理</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button @click="checkedInfo()">
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
import { userInsert, userUpdate } from '@/api/system_moudle/index'
// 涌来循环options，添加label 和 value 值
function selectOptions (source) {
  var sourceCopy = source instanceof Array ? [] : {}
  if (Array.isArray(sourceCopy)) { } else {
    if (source) {
      source = Object.assign(source, { value: source['key'],
        label: source['title'] })
    } else {
      return
    }
  }

  for (var item in source) {
    sourceCopy[item] =
      typeof source[item] === 'object' ? selectOptions(source[item]) : source[item]
  }
  return sourceCopy
}
export default {
  data: function () {
    return {
      form: this.$form.createForm(this),
      operate: this.$route.params.operate,
      options: [],
      email: this.$route.params['info']['email'] || '',
      fullname: this.$route.params['info']['fullname'] || '',
      mobilenumber: this.$route.params['info']['mobilenumber'] || '',
      // 找不到
      // orgId: this.$route.params['info']['orgId'] || [],
      orgId: [],
      roleIds: this.$route.params['info']['roleIds'] || '',
      // 上面两个
      uid: this.$route.params['info']['uid'] || ''
    }
  },
  computed: {
    ...mapGetters(['organization'])
  },
  methods: {
    checkedInfo () {
      // console.log('this.organization_', this.organization)
      // const data = selectOptions(this.organization)
      // console.log('this.organization_', data)
    },
    onChange (value) {
      console.log(value)
    },
    handleSubmit (e) {
      e.preventDefault()
      let backUser = {}
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          Object.assign(backUser, values)
        }
      })
      if (this.operate === '新建') {
        userInsert(backUser).then((res) => { })
      }
      if (this.operate === '编辑') {
        const updata = Object.assign(backUser, { uid: this.$route.params['info']['uid'] })
        userUpdate(updata).then((res) => { })
      }
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
    }
  },
  created () {
    console.log('organization_backManager_1', this.organization)
    this.options = selectOptions(this.organization)
    console.log('organization_backManager_2', this.organization)
    console.log('this.$route.params_', this.$route.params['info'])
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
