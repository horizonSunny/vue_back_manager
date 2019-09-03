<template>
  <div>
    <div class="titleContent">
      <a class="float-left goBack" @click="reback">返回</a>
      <span class="float-left patientInfo">{{ operate }}测评 </span>
      <div class="clear-both"></div>
    </div>
    <div class="content">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item
          label="测评名称"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'assessmentName',
              {
                initialValue: this.assessmentName,
<<<<<<< HEAD
                rules: [
                  { required: true, message: '测评名称不能为空!' },
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
          label="测评简介"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-textarea
            v-decorator="[
              'assessmentContent',
              {
                initialValue: this.assessmentContent,
<<<<<<< HEAD
                rules: [{ required: true, message: '测评简介不能为空!' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="量表简称"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'testId',
              {
                initialValue: this.testId,
                rules: [{ required: true, message: '量表简称不能为空!' }]
=======
                rules: [{ required: true, message: 'Please input your note!' }]
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="用时"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'duration',
              {
                initialValue: this.duration,
<<<<<<< HEAD
                rules: [
                  { required: true, message: '测评用时不能为空!' },
                  {
                    pattern: /^[0-9]*$/,
                    message: '请输入数字'
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
          label="分类"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-select
            v-decorator="[
              'classify',
              {
                initialValue: this.classify + '',
<<<<<<< HEAD
                rules: [{ required: true, message: '测评分类不能为空' }]
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
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
<<<<<<< HEAD
          <a-button @click="cancle()">
            取消
          </a-button>
          <span style="display:inline-block;width:10%"></span>
          <a-button type="primary" html-type="submit" :loading="loading">
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
import { assessmentUpdata, assessmentInsert } from '@/api/evaluation_module/index'
export default {
  data: function () {
    return {
      form: this.$form.createForm(this),
      operate: this.$route.params.operate,
      assessmentName: this.$route.params['info']['assessmentName'] || '',
      assessmentContent: this.$route.params['info']['assessmentDescribe'] || '',
      duration: this.$route.params['info']['duration'] || '',
<<<<<<< HEAD
      testId: this.$route.params['info']['testId'] || '',
      loading: false
      // classify: this.$route.params['info']['classify'] || ''
    }
  },
  computed: {
    classify: function () {
      const item = this.$route.params['info']['classify']
      if (item === 0 || (item !== undefined && item !== null)) {
        console.log('item_', item)
        return item
      } else {
        return ''
      }
    }
=======
      classify: this.$route.params['info']['classify'] || ''
    }
  },
  computed: {
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
  },
  methods: {
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
<<<<<<< HEAD
          // 接口
          this.loading = true
          if (this.operate === '新建') {
            assessmentInsert(assessment).then((res) => {
              this.loading = false
              this.reback()
            })
          }
          if (this.operate === '编辑') {
            const updata = Object.assign(assessment, { uid: this.$route.params['info']['uid'] })
            assessmentUpdata(updata).then((res) => {
              this.loading = false
              this.reback()
            })
          }
        }
      })
=======
        }
      })
      if (this.operate === '新建') {
        assessmentInsert(assessment).then((res) => {
          this.reback()
        })
      }
      if (this.operate === '编辑') {
        const updata = Object.assign(assessment, { uid: this.$route.params['info']['uid'] })
        assessmentUpdata(updata).then((res) => {
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
    cancle () {
      this.reback()
=======
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
    }
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
