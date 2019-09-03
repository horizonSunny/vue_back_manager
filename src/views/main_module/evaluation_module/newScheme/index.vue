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
<<<<<<< HEAD
            :disabled="disabledInfo"
=======
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
            v-decorator="[
              'assessmentPlanName',
              {
                initialValue: this.assessmentPlanName,
<<<<<<< HEAD
                rules: [
                  { required: true, message: '请输入测评方案名称!' },
                  {
                    pattern: /^[\u4e00-\u9fa5\S]{1,20}$/,
                    message: '请输入20位内的字符'
                  }
                ]
=======
                rules: [{ required: true, message: 'Please input your note!' }]
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
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
<<<<<<< HEAD
            :disabled="disabledInfo"
=======
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
            v-decorator="[
              'assessmentPlanDescribe',
              {
                initialValue: this.assessmentPlanDescribe,
<<<<<<< HEAD
                rules: [{ required: true, message: '请输入测评方案简介!' }]
=======
                rules: [{ required: true, message: 'Please input your note!' }]
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
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
<<<<<<< HEAD
            :disabled="disabledInfo"
=======
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
            v-decorator="[
              'classify',
              {
                initialValue: this.classify + '',
<<<<<<< HEAD
                rules: [{ required: true, message: '请选择测评方案分类!' }]
              }
            ]"
            placeholder="选择测评分类"
=======
                rules: [
                  { required: true, message: 'Please select your gender!' }
                ]
              }
            ]"
            placeholder="Select a option and change input text above"
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
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
<<<<<<< HEAD
          required
        >
          <MultipleCascader
            :option-cascader="options"
            option-operate="multiple"
            :have-select="hasSelectOptions"
            :change-select="false"
            select-function="hospital"
            @selectValues="hospitalSelectChange"
            :disabled-info="disabledInfo"
=======
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
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
          />
        </a-form-item>
        <a-form-item
          label="选择测评"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-select
<<<<<<< HEAD
            :disabled="disabledInfo"
=======
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
            mode="multiple"
            v-decorator="[
              'items',
              {
                initialValue: this.items,
<<<<<<< HEAD
                rules: [{ required: true, message: '请选择测评!' }]
              }
            ]"
            placeholder="请选择测评"
=======
                rules: [
                  { required: true, message: 'Please select your gender!' }
                ]
              }
            ]"
            placeholder="Select a option and change input text above"
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
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
<<<<<<< HEAD
          <a-button :disabled="disabledInfo" @click="cancle()">
            取消
          </a-button>
          <span style="display:inline-block;width:10%"></span>
          <a-button
            :disabled="disabledInfo"
            type="primary"
            html-type="submit"
            :loading="loading"
          >
=======
          <a-button>
            取消
          </a-button>
          <span style="display:inline-block;width:10%"></span>
          <a-button type="primary" html-type="submit">
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
            保存
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { findAssitem, assessmentPlanInsert, assessmentPlanUpdate } from '@/api/evaluation_module/index'
<<<<<<< HEAD
// 引入封装的级联多选
import MultipleCascader from '@/components/MultipleCascader'
// 涌来循环options，添加label 和 value 值
export default {
  components: {
    MultipleCascader
  },
=======
// 涌来循环options，添加label 和 value 值
export default {
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
  data: function () {
    return {
      form: this.$form.createForm(this),
      operate: this.$route.params.operate,
      options: [],
      assessmentOptions: [],
      assessmentPlanDescribe: this.$route.params['info']['assessmentPlanDescribe'] || '',
      assessmentPlanName: this.$route.params['info']['assessmentPlanName'] || '',
      // 为0时候自动判断为false
<<<<<<< HEAD
      // classify: this.$route.params['info']['classify'] || '',
      hasSelectOptions: this.$route.params['info']['hasHospitalsUid'] || [],
      disabledInfo: false,
      loading: false
=======
      classify: this.$route.params['info']['classify'] || ''
      // items: this.$route.params['info']['items'] || ''
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
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
<<<<<<< HEAD
    classify: function () {
      const item = this.$route.params['info']['classify']
      if (item === 0 || (item !== undefined && item !== null)) {
        return item
      } else {
        return ''
=======
    hospitalName: function () {
      const items = this.$route.params['info']['items']
      if (items) {
        // 没看到hospatialId
        const item = [items['provinceId'], items['cityId'], '']
        return item
      } else {
        return undefined
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
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
<<<<<<< HEAD
          Object.assign(assessmentPlan, values, { hospitalUids: this.hasSelectOptions })
          // 接口
          this.loading = true
          if (this.hasSelectOptions['length'] === 0) {
            this.$message.info('请选中所属医院')
            return
          }
          if (this.operate === '新建') {
            assessmentPlanInsert(assessmentPlan).then((res) => {
              this.loading = false
              this.reback()
            })
          }
          if (this.operate === '编辑') {
            console.log('assessmentPlan_', assessmentPlan)
            const updata = Object.assign(assessmentPlan, { uid: this.$route.params['info']['uid'] })
            assessmentPlanUpdate(updata).then((res) => {
              this.loading = false
              this.reback()
            })
          }
        }
      })
=======
          const hospitalName = values['hospitalName']
          const length = hospitalName.length
          Object.assign(assessmentPlan, values, { hospitalUid: hospitalName[length - 1] })
        }
      })
      if (this.operate === '新建') {
        assessmentPlanInsert(assessmentPlan).then((res) => {
          this.reback()
        })
      }
      if (this.operate === '编辑') {
        const updata = Object.assign(assessmentPlan, { uid: this.$route.params['info']['uid'] })
        assessmentPlanUpdate(updata).then((res) => {
          this.reback()
        })
      }
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
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
<<<<<<< HEAD
    },
    hospitalSelectChange (selectValue) {
      this.hasSelectOptions = selectValue
    },
    cancle () {
      this.reback()
=======
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
    }
  },
  created () {
    console.log('this.hospitals_', this.hospitals)
    this.options = this.hospitals
    findAssitem().then((resp) => {
      console.log('resp_', resp.data.body)
      this.assessmentOptions = resp.data.body
    })
<<<<<<< HEAD
    if (this.$route.params['operate'] === '查看') {
      this.disabledInfo = true
    }
=======
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
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
