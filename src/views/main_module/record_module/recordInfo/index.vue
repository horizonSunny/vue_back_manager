<template>
  <div>
    <a-drawer
      title="筛选报告"
      placement="right"
      :closable="false"
      @close="onClose"
      :visible="visible"
    >
      <p class="drawer">基本信息</p>
      <p class="drawer">测评报告</p>
    </a-drawer>
    <div class="title">
      <a class="float-left goBack" href="">返回</a>
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
        @click="showDrawer"
        >筛选</a-button
      >
      <div class="clear-both"></div>
    </div>
    <div class="content">
      <span class="float-left dp_b"></span>
      <span class="float-left contentTitle">基本信息</span>
      <div class="clear-both"></div>
      <div class="contentBody">
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
            <div>*是否用过痴呆药物：</div>
            <template
              v-for="item in patientInfo['medicalHistoryType'][0][
                'medications'
              ]"
            >
              <div :key="item.uid">
                <div class="hasMedicine">
                  <a-icon
                    v-if="item['medicationName'] === 0"
                    theme="filled"
                    style="color:rgba(0, 145, 255, 0.926)"
                    type="check-circle"
                  />
                  <a-icon v-else theme="filled" type="check-circle" />
                  <span>{{ item["medicationName"] }}</span>
                  <div
                    v-if="item['medicationName'] !== 0"
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
    </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      patientInfo: this.$route.params.patientInfo,
      visible: false
    }
  },
  methods: {
    showDrawer () {
      this.visible = true
    },
    onClose () {
      this.visible = false
    }
  }
}
</script>
<style lang="scss">
.drawer {
  padding-left: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.7);
  cursor: pointer;
}
.title {
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
}
</style>
