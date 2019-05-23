<template>
  <div>
    <div class="main_header">
      <a-input-search
        placeholder="请输入患者姓名搜索"
        style="width: 200px"
        @search="onSearch"
        class="float-left"
      />
      <a-button type="primary" class="float-right">新建测评</a-button>
      <div class="clear-both"></div>
    </div>
    <div class="main_content">
      <a-table
        :columns="columns"
        :dataSource="data"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <a slot="name" slot-scope="text" href="javascript:;">{{ text }}</a>
        <span
          slot="action"
          slot-scope="text, record"
          @click.stop="operate($event, record)"
        >
          <a :disabled="record['status'] === 0" href="javascript:;">编辑</a>
          <a-divider type="vertical" />
          <a :disabled="record['status'] === 0" href="javascript:;">查看</a>
          <a-divider type="vertical" />
          <a href="javascript:;" v-if="record['status'] === 0">禁用</a>
          <a href="javascript:;" v-if="record['status'] !== 0">启用</a>
          <a-divider type="vertical" />
        </span>
      </a-table>
    </div>
  </div>
</template>
<script>
import { getTargetObject } from '@/utils/tools'
// import { patientsList } from '@/api/record_module/index'
import { shcemeList } from '@/api/evaluation_module/index'
const columns = [{
  title: '序号',
  dataIndex: 'index'
}, {
  title: '方案名称',
  dataIndex: 'assessmentPlanName'
}, {
  title: '分类',
  dataIndex: 'classify',
  filterMultiple: false,
  filters: [
    { text: '不限', value: '' },
    { text: '基础版', value: '基础版' },
    { text: '临床版', value: '临床版' }
  ]
}, {
  title: '所属医院',
  dataIndex: 'hospitalName'
}, {
  // 未找到
  title: '测评',
  dataIndex: 'age'
}, {
  title: '状态',
  dataIndex: 'status',
  filterMultiple: false,
  filters: [
    { text: '不限', value: '' },
    { text: '启用', value: '1' },
    { text: '禁用', value: '0' }
  ]
}, {
  title: '已筛查次数',
  dataIndex: 'planNum',
  sorter: true
}, {
  title: '已筛查人数',
  dataIndex: 'planPatientNum',
  sorter: true
}, {
  title: '创建时间',
  dataIndex: 'createTime',
  sorter: true
},
{
  title: '创建人',
  dataIndex: 'creator',
  sorter: true
},
{
  title: '操作',
  key: 'action',
  scopedSlots: { customRender: 'action' }
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
  pageNumber: 0,
  pageSize: 10
}
// 从后端传回来的结果过滤患者的list，产生真实的data
function shcemeListFilter (data) {
  const shcemeList = []
  for (let item = 0; item < data.length; item++) {
    const listItem = Object.assign({ index: item + 1,
      key: data[item]['uid']
    }, data[item])
    shcemeList.push(listItem)
  }
  return shcemeList
}
// 依据patient信息中的uid,查询到对应后端数据中那一个患者数据，传到详情页面
// 因为后端传回来的数据结构，所以要做数据过滤，未先定义好接口,responseData是回返数据中的patients
// function patientDetails (uid, responseData) {
//   for (let item = 0; item < responseData.length; item++) {
//     if (responseData[item]['patient']['uid'] === uid) {
//       return responseData[item]
//     }
//   }
// }
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
      const name = {
        assessmentPlanName: value
      }
      const requestFilter = Object.assign(name, filterFields)
      shcemeList(requestFilter).then((response) => {
        this.responseData = response.data.body.assessmentPlans
        this.data = shcemeListFilter(response.data.body.assessmentPlans)
      })
    },
    onShowSizeChange (current, pageSize) {
      this.pageSize = pageSize
    },
    operate (event, record) {
      console.log('record_', record)
      const text = event.target.innerText
      if (text === '编辑') {
        console.log('text_', text)
        this.$router.push({// 你需要接受路由的参数再跳转，最终跳转是在main函数里面
          name: 'newScheme',
          params: {
            operate: text,
            info: record
          }
        })
      }
      if (text === '查看') { }
    },
    handleTableChange (pagination, filters, sorter) {
      // requst 数据整合
      const filter = {}
      // for (let item in filters) {
      //   if (item === 'status' && filters[item][0] !== '') {
      //     console.log('进入的')
      //     filter[item] = Number(filters[item][0])
      //   } else {
      //     console.log('没进的')
      //     filter[item] = filters[item][0]
      //   }
      // }
      const sort = {}
      if (sorter['columnKey'] && sorter['order']) {
        sort['orderBy'] = sorter['order'] === 'descend' ? 'DESC' : 'ASC'
        sort['sortKey'] = sorter['columnKey']
      }
      const filterField = {
        pageNumber: pagination['current'] - 1,
        pageSize: pagination['pageSize'],
        orgId: filterFields['orgId']
      }
      const requestFilter = getTargetObject(Object.assign(filterField, sort, filter), [''])
      console.log('requestFilter_', requestFilter)
      shcemeList(requestFilter).then((response) => {
        this.responseData = response.data.body.assessmentPlans
        this.data = shcemeListFilter(response.data.body.assessmentPlans)
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    const filterResult = getTargetObject(filterFields, [''])
    console.log('filterResult_', filterResult)
    shcemeList(filterResult).then((response) => {
      // evaluationList(filterResult).then((response) => {
      console.log('recordList_response', response)
      next(vm => {
        // vm.data = response.data.body.patients
        vm.responseData = response.data.body.assessmentPlans
        vm.data = shcemeListFilter(response.data.body.assessmentPlans)
        console.log('vm.data_', vm.data)
      })
    })
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
