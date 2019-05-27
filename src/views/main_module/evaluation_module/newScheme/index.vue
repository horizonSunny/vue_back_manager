<template>
  <div>
    <div class="titleContent">
      <a class="float-left goBack" @click="reback">返回</a>
      <span class="float-left patientInfo">{{ operate }}测评方案 </span>
      <div class="clear-both"></div>
    </div>
    <div class="content">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item
          label="方案名称"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'assessmentPlanName',
              {
                initialValue: this.assessmentPlanName,
                rules: [{ required: true, message: 'Please input your note!' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="方案简介"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-textarea
            v-decorator="[
              'assessmentPlanDescribe',
              {
                initialValue: this.assessmentPlanDescribe,
                rules: [{ required: true, message: 'Please input your note!' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="分类"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-select
            v-decorator="[
              'classify',
              {
                initialValue: this.classify + '',
                rules: [
                  { required: true, message: 'Please select your gender!' }
                ]
              }
            ]"
            placeholder="Select a option and change input text above"
          >
            <a-select-option value="0">
              基础版
            </a-select-option>
            <a-select-option value="1">
              临床版
            </a-select-option>
          </a-select>
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
          label="选择测评"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-select
            mode="multiple"
            v-decorator="[
              'items',
              {
                initialValue: this.items,
                rules: [
                  { required: true, message: 'Please select your gender!' }
                ]
              }
            ]"
            placeholder="Select a option and change input text above"
          >
            <a-select-option
              v-for="item in assessmentOptions"
              :key="item['uid']"
              :value="item['uid']"
            >
              {{ item["assessmentName"] }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button>
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
import { findAssitem } from '@/api/evaluation_module/index'
// 涌来循环options，添加label 和 value 值
export default {
  data: function () {
    return {
      form: this.$form.createForm(this),
      operate: this.$route.params.operate,
      options: [],
      assessmentOptions: [],
      assessmentPlanDescribe: this.$route.params['info']['assessmentPlanDescribe'] || '',
      assessmentPlanName: this.$route.params['info']['assessmentPlanName'] || '',
      // 为0时候自动判断为false
      classify: this.$route.params['info']['classify'] || ''
      // items: this.$route.params['info']['items'] || ''
    }
  },
  computed: {
    ...mapGetters(['hospitals']),
    items: function () {
      const items = this.$route.params['info']['items']
      if (items) {
        const item = []
        for (let i = 0; i < items.length; i++) {
          item.push(items[i]['uid'])
        }
        return item
      } else {
        return undefined
      }
    },
    hospitalName: function () {
      const items = this.$route.params['info']['items']
      if (items) {
        // 没看到hospatialId
        const item = [items['provinceId'], items['cityId'], '']
        return item
      } else {
        return undefined
      }
    }
  },
  methods: {
    onChange (value) {
      console.log(value)
    },
    handleSubmit (e) {
      e.preventDefault()
      let assessmentPlan = {}
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          Object.assign(assessmentPlan, values)
        }
      })
      // if (this.operate === '新建') {
      //   insertDoctor(assessmentPlan).then((res) => { })
      // }
      // if (this.operate === '编辑') {
      //   const updata = Object.assign(assessmentPlan, { uid: this.$route.params['info']['uid'] })
      //   updateDoctor(updata).then((res) => { })
      // }
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
    console.log('this.hospitals_', this.hospitals)
    this.options = this.hospitals
    findAssitem().then((resp) => {
      console.log('resp_', resp.data.body)
      this.assessmentOptions = resp.data.body
    })
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
