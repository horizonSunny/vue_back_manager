<template>
  <div class="main-container">
    <div class="titleContent">
      <a class="goBack" @click="reback">返回</a>
      <span class="patientInfo"> {{ title }}图文资讯 </span>
    </div>
    <div class="content">
      <div v-if="title !== '查看'">
        <div class="content-mg">
          标题: <a-input placeholder="请输入标题" v-model="initData.title"></a-input>
        </div>
        <div class="content-mg">
            作者: <a-input placeholder="请输入作者" v-model="initData.author"></a-input>
          </div>
        <div class="content-mg">
          <tinymce-editor ref="editor" v-model="tinymceHtml"></tinymce-editor>
        </div>
        <div class="content-mg"><a-button type='primary' :loading="loading" @click="handleSubmit">保存</a-button></div>
      </div>
      <div v-if="title === '查看'">
        <div class="view-title">{{ initData.title }}</div>
        <div class="view-author">{{ initData.author }} {{ initData.createTime }}</div>
        <div class="view-author" v-html="initData.content"></div>
      </div>
    </div>
  </div>
</template>
<script>
import TinymceEditor from '@/components/tinymce-editor.vue'
import { insertGraphic, updateGraphic } from '@/api/wechat_module/index.js'
export default {
  data () {
    return {
      tinymceHtml: this.$route.params.content ? this.$route.params.content : '',
      title: this.$route.params.titleStatus || '',
      initData: this.$route.params ? this.$route.params : {title: '', author: '', content: ''},
      loading: false
    }
  },
  components: {
    TinymceEditor
  },
  methods: {
    reback () {
      if (this.$route.query.goindex === 'true') {
        this.$router.push('/')
      } else {
        // this.$router.back(-1)
        this.$router.push({// 你需要接受路由的参数再跳转，最终跳转是在main函数里面
          name: 'materialManagement',
          params: {
            activeKey: '2'
          }
        })
      }
    },
    handleSubmit () {
      if (!this.initData.title || !this.initData.author) {
        this.$message.error('请填写标题和作者')
        return false
      }
      // 保存
      let param = {
        'author': this.initData.author,
        'title': this.initData.title,
        'content': this.tinymceHtml
      }
      if (!this.initData.id) {
        this.loading = true
        insertGraphic(param).then(
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
        param.id = this.initData.id
        this.loading = true
        updateGraphic(param).then(
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
    .content-mg{
      margin-bottom: 20px;
    }
    .view-title{
      font-size: 24px;
      font-weight: 600;
    }
    .view-author{
      font-size: 14px;
      margin-bottom: 20px;
      margin-top: 20px;
    }
  }
}
</style>
