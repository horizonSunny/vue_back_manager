<template>
  <div>
    <div class="titleContent">
      <a class="float-left goBack" href="">返回</a>
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
            :displayRender="displayRender"
            @change="onChange"
            changeOnSelect
            :defaultValue="defaultDepartment"
          />
        </a-form-item>
        <a-form-item
          label="姓名"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'note',
              {
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
              'note',
              {
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
          <a-select
            disabled
            v-decorator="[
              'gender',
              {
                rules: [
                  { required: true, message: 'Please select your gender!' }
                ]
              }
            ]"
            placeholder="Select a option and change input text above"
          >
            <a-select-option value="male">
              male
            </a-select-option>
            <a-select-option value="female">
              female
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="角色"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-select
            v-decorator="[
              'gender',
              {
                rules: [
                  { required: true, message: 'Please select your gender!' }
                ]
              }
            ]"
            placeholder="Select a option and change input text above"
          >
            <a-select-option value="male">
              male
            </a-select-option>
            <a-select-option value="female">
              female
            </a-select-option>
          </a-select>
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
// 涌来循环options，添加label 和 value 值
function selectOptions (source) {
  var sourceCopy = source instanceof Array ? [] : {}
  if (Array.isArray(sourceCopy)) { } else {
    source = Object.assign(source, { value: source['key'],
      label: source['title'] })
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
      checked: true,
      hasChecked: [],
      options: [],
      defaultDepartment: ['zhejiang', 'hangzhou']
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
    handleSubmit () { },
    displayRender ({ labels }) {
      return labels[labels.length - 1]
    }
  },
  created () {
    this.options = selectOptions(this.organization)
  }
  // beforeRouteEnter (to, from, next) {
  //   roleList().then((response) => {
  //     next(vm => {
  //       vm.responseData = response.data.body
  //       vm.data = roleListFilter(response.data.body)
  //       console.log('vm.responseData_', vm.responseData)
  //     })
  //   })
  // }
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
