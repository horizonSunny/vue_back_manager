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
<<<<<<< HEAD
              :disabled="disabledInfo"
              placeholder="请输入角色名称(限10个字以内)"
              maxlength="10"
=======
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
              v-decorator="[
                'roleName',
                {
                  initialValue: this.roleName,
<<<<<<< HEAD
                  rules: [{ required: true, message: '请填写角色名称!' }]
=======
                  rules: [
                    { required: true, message: 'Please input your note!' }
                  ]
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
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
<<<<<<< HEAD
              :disabled="disabledInfo"
              placeholder="请输入角色名称(限50个字以内)"
              maxlength="50"
=======
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
              class="roleWidth"
              v-decorator="[
                'description',
                {
                  initialValue: this.description,
<<<<<<< HEAD
                  rules: [{ required: true, message: '请填写角色描述!' }]
=======
                  rules: [
                    { required: true, message: 'Please input your note!' }
                  ]
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
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
<<<<<<< HEAD
              :disabled="disabledInfo"
=======
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
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
<<<<<<< HEAD
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
=======
                  <tr>
                    <td>
                      <a-checkbox value="1">患者档案</a-checkbox>
                    </td>
                    <td>
                      <a-checkbox value="11">档案列表</a-checkbox>
                    </td>
                    <td>
                      <a-checkbox value="111">基本信息</a-checkbox>
                      <a-checkbox value="112">测评报告</a-checkbox>
                      <a-checkbox value="113">导出</a-checkbox>
                    </td>
                  </tr>
                  <tr>
                    <td rowspan="2">
                      <a-checkbox value="2">量表管理</a-checkbox>
                    </td>
                    <td>
                      <a-checkbox value="21">测评量表</a-checkbox>
                    </td>
                    <td>
                      <a-checkbox value="211">新建测评</a-checkbox>
                      <a-checkbox value="212">编辑</a-checkbox>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a-checkbox value="22">方案管理</a-checkbox>
                    </td>
                    <td>
                      <a-checkbox value="221">新建测评方案</a-checkbox>
                      <a-checkbox value="222">编辑</a-checkbox>
                      <a-checkbox value="223">查看</a-checkbox>
                      <a-checkbox value="224">禁用</a-checkbox>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a-checkbox value="3">用户管理</a-checkbox>
                    </td>
                    <td>
                      <a-checkbox value="31">脑健康师管理</a-checkbox>
                    </td>
                    <td>
                      <a-checkbox value="311">导入</a-checkbox>
                      <a-checkbox value="312">导出</a-checkbox>
                      <a-checkbox value="313">新建</a-checkbox>
                      <a-checkbox value="314">编辑</a-checkbox>
                      <a-checkbox value="315">查看</a-checkbox>
                      <a-checkbox value="316">禁用</a-checkbox>
                      <a-checkbox value="317">同步数据</a-checkbox>
                    </td>
                  </tr>
                  <tr>
                    <td rowspan="2">
                      <a-checkbox value="4">量表管理</a-checkbox>
                    </td>
                    <td>
                      <a-checkbox value="41">角色管理</a-checkbox>
                    </td>
                    <td>
                      <a-checkbox value="411">新增角色</a-checkbox>
                      <a-checkbox value="412">编辑</a-checkbox>
                      <a-checkbox value="413">查看</a-checkbox>
                      <a-checkbox value="414">禁用</a-checkbox>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a-checkbox value="42">后台用户</a-checkbox>
                    </td>
                    <td>
                      <a-checkbox value="421">新建后台用户</a-checkbox>
                      <a-checkbox value="422">编辑</a-checkbox>
                      <a-checkbox value="423">查看</a-checkbox>
                      <a-checkbox value="424">禁用</a-checkbox>
                      <a-checkbox value="425">编辑部门</a-checkbox>
                      <a-checkbox value="426">添加部门</a-checkbox>
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
                    </td>
                  </tr>
                </tbody>
              </table>
            </a-checkbox-group>
<<<<<<< HEAD
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
=======
            <a-checkbox @change="checkAll">全选</a-checkbox>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
            <a-button @click="checkedInfo()">
              取消
            </a-button>
            <span style="display:inline-block;width:10%"></span>
            <a-button type="primary" html-type="submit">
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
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
<<<<<<< HEAD
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

=======
import { permission } from '../permissionUid'
import { roleInsert, roleUpdate } from '@/api/system_moudle/index'
// 比较两个数组元素，获取不同的值
function getArrDifference (arr1, arr2) {
  return arr1.concat(arr2).filter(function (v, i, arr) {
    return arr.indexOf(v) === arr.lastIndexOf(v)
  })
}
// 切割字符串，放进数组,用于权限操作
function splitString (str, arr) {
  // console.log('str_', str, 'arr_', arr)
  const newStr = str.slice(0, str.length - 1)
  // console.log('newStr_', newStr)
  arr.push(newStr)
  if (newStr.length !== 0) {
    splitString(newStr, arr)
  } else {
    return arr
  }
  // 防止有空字符串数组
  // const index = arr.indexOf('')
  // console.log('index_', index)
  // arr.splice(index, 1)
  return arr
}
// 数组去重
function removeDuplicateItems (arr) {
  return [...new Set(arr)]
}
// 依据permission数据结构获取permission,三层数据结构
// function getPermission (permission, arr) {
//   for (let item = 0; item < permission.length; item++) {
//     arr.push(permission[item]['permissionIdentify'])
//     if (permission[item]['children']['length'] !== 0) {
//       getPermission(permission[item]['children'], arr)
//     }
//   }
// }
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
export default {
  data: function () {
    return {
      form: this.$form.createForm(this),
      operate: this.$route.params.operate,
      checked: true,
      hasChecked: [],

      description: this.$route.params['info']['description'] || '',
<<<<<<< HEAD
      roleName: this.$route.params['info']['roleName'] || '',
      permissionList: [],
      allCheck: [],
      allChecked: false,
      disabledInfo: false,
      loading: false
=======
      roleName: this.$route.params['info']['roleName'] || ''
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
    }
  },
  methods: {
    onChange (checkedValues) {
<<<<<<< HEAD
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
=======
      // 表示是选择还是取消
      const checked = checkedValues.length > this.hasChecked.length
      // 过滤后的添加或者取消的权限value值
      // console.log('checkedValues_', checkedValues)
      const operatedPermission = getArrDifference(checkedValues, this.hasChecked)[0]
      // const operatedPermission = getArrDifference([1, 2, 3, 4, 5], [1, 2, 3])
      console.log('operatedPermission_', operatedPermission)
      console.log('this.hasChecked_', this.hasChecked)
      if (checked) {
        // 这个是选中
        const arr = splitString(operatedPermission, []).filter((item) => { return item.length !== 0 })
        arr.push(operatedPermission)
        const newChecked = removeDuplicateItems(this.hasChecked.concat(arr))
        console.log('newChecked_', newChecked)
        this.hasChecked = newChecked
      } else {
        // 这个是取消
        const newArr = this.hasChecked.filter((item) => {
          const itemInfo = item.substring(0, operatedPermission.length)
          console.log('itemInfo_', itemInfo)
          if (itemInfo !== operatedPermission) {
            return item
          }
        })
        this.hasChecked = newArr
      }
    },
    checkAll (e) {
      const allChecked = Object.keys(permission)
      const checked = e.target.checked
      console.log('checked_', checked)
      if (checked) {
        this.hasChecked = allChecked
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
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
<<<<<<< HEAD
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
=======
          console.log('Received values of form: ', values)
          Object.assign(roleUser, values)
        }
      })
      let permissionChecked = []
      this.hasChecked.filter((item) => {
        const allPermissions = Object.keys(permission)
        if (allPermissions.indexOf(item) !== -1) {
          // console.log('permission[item]_', permission[item])
          permissionChecked.push(permission[item])
        }
      })
      roleUser.permissions = permissionChecked
      console.log('permissions_', permissionChecked)
      console.log('roleUser_', roleUser)
      if (this.operate === '新建') {
        roleInsert(roleUser).then((res) => {
          this.reback()
        })
      }
      if (this.operate === '编辑') {
        const updata = Object.assign(roleUser, { uid: this.$route.params['info']['uid'] })
        roleUpdate(updata).then((res) => {
          this.reback()
        })
      }
    }
  },
  created () {
    //  console.log('this.hospitals_', this.hospitals)
    // this.options = this.hospitals
    this.hasChecked = this.$route.params['info']['permissions'] ? this.$route.params['info']['permissions'] : []
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
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
