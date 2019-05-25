<template>
  <div>
    <div class="titleContent">
      <a class="float-left goBack" href="">返回</a>
      <span class="float-left patientInfo">{{ operate }}方案 </span>
      <div class="clear-both"></div>
    </div>
    <div class="content">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item
          label="部门名称"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'orgName',
              {
                rules: [{ required: true, message: 'Please input your note!' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="上级部门"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-cascader
            :options="options"
            v-decorator="[
              'parentOrgId',
              {
                initialValue: this.parentOrgId,
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
          label="医院"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-cascader
            :options="hospitalOptions"
            v-decorator="[
              'hospitals',
              {
                initialValue: this.hospitals,
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
import { } from '@/api/system_moudle/index'
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
// 依据传过来的组织结构获取父级部门及当前部门，生成一个数组
// function queryParentOrg (orgId, orgization) {
//   const arr = []
//   for (let item = 0; item < orgization.length; item++) {
//     if (orgization[item]['value'] === orgId) {
//       arr.push(orgization[item]['value'])
//       return arr
//     } else {
//       queryParentOrg(orgId, orgization[item]['children'])
//     }
//   }
// }
export default {
  data: function () {
    return {
      form: this.$form.createForm(this),
      operate: this.$route.params.operate,
      options: [],
      hospitalOptions: [],
      parentOrgId: []
    }
  },
  computed: {
    ...mapGetters(['organization', 'hospitals'])
  },
  methods: {
    checkedInfo () {
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
    this.hospitalOptions = this.hospitals
    console.log('this.organization_', this.organization)
    console.log('this.$route.params_', this.$route.params)
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
