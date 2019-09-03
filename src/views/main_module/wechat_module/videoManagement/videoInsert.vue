<template>
  <div class="main-container">
    <div class="titleContent">
      <a class="goBack" @click="reback">返回</a>
      <span class="patientInfo"> {{ title }}视屏 </span>
      <div class="clear-both"></div>
    </div>
    <div class="content">
      <a-form v-if="title !== '查看'" :form="form" @submit="handleSubmit">
        <a-form-item
          label="上传视屏"
          v-bind="formItemLayout"
        >
          <div>
            <p>请上传时长小于30分钟的视频，支持.mp4,.ogg,.mpeg格式视屏。</p>
            <a-upload
              accept="video/mp4,application/ogg,video/mpeg,video/mpeg"
              list-type="picture"
              :fileList="videoList"
              :beforeUpload="beforeUpload"
              @change="handleVideoChange"
            >
              <a-button>上传视频</a-button>
            </a-upload>
          </div>
        </a-form-item>
        <a-form-item
          label="视屏封面"
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
                <div class="ant-upload-text">点击上传封面</div>
              </div>
            </a-upload>
          </div>
          <div>进入编辑页面可以选择需要上传的视频封面</div>
        </a-form-item>
        <a-form-item
          label="视屏标题"
          v-bind="formItemLayout"
        >
          <a-input v-decorator="['title',{
            initialValue: initData.title,
            rules: [{
              required: true, message: '请输入标题',
            }]
          }]" maxlength="30" :disabled="title==='查看'" placeholder="请输入视屏标题"/>
        </a-form-item>
        <a-form-item
          label="视屏简介"
          v-bind="formItemLayout"
        >
          <a-textarea v-decorator="['introduction',{
            initialValue: initData.introduction,
            rules: [{
              required: true, message: '请输入简介',
            }]
          }]" maxlength="200" :rows="4" :disabled="title==='查看'" placeholder="请输入视屏简介"/>
        </a-form-item>
        <a-form-item
          label="关联医生"
          v-bind="formItemLayout"
        >
          <a-select v-decorator="['doctorId',{
            initialValue: initData.doctorInfo && initData.doctorInfo.id,
            rules: [{
              required: true, message: '请选择关联医院',
            }]
          }]" style="width: 100%" :disabled="title==='查看'" placeholder="请选择关联医院">
            <a-select-option v-for="doctor in doctorList" :key="doctor.id" :value="doctor.id">{{ doctor.doctorName }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :wrapper-col="{ span: 12, offset: 6 }"
        >
          <a-button
            type="primary"
            html-type="submit"
            v-if="title!=='查看'"
            :loading="loading"
          >
            保存
          </a-button>
          <a-button
            type="primary"
            style="margin-left: 20px;"
            @click="handleStatus"
            v-if="title!=='查看'"
            :disabled = 'initData.status!==0'
          >
            发布
          </a-button>
        </a-form-item>
      </a-form>
      <div v-if="title === '查看'">
        <div>
          <a-form>
            <a-form-item
              label="视屏封面"
              v-bind="formItemLayout"
            >
              <img :src="initData.coverUrl" width="100%" alt="">
            </a-form-item>
            <a-form-item
              label="视屏"
              v-bind="formItemLayout"
            >
            <video controls width="100%">
                <source :src="initData.videoUrl"
                        type="video/webm">
                <source :src="initData.videoUrl"
                        type="video/mp4">
                视屏无法查看
            </video>
            </a-form-item>
            <a-form-item
              label="视屏标题"
              v-bind="formItemLayout"
            >
              <p>{{ initData.title }}</p>
            </a-form-item>
            <a-form-item
              label="关联医生"
              v-bind="formItemLayout"
            >
              <p>{{ initData.doctorInfo && initData.doctorInfo.doctorName }}</p>
            </a-form-item>
            <a-form-item
              label="视屏简介"
              v-bind="formItemLayout"
            >
              <p>{{ initData.introduction }}</p>
            </a-form-item>
            <a-form-item
              label="医生简介"
              v-bind="formItemLayout"
            >
              <p>{{ initData.doctorInfo && initData.doctorInfo.introduction }}</p>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { insertVideo, updateVideo, updateVideoStatus, queryDoctorList } from '@/api/wechat_module/index.js'
export default {
  data () {
    return {
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 }
      },
      videoObj: '',
      fileList: [],
      videoList: [],
      loading: false,
      initData: this.$route.params,
      title: this.$route.params.titleStatus || '',
      doctorList: []
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  mounted () {
    this.getDoctorList()
    if (this.$route.params.coverUrl) {
      this.$nextTick(() => {
        this.fileList = [{
          uid: '-1',
          name: 'file',
          url: this.$route.params.coverUrl
        }]
      })
    }
    if (this.$route.params.videoUrl) {
      this.$nextTick(() => {
        this.videoList = [{
          uid: '-2',
          name: 'file',
          url: this.$route.params.videoUrl
        }]
      })
    }
  },
  methods: {
    reback () {
      if (this.$route.query.goindex === 'true') {
        this.$router.push('/')
      } else {
        this.$router.push({// 你需要接受路由的参数再跳转，最终跳转是在main函数里面
          name: 'materialManagement',
          params: {
            activeKey: '1'
          }
        })
      }
    },
    handleSubmit  (e) {
      e.preventDefault()
      if (this.videoList.length < 1) {
        this.$message.error('请选择上传视屏!')
        return false
      }
      this.form.validateFields((err, values) => {
        if (!err) {
          let formData = new FormData()
          for (let keys in values) {
            formData.append(keys, values[keys])
          }
          // formData.append('file', this.videoList[0].originFileObj)
          // formData.append('file1', this.videoList[0].originFileObj)
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            timeout: 10000000
          }
          if (!this.initData.id) {
            if (this.videoList.length < 1 || this.fileList.length < 1) {
              this.$message.error('请选择视屏和封面')
              return false
            }
            formData.append('file', this.videoList[0] && this.videoList[0].originFileObj)
            formData.append('file1', this.fileList[0] && this.fileList[0].originFileObj)
            this.loading = true
            insertVideo(formData, config).then(
              res => {
                this.loading = false
                if (res && res.data && res.data.status === '1') {
                  this.$message.success('保存成功!')
                  this.initData = res.data.body
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
            if (this.videoList.length > 0 && this.videoList[0].originFileObj) {
              formData.append('file', this.videoList[0] && this.videoList[0].originFileObj)
            }
            if (this.fileList.length > 0 && this.fileList[0].originFileObj) {
              formData.append('file1', this.fileList[0] && this.fileList[0].originFileObj)
            }
            this.loading = true
            updateVideo(formData, config).then(
              res => {
                this.loading = false
                if (res && res.data && res.data.status === '1') {
                  this.$message.success('保存成功!')
                  this.initData = res.data.body
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
    handleVideoChange ({ fileList }) {
      this.videoList = fileList
    },
    beforeUpload (file) {
      return false
    },
    handleStatus () {
      if (!this.initData.id) {
        this.$message.error('当前数据有误,请重新进入页面发布或在列表页发布!')
        return false
      }
      let param = {
        'id': this.initData.id,
        'status': 1
      }
      updateVideoStatus(param).then(
        (res) => {
          if (res && res.data && res.data.status === '1') {
            this.$message.success('发布成功!')
            this.initData = res.data.body
          } else {
            this.$message.error('发布失败!')
          }
        },
        (error) => {
          console.log('请求失败', error)
        }
      )
    },
    getDoctorList () {
      let params = {
        'pageNumber': 0,
        'pageSize': 10000
      }
      queryDoctorList(params).then(
        (res) => {
          if (res && res.data && res.data.status === '1') {
            this.doctorList = res.data.body.pageList
          } else {
            this.doctorList = []
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
