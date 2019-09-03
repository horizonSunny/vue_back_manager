<template>
  <div>
    <div class="titleContent">
      <a class="float-left goBack" @click="reback">返回</a>
      <span class="float-left patientInfo">{{ operate }}角色 </span>
      <div class="clear-both"></div>
    </div>
    <div class="content">
      <a-row>
        <a-form :form="form" @submit="handleSubmit">
          <a-form-item
            label="角色名称"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
          >
            <a-input
              :disabled="disabledInfo"
              placeholder="请输入角色名称(限10个字以内)"
              maxlength="10"
              v-decorator="[
                'roleName',
                {
                  initialValue: this.roleName,
                  rules: [{ required: true, message: '请填写角色名称!' }]
                }
              ]"
            />
          </a-form-item>
          <a-form-item
            label="角色描述"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
          >
            <a-textarea
              :disabled="disabledInfo"
              placeholder="请输入角色名称(限50个字以内)"
              maxlength="50"
              class="roleWidth"
              v-decorator="[
                'description',
                {
                  initialValue: this.description,
                  rules: [{ required: true, message: '请填写角色描述!' }]
                }
              ]"
            />
          </a-form-item>
          <a-form-item
            label="分配权限"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
          >
            <!-- <span class="tableWidth"> -->
            <a-checkbox-group
              :value="hasChecked"
              class="tableWidth"
              style="width:150%"
              @change="onChange"
              :disabled="disabledInfo"
            >
              <table style="text-align: center;width:100%">
                <thead>
                  <tr>
                    <th>一级模块</th>
                    <th>二级模块</th>
                    <th>三级模块</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="permission in permissionList"
                    :key="permission.uid"
                  >
                    <td
                      :rowspan="permission.firstLevel.subRow"
                      v-if="permission.firstLevel.showSubRow"
                    >
                      <a-checkbox
                        :value="permission.firstLevel.uid.toString()"
                        >{{ permission.firstLevel.permissionName }}</a-checkbox
                      >
                    </td>
                    <td>
                      <a-checkbox
                        :value="permission.secendLevel.uid.toString()"
                      >
                        {{ permission.secendLevel.permissionName }}</a-checkbox
                      >
                    </td>
                    <td>
                      <a-checkbox
                        v-for="thirdItem in permission.thirdLevel"
                        :key="thirdItem.uid"
                        :value="thirdItem.uid.toString()"
                        >{{ thirdItem.permissionName }}</a-checkbox
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </a-checkbox-group>
            <a-checkbox
              :disabled="disabledInfo"
              @change="checkAll"
              :checked="allChecked"
              >全选</a-checkbox
            >
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
            <a-button :disabled="disabledInfo" @click="reback">
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
        <!-- 下面 -->
      </a-row>
    </div>
  </div>
</template>
<script>
// import { permission } from '../permissionUid'
import { roleInsert, roleUpdate, allPermission } from '@/api/system_moudle/index'
import { deepCopy } from '@/utils/tools'
// 处理权限数据
function transPremission (permissionList) {
  let tempPermission = []
  permissionList.forEach(item => {
    let tempItem = {}
    if (item.children.length > 0) {
      // 有二级菜单
      let firstLevel, secendLevel, thirdLevel
      firstLevel = {
        'showSubRow': true,
        'subRow': item.children.length, // 第一列合并行数
        'permissionIdentify': item.permissionIdentify,
        'permissionName': item.permissionName,
        'uid': item.uid
      }
      item.children.forEach((secendItem, secendIndex) => {
        secendLevel = JSON.parse(JSON.stringify(secendItem))
        let tempFirstLevel = {}
        if (secendItem.children.length > 0) {
          thirdLevel = secendItem.children
        }
        if (secendIndex > 0) {
          tempFirstLevel = Object.assign({}, firstLevel, { 'showSubRow': false })
        } else {
          tempFirstLevel = Object.assign({}, firstLevel)
        }

        tempItem = {
          'firstLevel': tempFirstLevel,
          'secendLevel': secendLevel,
          'thirdLevel': thirdLevel
        }
        tempPermission.push(tempItem)
      })
    } else {
      let firstLevel, secendLevel, thirdLevel
      // 没有二级菜单
      firstLevel = {
        'showSubRow': true,
        'subRow': 1, // 第一列合并行数
        'permissionIdentify': item.permissionIdentify,
        'permissionName': item.permissionName,
        'uid': item.uid
      }
      tempItem = {
        'firstLevel': firstLevel,
        'secendLevel': secendLevel,
        'thirdLevel': thirdLevel
      }
      tempPermission.push(tempItem)
    }
  })
  return tempPermission
}

// 获取数组不同的值
// @arrsLong: 长数组
// @arrShort：短数组
function compareArr (arrsLong, arrShort) {
  let different = ''
  arrsLong.map(item => {
    if (!arrShort.includes(item)) {
      different = item
    }
  })
  return different
}

// 删除数组指定元素
function removeArrItem (arr, item) {
  let index = arr.indexOf(item)
  if (index > -1) {
    arr.splice(index, 1)
  }
  return arr
}

export default {
  data: function () {
    return {
      form: this.$form.createForm(this),
      operate: this.$route.params.operate,
      checked: true,
      hasChecked: [],

      description: this.$route.params['info']['description'] || '',
      roleName: this.$route.params['info']['roleName'] || '',
      permissionList: [],
      allCheck: [],
      allChecked: false,
      disabledInfo: false,
      loading: false
    }
  },
  methods: {
    onChange (checkedValues) {
      let finalPermission = []
      // 判断是点击的哪一个权限
      if (this.hasChecked.length > checkedValues.length) {
        // 点击取消权限
        let descItem = compareArr(this.hasChecked, checkedValues)
        let tempChecked = deepCopy(checkedValues)
        this.permissionList.map(item => {
          // 取消一级菜单,取消掉所有二级三级权限
          if (item.firstLevel.uid === Number(descItem)) {
            if (item.secendLevel.uid) {
              removeArrItem(tempChecked, item.secendLevel.uid.toString())
              if (item.thirdLevel.length > 0) {
                item.thirdLevel.map(thirdItem => {
                  removeArrItem(tempChecked, thirdItem.uid.toString())
                })
              }
            }
          }
          // 取消二级菜单,取消所有三级权限
          if (item.secendLevel.uid === Number(descItem)) {
            if (item.thirdLevel.length > 0) {
              item.thirdLevel.map(thirdItem => {
                removeArrItem(tempChecked, thirdItem.uid.toString())
              })
            }
          }
          // 取消三级权限不做任何操作
        })
        finalPermission = tempChecked
      } else {
        // 点击新增权限
        let descItem = compareArr(checkedValues, this.hasChecked)
        let tempChecked = deepCopy(checkedValues)
        this.permissionList.map(item => {
          // 增加一级菜单,不做任何操作
          // 增加二级菜单,若没有一级权限则新增一级菜单
          if (item.secendLevel.uid === Number(descItem)) {
            tempChecked.push(item.firstLevel.uid.toString())
          } else if (item.firstLevel.uid !== Number(descItem)) {
            // 增加三级权限,若没有一级二级权限则新增一级二级菜单
            item.thirdLevel.map(thirdItem => {
              if (thirdItem.uid === Number(descItem)) {
                tempChecked.push(item.firstLevel.uid.toString())
                tempChecked.push(item.secendLevel.uid.toString())
              }
            })
          }
        })
        finalPermission = [...new Set(tempChecked)]
      }

      this.hasChecked = finalPermission
      if (this.allCheck.sort().toString() === this.hasChecked.sort().toString()) {
        this.allChecked = true
      } else {
        this.allChecked = false
      }
    },
    checkAll (e) {
      this.allChecked = e.target.checked
      if (e.target.checked) {
        this.hasChecked = this.allCheck
      } else {
        this.hasChecked = []
      }
    },
    reback () {
      if (this.$route.query.goindex === 'true') {
        this.$router.push('/')
      } else {
        this.$router.back(-1)
      }
    },
    handleSubmit (e) {
      e.preventDefault()
      let roleUser = {}
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          Object.assign(roleUser, values)
          // 接口
          let permissionChecked = []
          this.hasChecked.map((item) => {
            permissionChecked.push(Number(item))
          })
          roleUser.permissions = permissionChecked
          this.loading = true
          if (this.operate === '新建') {
            roleInsert(roleUser).then((res) => {
              this.loading = false
              this.reback()
            })
          }
          if (this.operate === '编辑') {
            const updata = Object.assign(roleUser, { uid: this.$route.params['info']['uid'] })
            roleUpdate(updata).then((res) => {
              this.loading = false
              this.reback()
            })
          }
        }
      })
    },
    getPremissionList () {
      this.allCheck = []
      this.permissionList = []
      allPermission().then(
        (res) => {
          if (res.data && res.data.status === '1') {
            let checkedPermission = this.$route.params['info']['permissions'] ? this.$route.params['info']['permissions'] : []
            this.allCheck = this.getAllChecked(res.data.body, [])
            this.hasChecked = this.getHasChecked(res.data.body, checkedPermission, [])
            if (this.allCheck.sort().toString() === this.hasChecked.sort().toString()) {
              this.allChecked = true
            }
            this.permissionList = transPremission(res.data.body)
          } else {
            this.permissionList = []
          }
        },
        (err) => {
          console.log('err:', err)
          this.permissionList = []
        }
      )
    },
    // 获取全选数据
    getAllChecked (arr, allCheck) {
      arr.forEach(item => {
        allCheck.push(item.uid.toString())
        if (item.children.length > 0) {
          this.getAllChecked(item.children, allCheck)
        }
      })
      return allCheck
    },
    // 筛选选中数据
    getHasChecked (arr, checkedPermission, hasCheck) {
      if (checkedPermission.length > 0) {
        for (let i = 0; i < arr.length; i++) {
          if (checkedPermission.includes(arr[i].permissionIdentify)) {
            hasCheck.push(arr[i].uid.toString())
          }
          if (arr[i].children.length > 0) {
            this.getHasChecked(arr[i].children, checkedPermission, hasCheck)
          }
        }
      }
      return hasCheck
    }
  },
  created () {
    // this.hasChecked = this.$route.params['info']['permissions'] ? this.$route.params['info']['permissions'] : []
    this.getPremissionList()
    if (this.$route.params['operate'] === '查看') {
      this.disabledInfo = true
    }
    // let arr = []
    // getPermission(permission, arr)
    // permissions获参
    // this.hasChecked = arr
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
    .tableWidth {
      width: 150%;
      vertical-align: middle;
      display: inline-block;
    }
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
}
</style>
