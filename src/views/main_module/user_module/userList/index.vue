<template>
  <div>
    <div class="main_header">
      <a-input-search
        placeholder="请输入患者姓名搜索"
        style="width: 200px"
        @search="onSearch"
        class="float-left"
      />
      <a-button type="primary" class="float-right marginLeft">+新建</a-button>
      <a-button type="primary" class="float-right marginLeft">+导出</a-button>
      <a-button type="primary" class="float-right marginLeft">导入</a-button>
      <a-button type="primary" class="float-right marginLeft"
        >下载模版</a-button
      >
      <div class="clear-both"></div>
    </div>
    <div class="main_content">
      <a-table
        :rowSelection="rowSelection"
        :columns="columns"
        :dataSource="data"
        :pagination="pagination"
        :customRow="rowClick"
      >
        <a slot="name" slot-scope="text" href="javascript:;">{{ text }}</a>
      </a-table>
    </div>
  </div>
</template>
<script>
import { getTargetObject } from '@/utils/tools'
import { patientsList } from '@/api/record_module/index'
const columns = [{
  title: '姓名',
  dataIndex: 'patientName',
  scopedSlots: { customRender: 'name' }
}, {
  title: '性别',
  dataIndex: 'patientSex'
}, {
  title: '年龄',
  dataIndex: 'patientAge'
}, {
  title: '手机号',
  dataIndex: 'mobilephone'
}, {
  title: '测评报告',
  dataIndex: 'status'
}, {
  title: '受教育程度',
  dataIndex: 'education'
}, {
  title: '职业',
  dataIndex: 'jobType'
}, {
  title: '婚姻',
  dataIndex: 'marrige'
}, {
  title: '居住地',
  dataIndex: 'address'
}, {
  title: '是否确诊老年痴呆',
  dataIndex: 'medicalHistoryDegree'
}, {
  title: '是否用过痴呆药物',
  dataIndex: 'medicationNames'
}, {
  title: '建档时间',
  dataIndex: 'createTime'
}, {
  title: '建档人',
  dataIndex: 'testThree'
}, {
  title: '更新时间',
  dataIndex: 'updateTime'
}]

// mock 数据
const data = []
// 分页配置
const pagination = {
  showSizeChanger: true,
  // current: 10,
  defaultCurrent: 1,
  defaultPageSize: 10,
  // pageSize: 20,
  pageSizeOptions: ['10', '20', '30', '40'],
  total: 100,
  showQuickJumper: true
}
// 筛选条件初始化
const filterFields = {
  educationTime: '',
  medicalHistory: '',
  medicationName: '',
  orderBy: 'ASC',
  pageNumber: 1,
  pageSize: 10,
  patientAge: '',
  patientName: '',
  patientSex: -1,
  sortKey: 'createTime'
}
// 从后端传回来的结果过滤患者的list，产生真实的data
function patientListFilter (data) {
  const patientList = []
  for (let item = 0; item < data.length; item++) {
    const listItem = Object.assign({ medicationNames: data[item]['medicationNames'],
      medicalHistoryDegree: data[item]['medicalHistoryType'][0]['medicalHistoryDegree'],
      key: data[item]['patient']['uid']
    }, data[item]['patient'])
    patientList.push(listItem)
  }
  return patientList
}
// 依据patient信息中的uid,查询到对应后端数据中那一个患者数据，传到详情页面
// 因为后端传回来的数据结构，所以要做数据过滤，未先定义好接口,responseData是回返数据中的patients
function patientDetails (uid, responseData) {
  for (let item = 0; item < responseData.length; item++) {
    if (responseData[item]['patient']['uid'] === uid) {
      return responseData[item]
    }
  }
}
export default {
  data: function () {
    return {
      data,
      columns,
      pagination,
      filterFields,
      responseData: {}
    }
  },
  computed: {
    rowSelection () {
      // const { selectedRowKeys } = this
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name
          }
        })
      }
    }

    // rowKey (key) {
    //   return (console.log('key_', key))
    // }
  },
  methods: {
    onSearch (value) {
      console.log(value)
    },
    onShowSizeChange (current, pageSize) {
      this.pageSize = pageSize
    },
    rowClick (record) {
      // console.log('event_', event)
      return {
        on: {
          click: () => {
            console.log('record_', record)
            const patientInfo = patientDetails(record['uid'], this.responseData)
            console.log('patientInfo_', patientInfo)
            this.$router.push({ name: 'recordInfo', params: { patientInfo } })
          }
        }
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    const filterResult = getTargetObject(filterFields, [''])
    console.log('filterResult_', filterResult)
    patientsList(filterResult).then((response) => {
      console.log('recordList_response', response)
      next(vm => {
        // vm.data = response.data.body.patients
        vm.responseData = response.data.body.patients
        vm.data = patientListFilter(response.data.body.patients)
        console.log('vm.data_', vm.data)
      })
    })
    // console.log(this) // undefined，不能用this来获取vue实例
    // console.log('组件路由钩子：beforeRouteEnter')
    // next(vm => {
    //   console.log(vm) // vm为vue的实例
    //   console.log('组件路由钩子beforeRouteEnter的next')
    // })
  }
}
</script>
<style lang="scss">
.main_content {
  margin-top: 10px;
}
.ant-table-pagination.ant-pagination {
  float: none;
}
.main_header {
  .marginLeft {
    margin-left: 10px;
  }
}
</style>
