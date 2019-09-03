<template>
  <div class="main-container">
    <div class="titleContent">
      <a class="goBack" @click="reback">返回</a>
      <span class="patientInfo"> {{ title }}药店 </span>
    </div>
    <div class="content">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item
          label="药店名称"
          v-bind="formItemLayout"
        >
          <a-input v-decorator="['name',{
            initialValue: initData.name,
            rules: [{
              required: true, message: '请输入药店名称',
            }]
          }]" :disabled="title==='查看'" placeholder="请输入药店名称"/>
        </a-form-item>
        <a-form-item
          label="认证标签"
          v-bind="formItemLayout"
        >
          <a-select v-decorator="['label',{
            initialValue: initData.label,
            rules: [{
              required: true, message: '请选择认证标签',
            }]
          }]" style="width: 100%" :disabled="title==='查看'" placeholder="请选择认证标签">
            <a-select-option value="三级甲等">三级甲等</a-select-option>
            <a-select-option value="三级乙等">三级乙等</a-select-option>
            <a-select-option value="三级丙等">三级丙等</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="药店地址"
          v-bind="formItemLayout"
        >
          <a-row :gutter="5">
            <a-col :span="6">
              <a-select v-decorator="['provinceId',{
                initialValue: initData.provinceId,
                rules: [{
                  required: true, message: '请输入省市详细地址',
                }]
              }]" style="width: 100%" :disabled="title==='查看'" placeholder="省" @change="handleProvinceChange">
                <a-select-option v-for="option in options.province" :key="option.value" :value="option.value">{{ option.name }}</a-select-option>
              </a-select>
            </a-col>
            <a-col :span="6">
              <a-select v-decorator="['cityId', {
                initialValue: initData.cityId,
              }]" style="width: 100%" :disabled="title==='查看'" placeholder="市">
                <a-select-option v-for="option in options.city" :key="option.value" :value="option.value">{{ option.name }}</a-select-option>
              </a-select>
            </a-col>
            <a-col :span="12">
              <a-input v-decorator="['address', {
                initialValue: initData.address
              }]" :disabled="title==='查看'" placeholder="请输入详细地址"></a-input>
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item
          label="联系方式"
          v-bind="formItemLayout"
        >
          <a-input v-decorator="['phoneList',{
            initialValue: initData.phoneList,
            rules: [{
              required: true, message: '请输入联系方式',
            }]
          }]" :disabled="title==='查看'" placeholder="请输入联系方式(可输入多个联系方式,用逗号分隔)"/>
        </a-form-item>
        <a-form-item
          label="药房介绍"
          v-bind="formItemLayout"
        >
          <a-textarea :rows="4" v-decorator="['introduction',{
            initialValue: initData.introduction,
            rules: [{
              required: true, message: '请输入药房介绍',
            }]
          }]" :disabled="title==='查看'" placeholder="请输入药房介绍"/>
        </a-form-item>
        <a-form-item
          label="服务开始时间"
          v-bind="formItemLayout"
        >
          <!-- <a-time-picker style="width: 100%" v-decorator="['serviceStartTime',{
            rules: [{
              required: true, message: '请输入服务开始时间',
            }]
          }]" format="HH:mm" :disabled="title==='查看'" placeholder="请输入服务开始时间"/> -->
          <a-input v-decorator="['serviceStartTime',{
            initialValue: initData.serviceStartTime,
            rules: [{
              required: true, message: '请输入服务开始时间',
            }]
          }]" :disabled="title==='查看'" placeholder="请输入服务开始时间,格式:10:30"></a-input>
        </a-form-item>
        <a-form-item
          label="服务结束时间"
          v-bind="formItemLayout"
        >
          <a-input v-decorator="['serviceEndTime',{
            initialValue: initData.serviceEndTime,
            rules: [{
              required: true, message: '请输入服务结束时间',
            }]
          }]" :disabled="title==='查看'" placeholder="请输入服务结束时间,格式:10:30"></a-input>
        </a-form-item>
        <a-form-item
          label="药店图片"
          v-bind="formItemLayout"
        >
          <div>
            <a-upload
              accept="image/*"
              listType="picture-card"
              :fileList="fileList"
              :beforeUpload="beforeUpload"
              @change="handleChange"
            >
              <div v-if="fileList.length < 1">
                <a-icon :type="loading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">点击上传药店图片</div>
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
            :loading="loading"
          >
            保存
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
import { insertDrugstore, updateDrugstore } from '@/api/wechat_module/index.js'
import { getAsyncProvince, getAsyncCity } from '@/utils/getArea.js'
// import moment from 'moment'
export default {
  data () {
    return {
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 }
      },
      fileList: [],
      loading: false,
      options: {
        province: getAsyncProvince() || [],
        city: []
      },
      initData: this.$route.params,
      title: this.$route.params.titleStatus || ''
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  mounted () {
    if (this.initData.provinceId) {
      this.resetCity(this.initData.provinceId)
    }
    // if (this.initData.serviceStartTime) {
    //   this.initData.serviceStartTime = moment(this.initData.serviceStartTime, 'HH:mm')
    //   this.form.setFieldsValue({
    //     serviceStartTime: this.initData.serviceStartTime
    //   })
    // }
    // if (this.initData.serviceEndTime) {
    //   this.initData.serviceEndTime = moment(this.initData.serviceEndTime, 'HH:mm')
    //   this.form.setFieldsValue({
    //     serviceEndTime: this.initData.serviceEndTime
    //   })
    // }
    if (this.$route.params.pic) {
      this.$nextTick(() => {
        this.fileList = [{
          uid: '-1',
          name: 'file',
          url: this.$route.params.pic
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
            this.loading = true
            insertDrugstore(formData, config).then(
              res => {
                this.loading = false
                if (res && res.data && res.data.status === '1') {
                  this.$message.success('保存成功!')
                  this.reback()
                } else {
                  this.$message.error('保存失败!')
                }
              },
              err => {
                this.loading = false
                console.log('上传失败:', err)
              }
            )
          } else {
            formData.append('id', this.initData.id)
            if (this.fileList.length > 0 && this.fileList[0].originFileObj) {
              formData.append('file', this.fileList[0] && this.fileList[0].originFileObj)
            }
            this.loading = true
            updateDrugstore(formData, config).then(
              res => {
                this.loading = false
                if (res && res.data && res.data.status === '1') {
                  this.$message.success('保存成功!')
                  this.reback()
                } else {
                  this.$message.error('保存失败!')
                }
              },
              err => {
                this.loading = false
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
    handleProvinceChange (value) {
      this.form.setFieldsValue({
        cityId: ''
      })
      this.resetCity(value)
    },
    resetCity (value) {
      this.options.city = getAsyncCity(value)
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
