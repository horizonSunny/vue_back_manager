<template>
  <div>
    <div class="title">
      <a class="float-left goBack" href="">返回</a>
      <span class="float-left patientInfo" @click="test"
        >{{ operate }}角色
      </span>
      <div class="clear-both"></div>
    </div>
    <div class="content">
      <a-row>
        <a-col class="marginTop" :span="20">
          <span>*角色名称：</span>
          <a-input class="roleWidth" placeholder="Basic usage" />
        </a-col>
        <a-col class="marginTop" :span="20">
          <span>*角色描述：</span>
          <a-textarea
            style="vertical-align: middle;"
            class="roleWidth"
            placeholder="Basic usage"
            :rows="4"
          />
        </a-col>
        <a-col class="marginTop tableLeft" :span="20">
          <span>*分配权限：</span>
          <!-- <span class="tableWidth"> -->
          <a-checkbox-group
            :value="hasChecked"
            class="tableWidth"
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
          <!-- </span> -->
        </a-col>
        <a-col :span="20">
          <a-checkbox @change="checkAll">全选</a-checkbox>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
import { permission } from '../permissionUid'
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
export default {
  data: function () {
    return {
      operate: this.$route.params.operate,
      checked: true,
      hasChecked: []
    }
  },
  methods: {
    onChange (checkedValues) {
      // 表示是选择还是取消
      const checked = checkedValues.length > this.hasChecked.length
      // 过滤后的添加或者取消的权限value值
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
      console.log('allChecked_', allChecked)
      console.log(e.target.checked)
      const checkAll = e.target.checked
      if (checkAll) {
        this.hasChecked = allChecked
      } else {
        this.hasChecked = []
      }
    },
    test () {
      const test = '1234'
      const length = test.length
      console.log('length_', length)
    }
  }
}
</script>
<style lang="scss">
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
</style>
