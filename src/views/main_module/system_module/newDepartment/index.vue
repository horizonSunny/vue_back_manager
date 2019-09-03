<template>
  <div>
    <div class="titleContent">
      <a class="float-left goBack" @click="reback">返回</a>
      <span class="float-left patientInfo">{{ operate }}部门 </span>
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
                initialValue: this.name,
                rules: [{ required: true, message: '请输入部门名称!' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="上级部门"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <MultipleCascader
            :option-cascader="organization"
            option-operate="default"
            :have-select="orgHasSelect"
            :change-select="true"
            select-function="organization"
            @selectValues="orgSelectChange"
          />
        </a-form-item>
        <a-form-item
          label="医院"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <MultipleCascader
            :option-cascader="hospitalOptions"
            option-operate="multiple"
            :have-select="hospitalHasSelect"
            :change-select="false"
            select-function="hospital"
            @selectValues="hospitalSelectChange"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button @click="cancel()">
            取消
          </a-button>
          <span style="display:inline-block;width:10%"></span>
          <a-button type="primary" html-type="submit" :loading="loading">
            保存
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { orgUpdate, orgInsert } from '@/api/system_moudle/index'
import MultipleCascader from '@/components/MultipleCascader'
import store from '@/store'
// 涌来循环options，添加label 和 value 值
function selectOptions (source) {
  var sourceCopy = source instanceof Array ? [] : {}
  if (Array.isArray(sourceCopy)) { } else {
    if (source) {
      source = Object.assign(source, {
        value: source['key'],
        label: source['title']
      })
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
  components: {
    MultipleCascader
  },
  data: function () {
    return {
      form: this.$form.createForm(this),
      operate: this.$route.params.operate,
      orgId: this.$route.params.orgId,
      hospitalHasSelect: this.$route.params.hasSelectOptions || [],
      options: [],
      hospitalOptions: [],
      orgHasSelect: [this.$route.params['realResult']['parentOrgId']] || [],
      name: this.$route.params['realResult']['name'] || '',
      loading: false
    }
  },
  computed: {
    ...mapGetters(['organization', 'hospitals'])
  },
  methods: {
    cancel () {
      this.reback()
    },
    onChange (value) {
      console.log(value)
    },
    handleSubmit (e) {
      e.preventDefault()
      let parentId = Array.isArray(this.orgHasSelect) ? this.orgHasSelect[0] : this.orgHasSelect
      // form表单的数值
      const orgInfo = {
        hospitals: this.hospitalHasSelect,
        orgName: this.name,
        parentOrgId: parentId
      }
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          Object.assign(orgInfo, values)
          const orgId = this.$store.getters.user['organization']['key']
          this.loading = true
          if (this.operate === '添加') {
            orgInsert(orgInfo).then((res) => {
              this.loading = false
              store.dispatch('GetOrganization', { orgId: orgId })
              this.reback()
            })
          }
          if (this.operate === '编辑') {
            const updata = Object.assign(orgInfo, { uid: this.$route.params['realResult']['uid'] })
            orgUpdate(updata).then((res) => {
              this.loading = false
              store.dispatch('GetOrganization', { orgId: orgId })
              this.reback()
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
    // 选择的医院 和 父级组织
    hospitalSelectChange (selectValue) {
      // console.log('selectValue_', selectValue)
      this.hospitalHasSelect = selectValue
    },
    orgSelectChange (selectValue) {
      this.orgHasSelect = selectValue
    }
  },
  created () {
    this.options = selectOptions(this.organization)
    this.hospitalOptions = this.hospitals
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
