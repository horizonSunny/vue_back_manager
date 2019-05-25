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
              v-decorator="[
                'roleName',
                {
                  initialValue: this.roleName,
                  rules: [
                    { required: true, message: 'Please input your note!' }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item
            label="角色名称"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
          >
            <a-textarea
              class="roleWidth"
              v-decorator="[
                'description',
                {
                  initialValue: this.description,
                  rules: [
                    { required: true, message: 'Please input your note!' }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item
            label="角色名称"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
          >
            <!-- <span class="tableWidth"> -->
            <a-checkbox-group
              :value="hasChecked"
              class="tableWidth"
              style="width:150%"
              @change="onChange"
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
                    </td>
                  </tr>
                </tbody>
              </table>
            </a-checkbox-group>
            <a-checkbox @change="checkAll">全选</a-checkbox>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
            <a-button @click="checkedInfo()">
              取消
            </a-button>
            <span style="display:inline-block;width:10%"></span>
            <a-button type="primary" html-type="submit">
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
function getPermission (permission, arr) {
  for (let item = 0; item < permission.length; item++) {
    arr.push(permission[item]['permissionIdentify'])
    if (permission[item]['children']['length'] !== 0) {
      getPermission(permission[item]['children'], arr)
    }
  }
}
export default {
  data: function () {
    return {
      form: this.$form.createForm(this),
      operate: this.$route.params.operate,
      checked: true,
      hasChecked: [],

      description: this.$route.params['info']['description'] || '',
      roleName: this.$route.params['info']['roleName'] || ''
    }
  },
  methods: {
    onChange (checkedValues) {
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
        roleInsert(roleUser).then((res) => { })
      }
      if (this.operate === '编辑') {
        const updata = Object.assign(roleUser, { uid: this.$route.params['info']['uid'] })
        roleUpdate(updata).then((res) => { })
      }
    }
  },
  created () {
    //  console.log('this.hospitals_', this.hospitals)
    // this.options = this.hospitals
    const permission = this.$route.params['info']['permissions']
    let arr = []
    getPermission(permission, arr)
    // permissions获参
    this.hasChecked = arr
    console.log('this.$route.params_', this.$route.params)
    console.log('arr_', arr)
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
