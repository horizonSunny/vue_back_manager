<template>
  <div>
    <div class="main_header">
      <a-input-search
        placeholder="请输入患者姓名搜索"
        style="width: 200px"
        @search="onSearch"
        class="float-left"
      />
      <a-button type="primary" class="float-right">导出</a-button>
      <div class="clear-both"></div>
    </div>
    <div class="main_content">
      <a-table
        :rowSelection="rowSelection"
        :columns="columns"
        :dataSource="data"
        :pagination="pagination"
        :customRow="rowClick"
        @change="handleTableChange"
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
  dataIndex: 'patientSex',
  filterMultiple: false,
  filters: [
    { text: '不限', value: '' },
    { text: '男', value: '0' },
    { text: '女', value: '1' }
  ]
}, {
  title: '年龄',
  dataIndex: 'patientAge',
  filterMultiple: false,
  filters: [
    { text: '不限', value: '' },
    { text: '小于60', value: '0-60' },
    { text: '60-64', value: '60-64' },
    { text: '65-69', value: '65-69' },
    { text: '70-74', value: '70-74' },
    { text: '大于74', value: '74-1000' }
  ]
}, {
  title: '手机号',
  dataIndex: 'mobilephone'
}, {
  title: '测评报告',
  dataIndex: 'status'
}, {
  title: '受教育程度',
  dataIndex: 'education',
  filterMultiple: false,
  filters: [
    { text: '不限', value: '' },
    { text: '小于7', value: '0-7' },
    { text: '7-9', value: '7-9' },
    { text: '13-16', value: '13-16' },
    { text: '大于16', value: '16-1000' }
  ]
}, {
  title: '职业',
  dataIndex: 'jobType',
  filterMultiple: false,
  filters: [
    { text: '不限', value: '' },
    { text: '公务员', value: '公务员' },
    { text: '专业技术人员', value: '专业技术人员' },
    { text: '工人', value: '工人' },
    { text: '农民', value: '农民' },
    { text: '企业', value: '企业' },
    { text: '组织负责人', value: '组织负责人' },
    { text: '商业服务人员', value: '商业服务人员' },
    { text: '公司职员', value: '公司职员' },
    { text: '家庭主妇', value: '家庭主妇' },
    { text: '失业', value: '失业' },
    { text: '其他', value: '其他' }
  ]
}, {
  title: '婚姻',
  dataIndex: 'marrige',
  filterMultiple: false,
  filters: [
    { text: '不限', value: '' },
    { text: '已婚', value: '已婚' },
    { text: '未婚', value: '未婚' },
    { text: '分居', value: '分居' },
    { text: '丧偶', value: '丧偶' },
    { text: '其他', value: '其他' }
  ]
}, {
  title: '居住地',
  dataIndex: 'address'
}, {
  title: '是否确诊老年痴呆',
  dataIndex: 'medicalHistoryDegree',
  filterMultiple: false,
  filters: [
    { text: '不限', value: '' },
    { text: 'MCI', value: '1' },
    { text: '早期', value: '2' },
    { text: '中期', value: '3' },
    { text: '晚期', value: '4' },
    { text: '其他', value: '5' },
    { text: '否', value: '0' }
  ]
}, {
  title: '是否用过痴呆药物',
  dataIndex: 'medicationNames',
  filterMultiple: false,
  filters: [
    { text: '不限', value: '不限' },
    { text: '多奈哌齐', value: '多奈哌齐' },
    { text: '美金刚', value: '美金刚' },
    { text: '卡巴拉汀', value: '卡巴拉汀' },
    { text: '石杉碱甲', value: '石杉碱甲' },
    { text: '奥拉西坦', value: '奥拉西坦' },
    { text: '维生素B', value: '维生素B' },
    { text: '叶酸', value: '叶酸' },
    { text: '银杏叶产品', value: '银杏叶产品' },
    { text: '其它', value: '其它' },
    { text: '否', value: '否' }
  ]
}, {
  title: '建档时间',
  dataIndex: 'createTime',
  sorter: true
}, {
  title: '建档人',
  dataIndex: 'testThree'
}, {
  title: '更新时间',
  dataIndex: 'updateTime',
  sorter: true
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
  total: 0,
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
    const listItem = Object.assign({
      medicationNames: data[item]['medicationNames'],
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
    },
    handleTableChange (pagination, filters, sorter) {
      console.log('pagination_', pagination)
      console.log('_filters_', filters)
      console.log('_sorter_', sorter)
      // requst 数据修改
      const filter = {}
      for (let item in filters) {
        if ((item === 'medicalHistory' || item === 'patientSex') && filters[item] !== '') {
          filter[item] = Number(filters[item][0])
        } else {
          filter[item] = filters[item][0]
        }
      }
      console.log('filter_', filter)
      // const filter = {
      //   educationTime: ''
      // }
      // const pager = { ...this.pagination }
      // pager.current = pagination.current
      // this.pagination = pager
      // this.fetch({
      //   results: pagination.pageSize,
      //   page: pagination.current,
      //   sortField: sorter.field,
      //   sortOrder: sorter.order,
      //   ...filters
      // })
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
        vm.pagination.total = response.data.body.totalElements
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
</style>
