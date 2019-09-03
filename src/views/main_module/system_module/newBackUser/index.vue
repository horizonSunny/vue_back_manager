<template>
  <div class="main-container">
    <div class="titleContent">
      <a class="float-left goBack" @click="reback">返回</a>
      <span class="float-left patientInfo">{{ operate }}后台用户 </span>
      <div class="clear-both"></div>
    </div>
    <div class="content">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item
          label="部门"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 16 }"
        >
          <!-- option-cascader:代表传入的组织结构
               option-operate: multiple是多选，default默认单选，
               have-select:编辑状态传入的id数组，
               change-select：cascader组件表示是否一选择就改变
               select-function：表示过滤selectOptions函数判断
           -->
          <a-col :span="18">
            <MultipleCascader
              :option-cascader="organization"
              option-operate="default"
              :have-select="orgId"
              :change-select="true"
              select-function="organization"
              :disabled-info="disabledInfo"
              @selectValues="orgSelectChange"
            />
          </a-col>

          <a-col :span="4">
            <a-popover
              placement="bottom"
              :visible="showHospital"
              trigger="click"
              destroyTooltipOnHide
            >
              <template slot="content">
                <div class="popoverHeight">
                  <p v-for="hospital in hospitalList" :key="hospital.uid">
                    {{ hospital.hospitalName }}
                  </p>
                </div>
              </template>
              <a
                :disabled="disabledInfo"
                class="hospital"
                @click.stop="viewHospital"
                >查看医院</a
              >
            </a-popover>
          </a-col>
        </a-form-item>
        <a-form-item
          label="姓名"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            :disabled="disabledInfo"
            v-decorator="[
              'fullname',
              {
                initialValue: this.fullname,
                rules: [{ required: true, message: '请输入姓名!' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="手机号码"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            :disabled="disabledInfo"
            v-decorator="[
              'mobilenumber',
              {
                initialValue: this.mobilenumber,
                rules: [
                  { required: true, message: '请输入手机号!' },
                  {
                    pattern: /^1[34578]\d{9}$/,
                    message: '手机号格式不正确!'
                  }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="邮箱"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            :disabled="disabledInfo"
            v-decorator="[
              'email',
              {
                initialValue: this.email,
                rules: [
                  { required: true, message: '请输入邮箱!' },
                  {
                    type: 'email',
                    message: '邮箱格式错误!'
                  }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="角色"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          style="text-align: left"
        >
          <a-radio-group
            :disabled="disabledInfo"
            v-decorator="[
              'roleIds',
              {
                initialValue: this.roleIds,
                rules: [{ required: true, message: '请输入角色!' }]
              }
            ]"
          >
            <a-radio
              v-for="item in allRoleList"
              :key="item.uid"
              :value="item.uid"
              >{{ item.roleName }}</a-radio
            >
          </a-radio-group>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button :disabled="disabledInfo" @click="checkedInfo()">
            取消
          </a-button>
          <span style="display:inline-block;width:10%"></span>
          <a-button
            :disabled="disabledInfo"
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
import { mapGetters } from 'vuex'
import { userInsert, userUpdate, hospitalFind } from '@/api/system_moudle/index'
import MultipleCascader from '@/components/MultipleCascader'
// 涌来循环options，添加label 和 value 值
function selectOptions (source) {
  var sourceCopy = source instanceof Array ? [] : {}
  if (Array.isArray(sourceCopy)) { } else {
    if (source) {
      source = Object.assign(source, { value: source['key'],
        label: source['title'] })
    } else {
      return
    }
  }

  for (var item in source) {
    sourceCopy[item] =
      typeof source[item] === 'object' ? selectOptions(source[item]) : source[item]
  }
  return sourceCopy
}
export default {
  components: {
    MultipleCascader
  },
  data: function () {
    return {
      form: this.$form.createForm(this),
      operate: this.$route.params.operate,
      options: [],
      email: this.$route.params['info']['email'] || '',
      fullname: this.$route.params['info']['fullname'] || '',
      mobilenumber: this.$route.params['info']['mobilenumber'] || '',
      orgId: [this.$route.params['info']['orgId']] || [],
      roleIds: this.$route.params['info']['roleIds'] || '',
      // 上面两个
      uid: this.$route.params['info']['uid'] || '',
      allRoleList: this.$route.params.allRoleList || [], // 所有角色列表
      showHospital: false,
      hospitalList: [],
      disabledInfo: false,
      loading: false
    }
  },
  computed: {
    ...mapGetters(['user', 'organization'])
  },
  methods: {
    checkedInfo () {
      // console.log('this.organization_', this.organization)
      // const data = selectOptions(this.organization)
      // console.log('this.organization_', data)
      this.$router.back(-1)
    },
    onChange (value) {
      console.log(value)
    },
    handleSubmit (e) {
      e.preventDefault()
      let backUser = {}
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          Object.assign(backUser, values, {
            'roleIds': [values.roleIds],
            'orgId': this.orgId[0]
          })
          this.loading = true
          if (this.operate === '新建') {
            userInsert(backUser).then((res) => {
              this.loading = false
              this.reback()
            })
          }
          if (this.operate === '编辑') {
            const updata = Object.assign(backUser, { uid: this.$route.params['info']['uid'] })
            userUpdate(updata).then((res) => {
              this.loading = false
              this.reback()
            })
          }
        } else {
          return false
        }
      })
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
    },
    viewHospital (e) {
      // 点击气泡了
      // 根据当前部门获取医院列表
      const noData = [{
        'uid': 'none',
        'hospitalName': '没有数据'
      }]
      this.hospitalList = []
      if (this.orgId.length > 0) {
        const param = {
          'orgId': this.orgId[0]
        }
        hospitalFind(param).then(
          (res) => {
            if (res.data && res.data.status === '1') {
              this.hospitalList = res.data.body
            } else {
              this.hospitalList = noData
            }
            this.showHospital = true
            const func = () => {
              this.showHospital = false
            }
            document.querySelector('.main-container').removeEventListener('click', func)
            document.querySelector('.main-container').addEventListener('click', func)
          },
          (err) => {
            console.log(err)
            this.hospitalList = noData
          }
        )
      }
    },
    orgSelectChange (selectValue) {
      this.orgId = [selectValue]
    }
  },
  created () {
    // this.organization = [this.user['organization']]
    this.options = selectOptions(this.organization)
    if (this.$route.params['operate'] === '查看') {
      this.disabledInfo = true
    }
    console.log('organization_backManager_2', this.organization)
    console.log('this.$route.params_', this.$route.params['info'])
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
.popoverHeight {
  max-height: 500px;
  overflow: auto;
}
</style>
