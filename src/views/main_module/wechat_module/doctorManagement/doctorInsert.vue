<template>
  <div class="main-container">
    <div class="titleContent">
      <a class="goBack" @click="reback">返回</a>
      <span class="patientInfo"> {{ title }}医生 </span>
    </div>
    <div class="content">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item
          label="姓名"
          v-bind="formItemLayout"
        >
          <a-input v-decorator="['doctorName',{
            initialValue: initData.doctorName,
            rules: [{
              required: true, message: '请输入医生姓名',
            }]
          }]" :disabled="title==='查看'" placeholder="请输入医生名称"/>
        </a-form-item>
        <a-form-item
          label="性别"
          v-bind="formItemLayout"
        >
          <a-select v-decorator="['sex',{
            initialValue: initData.sex && initData.sex.toString(),
            rules: [{
              required: true, message: '请选择性别',
            }]
          }]" style="width: 100%" :disabled="title==='查看'" placeholder="请选择性别">
            <a-select-option value="1">男</a-select-option>
            <a-select-option value="2">女</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="年龄"
          v-bind="formItemLayout"
        >
          <a-input v-decorator="['age',{
            initialValue: initData.age,
            rules: [{
              required: true, message: '请输入年龄',
            }]
          }]" :disabled="title==='查看'" placeholder="请输入年龄"/>
        </a-form-item>
        <a-form-item
          label="联系方式"
          v-bind="formItemLayout"
        >
          <a-input v-decorator="['contact',{
            initialValue: initData.contact,
            rules: [{
              required: true, message: '请输入联系方式',
            }]
          }]" :disabled="title==='查看'" placeholder="请输入联系方式"/>
        </a-form-item>
        <a-form-item
          label="职称"
          v-bind="formItemLayout"
        >
          <a-input v-decorator="['doctorTitle',{
            initialValue: initData.doctorTitle,
            rules: [{
              required: true, message: '请输入医生职称',
            }]
          }]" :disabled="title==='查看'" placeholder="请输入医生职称"/>
        </a-form-item>
        <a-form-item
          label="科室"
          v-bind="formItemLayout"
        >
          <a-input v-decorator="['department',{
            initialValue: initData.department,
            rules: [{
              required: true, message: '请输入科室',
            }]
          }]" :disabled="title==='查看'" placeholder="请输入科室"/>
        </a-form-item>
        <a-form-item
          label="介绍"
          v-bind="formItemLayout"
        >
          <a-textarea :rows="4" v-decorator="['introduction',{
            initialValue: initData.introduction,
            rules: [{
              required: true, message: '请输入介绍',
            }]
          }]" :disabled="title==='查看'" placeholder="请输入介绍"/>
        </a-form-item>

        <a-form-item
          label="所属医院"
          v-bind="formItemLayout"
        >
          <a-select v-decorator="['hospitalUid',{
            initialValue: initData.hospital && initData.hospital.id,
            rules: [{
              required: true, message: '请选择关联医院',
            }]
          }]" style="width: 100%" :disabled="title==='查看'" placeholder="请选择关联医院">
            <a-select-option v-for="hospital in hospitalList" :key="hospital.id" :value="hospital.id">{{ hospital.hospitalName }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="医生头像"
          v-bind="formItemLayout"
        >
          <div>
            <a-upload
              accept="image/*"
              listType="picture-card"
              class="avatar-uploader"
              :beforeUpload="beforeUpload"
              @change="handleChange"
              :fileList="fileList"
            >
              <div v-if="fileList.length < 1">
                <a-icon :type="loading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">点击上传医生头像</div>
              </div>
            </a-upload>
          </div>
        </a-form-item>
        <a-form-item
          :wrapper-col="{ span: 12, offset: 6 }"
        >
          <a-button
            type="primary"
            html-type="submit"
            :disabled="title==='查看'"
          >
            保存
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
import { queryHospitalList, insertDoctor, updateDoctor } from '@/api/wechat_module/index.js'
export default {
  data () {
    return {
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 }
      },
      fileList: [],
      loading: false,
      initData: this.$route.params,
      title: this.$route.params.titleStatus || '',
      hospitalList: []
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  mounted () {
    this.getHospitalList()
    if (this.$route.params.headPortrait) {
      this.$nextTick(() => {
        this.fileList = [{
          uid: '-1',
          name: 'file',
          url: this.$route.params.headPortrait
        }]
      })
    }
  },
  methods: {
    reback () {
      if (this.$route.query.goindex === 'true') {
        this.$router.push('/')
      } else {
        this.$router.back(-1)
      }
    },
    handleSubmit  (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          let formData = new FormData()
          for (let keys in values) {
            formData.append(keys, values[keys])
          }
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            timeout: 10000000
          }
          if (!this.initData.id) {
            if (this.fileList.length < 1) {
              this.$message.error('请选择图片上传')
              return false
            }
            formData.append('file', this.fileList[0] && this.fileList[0].originFileObj)
            insertDoctor(formData, config).then(
              res => {
                if (res && res.data && res.data.status === '1') {
                  this.$message.success('保存成功!')
                  this.reback()
                } else {
                  this.$message.error('保存失败!')
                }
              },
              err => {
                console.log('上传失败:', err)
              }
            )
          } else {
            formData.append('id', this.initData.id)
            if (this.fileList.length > 0 && this.fileList[0].originFileObj) {
              formData.append('file', this.fileList[0] && this.fileList[0].originFileObj)
            }
            updateDoctor(formData, config).then(
              res => {
                if (res && res.data && res.data.status === '1') {
                  this.$message.success('保存成功!')
                  this.reback()
                } else {
                  this.$message.error('保存失败!')
                }
              },
              err => {
                console.log('上传失败:', err)
              }
            )
          }
        }
      })
    },
    handleChange ({ fileList }) {
      this.fileList = fileList
    },
    beforeUpload (file, fileList) {
      return false
    },
    getHospitalList () {
      let params = {
        'status': 1,
        'pageNumber': 0,
        'pageSize': 10000
      }
      queryHospitalList(params).then(
        (res) => {
          if (res && res.data && res.data.status === '1') {
            this.hospitalList = res.data.body.pageList
          } else {
            this.hospitalList = []
          }
        }
      )
    }
  }
}
</script>
<style lang="scss" scoped>
.main-container{
  text-align: left;
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
  .content{
    margin-top: 20px;
  }
}
</style>
