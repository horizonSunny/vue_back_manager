<template>
  <div class="main-container">
    <div class="titleContent">
      <a class="goBack" @click="reback">返回</a>
      <span class="patientInfo"> {{ title }}医院 </span>
    </div>
    <div class="content">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item
          label="医院名称"
          v-bind="formItemLayout"
        >
          <a-input v-decorator="['hospitalName',{
            initialValue: initData.hospitalName,
            rules: [{
              required: true, message: '请输入医院名称',
            }]
          }]" placeholder="请输入医院名称"/>
        </a-form-item>
        <a-form-item
          label="医院等级"
          v-bind="formItemLayout"
        >
          <a-select v-decorator="['level',{
            initialValue: initData.level,
            rules: [{
              required: true, message: '请输入医院等级',
            }]
          }]" style="width: 100%" placeholder="请选择医院等级">
            <a-select-option value="三级甲等">三级甲等</a-select-option>
            <a-select-option value="三级乙等">三级乙等</a-select-option>
            <a-select-option value="三级丙等">三级丙等</a-select-option>
            <a-select-option value="二级甲等">二级甲等</a-select-option>
            <a-select-option value="二级乙等">二级乙等</a-select-option>
            <a-select-option value="二级丙等">二级丙等</a-select-option>
            <a-select-option value="一级甲等">一级甲等</a-select-option>
            <a-select-option value="一级乙等">一级乙等</a-select-option>
            <a-select-option value="一级丙等">一级丙等</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="医院地址"
          v-bind="formItemLayout"
        >
          <a-row :gutter="5">
            <a-col :span="6">
              <a-select v-decorator="['provinceId',{
                initialValue: initData.provinceId,
                rules: [{
                  required: true, message: '请输入省市详细地址',
                }]
              }]" style="width: 100%" placeholder="省" @change="handleProvinceChange">
                <a-select-option v-for="option in options.province" :key="option.value" :value="option.value">{{ option.name }}</a-select-option>
              </a-select>
            </a-col>
            <a-col :span="6">
              <a-select v-decorator="['cityId', {
                initialValue: initData.cityId,
              }]" style="width: 100%" placeholder="市">
                <a-select-option v-for="option in options.city" :key="option.value" :value="option.value">{{ option.name }}</a-select-option>
              </a-select>
            </a-col>
            <a-col :span="12">
              <a-input v-decorator="['address', {
                initialValue: initData.address
              }]" placeholder="请输入详细地址"></a-input>
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item
          label="医院图片"
          v-bind="formItemLayout"
        >
          <div>
            <a-upload
              accept="image/*"
              name="avatar"
              listType="picture-card"
              class="avatar-uploader"
              :fileList="fileList"
              :beforeUpload="beforeUpload"
              @change="handleChange"
            >
              <div v-if="fileList.length < 1">
                <a-icon :type="loading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">点击上传医院图片</div>
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
import { insertHospital, updateHospital } from '@/api/wechat_module/index.js'
import { getAsyncProvince, getAsyncCity } from '@/utils/getArea.js'
// import { convertBase64UrlToBlob, imgSrcToBase64 } from '@/utils/image.js'
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
      title: this.$route.params.status ? '编辑' : '新增'
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  mounted () {
    if (this.initData.provinceId) {
      this.resetCity(this.initData.provinceId)
    }
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
        if (!values.cityId || !values.address) {
          this.form.setFields({
            provinceId: {
              value: values.provinceId,
              errors: [{
                field: 'provinceId',
                message: '请输入省市详细地址'
              }]
            }
          })
          return false
        }
        if (!err) {
          let formData = new FormData()
          formData.append('hospitalName', values.hospitalName)
          formData.append('provinceId', values.provinceId)
          formData.append('cityId', values.cityId)
          formData.append('address', values.address)
          formData.append('level', values.level)

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
            insertHospital(formData, config).then(
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
            updateHospital(formData, config).then(
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
