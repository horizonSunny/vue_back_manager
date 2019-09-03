<<<<<<< HEAD
/* eslint-disable no-undef */
=======
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
<template>
  <div>
    <a-drawer
      title="筛选报告"
      placement="right"
      :closable="false"
      @close="onClose"
      :visible="visible"
    >
<<<<<<< HEAD
      <p class="drawer" @click="onShow('basic')">基本信息</p>
      <p class="drawer" @click="onShow('report')">测评报告</p>
=======
      <p class="drawer" @click="onClose">基本信息</p>
      <p class="drawer">测评报告</p>
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
    </a-drawer>
    <div class="titleContent">
      <a class="float-left goBack" @click="reback">返回</a>
      <span class="float-left patientInfo"
        >患者姓名：{{ patientInfo["patient"]["patientName"] }}</span
      >
      <span class="float-left patientInfo"
        >性别：{{ patientInfo["patient"]["patientSex"] }}</span
      >
      <span class="float-left patientInfo"
        >年龄：{{ patientInfo["patient"]["patientAge"] }}</span
      >
      <a-button
        type="primary"
        class="float-right patientInfo"
<<<<<<< HEAD
        @click.stop="showDrawer"
        >筛选</a-button
      >
      <a-button
        type="primary"
        class="float-right patientInfo"
        @click="printImg"
        v-show="!this.basePage"
        >打印</a-button
      >
=======
        @click="showDrawer"
        >筛选</a-button
      >
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
      <div class="clear-both"></div>
    </div>
    <div class="content">
      <span class="float-left dp_b"></span>
<<<<<<< HEAD
      <span class="float-left contentTitle">{{
        this.basePage ? "基本信息" : "测评报告"
      }}</span>
      <div class="clear-both"></div>
      <div class="contentBody" v-show="this.basePage">
=======
      <span class="float-left contentTitle">基本信息</span>
      <div class="clear-both"></div>
      <div class="contentBody">
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
        <a-row class="contentRow">
          <a-col :span="8"
            >*基本姓名：<a-input
              disabled
              v-model="patientInfo['patient']['patientName']"
          /></a-col>
          <a-col :span="8"
            >*性别：
            <a-radio-group
              disabled
              v-model="patientInfo['patient']['patientSex']"
            >
              <a-radio :value="0">男</a-radio>
              <a-radio :value="1">女</a-radio>
            </a-radio-group>
          </a-col>
          <a-col :span="8"
            >*出生日期：<a-input
              disabled
              v-model="patientInfo['patient']['patientBirthdate']"
          /></a-col>
        </a-row>
        <a-row class="contentRow">
          <a-col :span="8"
            >*婚姻状况：<a-input
              disabled
              v-model="patientInfo['patient']['marrige']"
          /></a-col>
          <a-col :span="8"
            >*手机号：<a-input
              disabled
              v-model="patientInfo['patient']['mobilephone']"
          /></a-col>
          <a-col :span="8"
            >*职业：<a-input
              disabled
              v-model="patientInfo['patient']['jobType']"
          /></a-col>
        </a-row>
        <a-row class="contentRow">
          <a-col :span="8"
            >*受教育程度：<a-input
              disabled
              v-model="patientInfo['patient']['education']"
          /></a-col>
          <a-col :span="8"
            >*共：<a-input
              disabled
              v-model="patientInfo['patient']['patientName']"
          /></a-col>
          <a-col :span="8"
            >*居住地：<a-input
              disabled
              v-model="patientInfo['patient']['address']"
          /></a-col>
        </a-row>
        <a-row class="contentRow">
          <a-col :span="20"
            >身份证号：<a-input
              disabled
              v-model="patientInfo['patient']['patientIdnumber']"
          /></a-col>
        </a-row>
        <!-- <div class="medicineDetails"> -->
        <a-row class="contentRow medicineDetails borderBottom">
          <a-col :span="25">
<<<<<<< HEAD
            <div>
              *是否确诊老年痴呆：
              <a-radio-group
                disabled
                v-model="
                  patientInfo['medicalHistoryType'][0]['medicalHistoryDegree']
                "
              >
                <a-radio :value="1">MCI</a-radio>
                <a-radio :value="2">早期</a-radio>
                <a-radio :value="3">中期</a-radio>
                <a-radio :value="4">晚期</a-radio>
                <a-radio :value="5">其他</a-radio>
                <a-radio :value="7">不知道</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </div>
          </a-col>
          <a-col :span="25">
=======
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
            <div>*是否用过痴呆药物：</div>
            <template
              v-for="item in patientInfo['medicalHistoryType'][0][
                'medications'
              ]"
            >
              <div :key="item.uid">
                <div class="hasMedicine">
                  <a-icon
                    v-if="item['medicationDegree'] === 1"
                    theme="filled"
                    style="color:rgba(0, 145, 255, 0.926)"
                    type="check-circle"
                  />
                  <a-icon v-else theme="filled" type="check-circle" />
                  <span>{{ item["medicationName"] }}</span>
                  <div
                    v-if="item['medicationDegree'] === 1"
                    class="hasMedicineDetails"
                  >
                    <div>
                      *用药时间：<a-input
                        disabled
                        v-model="item['medicationStartTime']"
                      />—<a-input
                        disabled
                        v-model="item['medicationEndTime']"
                      />
                    </div>
                    <div>
                      *是否停药：
                      <a-radio-group disabled v-model="item['status']">
                        <a-radio :value="1">是</a-radio>
                        <a-radio :value="0">否</a-radio>
                      </a-radio-group>
                    </div>
                    <div>
                      *停药原因：<a-input disabled v-model="item['reason']" />
                    </div>
                  </div>
                  <!-- <a-icon type="check-circle" /> -->
                </div>
                <div></div>
              </div>
            </template>
          </a-col>
          <a-col :span="25">
            <div>
              *是否有脑外伤：
              <a-radio-group
                disabled
                v-model="
                  patientInfo['medicalHistoryType'][1]['medicalHistoryDegree']
                "
              >
                <a-radio :value="0">是</a-radio>
                <a-radio :value="1">否</a-radio>
              </a-radio-group>
            </div>
          </a-col>
          <a-col :span="25">
            <div>
              *是否有老年痴呆家族史：
              <a-radio-group
                disabled
                v-model="
                  patientInfo['medicalHistoryType'][2]['medicalHistoryDegree']
                "
              >
                <a-radio :value="0">是</a-radio>
                <a-radio :value="1">否</a-radio>
              </a-radio-group>
            </div>
          </a-col>
        </a-row>
        <!-- </div> -->
      </div>
<<<<<<< HEAD
      <div v-show="!this.basePage">
        <template v-if="!noReport">
          <a-timeline
            class="timeline"
            ref="timeSelectChecked"
            @click="checkReportTime($event)"
          >
            <template v-for="item in timeCanSelect">
              <a-timeline-item :key="item">{{ item }}</a-timeline-item>
            </template>
          </a-timeline>
          <a-tabs
            class="reportDetail"
            :defaultActiveKey="this.defaultActiveKey"
            @change="assessmentChange"
            type="card"
          >
            <template v-for="item in reportDetailInfo['items']">
              <a-tab-pane :tab="item['assessmentName']" :key="item['uid']">
                <template>
                  <section ref="print">
                    <img
                      :id="'img_' + item['uid']"
                      style="width: 100%"
                      :src="item['reportUrl']"
                      alt="图片未展示"
                    />
                  </section>
                </template>
              </a-tab-pane>
            </template>
          </a-tabs>
        </template>
        <!-- 这边是发送请求后没有报告详情 -->
        <template v-if="noReport">
          <div class="noReport">
            <img src="@/assets/noReportDetail.jpeg" alt="" />
          </div>
        </template>
      </div>
=======
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
    </div>
  </div>
</template>
<script>
<<<<<<< HEAD
import { records } from '@/api/record_module/index'
import Print from 'print-js'
// 依据time值获取对应data方案组中的对应方案
function getReportDetail (time, reportData) {
  const assessment = reportData.filter((item) => {
    return item['assessmentDate'] === time
  })
  return assessment[0]
}
=======
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
export default {
  data: function () {
    return {
      patientInfo: this.$route.params.patientInfo,
<<<<<<< HEAD
      visible: false,
      basePage: true,
      timeCanSelect: [],
      // 存放后端请求回来的数据
      reportDetail: [],
      // 用来存放选中的方案
      reportDetailInfo: [],
      activeChecked: '',
      noReport: false
    }
  },
  methods: {
    printImg () {
      const id = 'img_' + this.activeChecked
      console.log('this.activeChecked_id_', id)
      let imgArr = []
      if (this.reportDetailInfo && this.reportDetailInfo.items) {
        this.reportDetailInfo.items.forEach(item => imgArr.push(item.reportUrl))
      }
      if (imgArr.length > 0) {
        Print({
          printable: imgArr,
          type: 'image',
          documentTitle: '测评量表'
        })
      }
      // Print({
      //   printable: id,
      //   type: 'html',
      //   // 继承原来的所有样式
      //   targetStyles: ['*']
      // })

      if (this.activeChecked !== '') {
        console.log('activeChecked_', this.activeChecked)
      } else {
        // this.activeChecked = this.defaultActiveKey
        console.log('activeChecked_default_', this.defaultActiveKey)
      }
      // console.log('this.$refs.printImg.$el_', this.$refs.printImg)
      // window.document.body.innerHTML = this.$refs.printImg
      // window.print()
    },
    showDrawer () {
      this.visible = true
      // this.basePage = !this.basePage
=======
      visible: false
    }
  },
  methods: {
    showDrawer () {
      this.visible = true
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
    },
    onClose () {
      this.visible = false
    },
<<<<<<< HEAD
    onShow (view) {
      if (view === 'basic') {
        this.basePage = true
      } else {
        this.basePage = false
      }
      this.onClose()
    },
=======
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
    reback () {
      if (this.$route.query.goindex === 'true') {
        this.$router.push('/')
      } else {
        this.$router.back(-1)
      }
<<<<<<< HEAD
    },
    checkReportTime (event) {
      // 判断一下，假如点击的不是圆圈，则什么都不做，让返回
      console.log('checkReportTime-in')
      const clickDom = event.target
      console.log('clickDom_', clickDom)
      if (clickDom['className'].indexOf('ant-timeline-item-head') === -1) {
        return
      }
      // 对全部元素进行统一处理
      this.$refs.timeSelectChecked.$el.querySelectorAll('.ant-timeline-item-head').forEach(item => {
        item.classList.remove('ant-timeline-item-head-check')
        item.classList.add('ant-timeline-item-head-blue')
      })
      // 对当前元素进行操作
      const element = event.target.parentNode.querySelector('.ant-timeline-item-head')
      element.classList.remove('ant-timeline-item-head-blue')
      element.classList.add('ant-timeline-item-head-check')
      // 以上全是操作样式，下面是数据处理
      const time = element.nextSibling.innerText
      this.reportDetailInfo = getReportDetail(time, this.reportDetail)
      // 重新获取选中那个,获取选中的默认第一个值，因为该组件无法获取默认选中那个
      // 要进行打印必须获取默认值，切换时候改变this.activeChecked值，这个值和#id绑定
      this.activeChecked = this.defaultActiveKey
      console.log('this.defaultActiveKey_', this.defaultActiveKey)
    },
    assessmentChange (key) {
      console.log('key_', key)
      this.activeChecked = key
    }
  },
  computed: {
    defaultActiveKey: function () {
      if (this.reportDetailInfo['items']) {
        return this.reportDetailInfo['items'][0]['uid']
      } else {
        return ''
      }
    }
    // imgId: function () {
    //   return 'img_' + this.activeChecked
    // }
  },
  mounted () {
    const uid = this.$route.params['patientInfo']['patient']['uid']
    // console.log("this.$route.params['patientInfo']", this.$route.params['patientInfo'])
    records({ uid: uid }).then((response) => {
      console.log('response_', response)
      const data = response.data.body
      this.reportDetail = data
      if (data.length === 0) {
        this.noReport = true
        return
      }
      this.timeCanSelect = data.map(item => item['assessmentDate'])
      // 设置第一个
      setTimeout(() => {
        const firstElement = this.$refs.timeSelectChecked.$el.querySelector('.ant-timeline-item-head')
        console.log('firstElement_nextSibling_', firstElement.nextSibling.innerText)
        firstElement.classList.remove('ant-timeline-item-head-blue')
        firstElement.classList.add('ant-timeline-item-head-check')
        const time = firstElement.nextSibling.innerText
        this.reportDetailInfo = getReportDetail(time, this.reportDetail)
        console.log('reportDetailInfo_', this.reportDetailInfo)
        // 重新获取选中那个,获取选中的默认第一个值，因为该组件无法获取默认选中那个
        // 要进行打印必须获取默认值，切换时候改变this.activeChecked值，这个值和#id绑定
        this.activeChecked = this.defaultActiveKey
        console.log('this.defaultActiveKey_', this.defaultActiveKey)
      }, 0)
    })
  }
}
</script>
<style lang="scss" >
=======
    }
  }
}
</script>
<style lang="scss">
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
.drawer {
  padding-left: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.7);
  cursor: pointer;
}
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
  .dp_b {
    display: inline-block;
    height: 27px;
    width: 10px;
    background-color: #1890ff;
  }
  .contentTitle {
    font-size: 18px;
    margin-left: 10px;
  }
  .contentBody {
    margin-top: 15px;
    .contentRow {
      text-align: left;
      padding-left: 20px;
      border: 1px solid rgba(128, 128, 128, 0.7);
      // border: 1px solid rgba(0, 145, 255, 0.926);
      border-bottom: 0px;
      height: 55px;
      line-height: 55px;
      overflow: hidden;
      .ant-input {
        width: 50%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .medicineDetails {
      height: auto;
      .hasMedicine {
        margin-left: 20%;
        .hasMedicineDetails {
          border: 1px solid rgba(128, 128, 128, 0.7);
          width: 70%;
          height: 170px;
          padding-left: 10px;
          .ant-input {
            width: 30%;
          }
        }
      }
    }
    .borderBottom {
      border-bottom: 1px solid rgba(128, 128, 128, 0.7);
    }
  }
<<<<<<< HEAD
  .timeline {
    width: 15%;
    display: inline-block;
    float: left;
    margin-top: 100px;
    height: 225px;
    overflow: auto;
    padding: 6px;
    border-radius: 5px;
  }
  .reportDetail {
    margin-top: 20px;
    float: left;
    width: 60%;
    margin-left: 100px;
    /deep/ .ant-tabs-top-bar {
      text-align: left;
    }
  }
  .noReport {
    margin-top: 100px;
  }
}
.ant-timeline-item-head-check {
  border-color: #1890ff;
}
.ant-timeline-item-head-blue {
  border-color: grey;
  // border-color: red;
}
.ant-timeline-item /deep/ .ant-timeline-item-head-blue {
  border-color: grey;
=======
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
}
</style>
