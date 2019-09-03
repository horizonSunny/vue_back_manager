<template>
  <div>
    <div class="main_header">
      <a-input-search
<<<<<<< HEAD
        placeholder="请输入测评名称搜索"
=======
        placeholder="请输入测评姓名搜索"
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
        style="width: 200px"
        @search="onSearch"
        class="float-left"
      />
<<<<<<< HEAD
      <a-button
        type="primary"
        @click="newEvaluation"
        class="float-right"
        :disabled="permissionIsTrue('211')"
=======
      <a-button type="primary" @click="newEvaluation" class="float-right"
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
        >新建测评</a-button
      >
      <div class="clear-both"></div>
    </div>
    <div class="main_content">
      <a-table
        :columns="columns"
        :dataSource="data"
        :pagination="pagination"
        @change="handleTableChange"
<<<<<<< HEAD
        :scroll="{ x: true }"
      >
        <a slot="name" slot-scope="text" href="javascript:;">{{ text }}</a>
        <template slot="classify" slot-scope="classify">
          {{ classify | classifyFilter }}
        </template>
=======
      >
        <a slot="name" slot-scope="text" href="javascript:;">{{ text }}</a>
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
        <span
          slot="action"
          slot-scope="text, record"
          @click.stop="operate($event, record)"
        >
<<<<<<< HEAD
          <a
            :disabled="record['status'] === 0 || permissionIsTrue('212')"
            href="javascript:;"
            >编辑</a
          >
=======
          <a :disabled="record['status'] === 0" href="javascript:;">编辑</a>
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
        </span>
      </a-table>
    </div>
  </div>
</template>
<script>
import { getTargetObject } from '@/utils/tools'
// import { patientsList } from '@/api/record_module/index'
import { evaluationList } from '@/api/evaluation_module/index'
<<<<<<< HEAD
import { permissionIsTrue } from '@/utils/permissionIsTrue'
=======
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
const columns = [{
  title: '序号',
  dataIndex: 'index'
}, {
  title: '测评名称',
  dataIndex: 'assessmentName'
}, {
<<<<<<< HEAD
=======
  // 未找到
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
  title: '分类',
  dataIndex: 'classify',
  filterMultiple: false,
  filters: [
<<<<<<< HEAD
    { text: '基础版', value: '0' },
    { text: '临床版', value: '1' }
  ],
  scopedSlots: { customRender: 'classify' }
=======
    { text: '不限', value: '' },
    { text: '基础版', value: 0 },
    { text: '临床版', value: 1 }
  ]
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
}, {
  title: '用时',
  dataIndex: 'duration'
}, {
  title: '测评简介',
  dataIndex: 'assessmentDescribe'
}, {
<<<<<<< HEAD
  title: '量表简称',
  dataIndex: 'testId'
}, {
=======
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
  title: '已测评次数',
  dataIndex: 'assessmentNum',
  sorter: true
}, {
  title: '已测评人数',
  dataIndex: 'assessmentPatientNum',
  sorter: true
}, {
  title: '创建时间',
  dataIndex: 'createTime',
  sorter: true
}, {
  title: '创建人',
  dataIndex: 'creator'
},
{
  title: '操作',
  key: 'action',
<<<<<<< HEAD
  scopedSlots: { customRender: 'action' },
  width: 200,
  fixed: 'right'
=======
  scopedSlots: { customRender: 'action' }
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
}]

// mock 数据
const data = []
<<<<<<< HEAD
// 筛选条件初始化
// const filterFields = {
//   pageNumber: 0,
//   pageSize: 10
// }
=======
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
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
// 从后端传回来的结果过滤患者的list，产生真实的data
function evaluationListFilter (data) {
  const patientList = []
  for (let item = 0; item < data.length; item++) {
<<<<<<< HEAD
    const listItem = Object.assign({
      index: item + 1,
=======
    const listItem = Object.assign({ index: item + 1,
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
      key: data[item]['uid']
    }, data[item])
    patientList.push(listItem)
  }
  return patientList
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
<<<<<<< HEAD
  name: 'evaluationList-alive',
=======
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
  data: function () {
    return {
      data,
      columns,
<<<<<<< HEAD
      pagination: {
        showSizeChanger: true,
        current: 1,
        defaultCurrent: 1,
        defaultPageSize: 10,
        // pageSize: 20,
        pageSizeOptions: ['10', '20', '30', '40'],
        total: 0,
        showQuickJumper: true
      },
      filterFields: {
        pageNumber: 0,
        pageSize: 10
      },
=======
      pagination,
      filterFields,
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
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
<<<<<<< HEAD
        assessmentName: value,
        pageNumber: 0,
        pageSize: 10
      }
      this.pagination['current'] = 1

      const requestFilter = Object.assign(this.filterFields, name)
      evaluationList(requestFilter).then((response) => {
        this.responseData = response.data.body.assessmentItems
        this.data = evaluationListFilter(response.data.body.assessmentItems)
        this.pagination['total'] = response.data.body['totalElements']
=======
        assessmentName: value
      }
      const requestFilter = Object.assign(name, filterFields)
      evaluationList(requestFilter).then((response) => {
        this.responseData = response.data.body.assessmentItems
        this.data = evaluationListFilter(response.data.body.assessmentItems)
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
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
          name: 'newEvaluation',
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
<<<<<<< HEAD
      this.pagination['current'] = pagination['current']
      // if (filters['classify'] && filters['classify']['length'] !== 0) {
      console.log('filters_classify_', filters['classify'])
      filter['classify'] = (filters['classify'] && filters['classify']['length'] !== 0) ? Number(filters['classify'][0]) : null
=======
      // for (let item in filters) {
      //   if ((item === 'medicalHistory' || item === 'patientSex') && filters[item][0] !== '') {
      //     filter[item] = Number(filters[item][0])
      //   } else {
      //     filter[item] = filters[item][0]
      //   }
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
      // }
      const sort = {}
      if (sorter['columnKey'] && sorter['order']) {
        sort['orderBy'] = sorter['order'] === 'descend' ? 'DESC' : 'ASC'
        sort['sortKey'] = sorter['columnKey']
      }
      const page = {
        pageNumber: pagination['current'] - 1,
        pageSize: pagination['pageSize']
      }
<<<<<<< HEAD
      console.log('this.filterFields_', this.filterFields)
      const requestFilter = getTargetObject(Object.assign(page, sort, filter), [''])
      const request = Object.assign(this.filterFields, requestFilter)
      evaluationList(request).then((response) => {
        this.responseData = response.data.body.assessmentItems
        this.data = evaluationListFilter(response.data.body.assessmentItems)
        this.pagination['total'] = response.data.body['totalElements']
=======
      const requestFilter = getTargetObject(Object.assign(page, sort, filter), [''])
      console.log('requestFilter_', requestFilter)
      evaluationList(requestFilter).then((response) => {
        this.responseData = response.data.body.assessmentItems
        this.data = evaluationListFilter(response.data.body.assessmentItems)
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
      })
    },
    newEvaluation () {
      this.$router.push({// 你需要接受路由的参数再跳转，最终跳转是在main函数里面
        name: 'newEvaluation',
        params: {
          operate: '新建',
          info: ''
        }
      })
<<<<<<< HEAD
    },
    permissionIsTrue
  },
  filters: {
    classifyFilter: function (value) {
      let showValue = ''
      switch (value) {
        case 0:
          showValue = '基础版'
          break
        case 1:
          showValue = '临床版'
          break
      }
      return showValue
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log('from_', from['name'])
    next(vm => {
      const filterResult = getTargetObject(vm['filterFields'], [''])
      evaluationList(filterResult).then((response) => {
        console.log('recordList_response', response)
        // vm.data = response.data.body.patients
        vm.responseData = response.data.body.assessmentItems
        vm.data = evaluationListFilter(response.data.body.assessmentItems)
        vm.pagination['total'] = response.data.body['totalElements']
        console.log('vm.data_', vm.data)
      }, () => {
        next()
      })
    })
  },
  beforeRouteLeave (to, from, next) {
    // ...
    console.log('beforeRouteLeave_', to)
    const canActivePath = ['newEvaluation']
    console.log('true?_', canActivePath.indexOf(to['name']) !== -1)
    if (canActivePath.indexOf(to['name']) !== -1) {
      console.log('beforeRouteLeave_comeIn')
      this.$store.commit('ADD_ACTIVE', 'evaluationList-alive')
    } else {
      this.$store.commit('DELETE_ACTIVE', 'evaluationList-alive')
    }
    next()
=======
    }
  },
  beforeRouteEnter (to, from, next) {
    const filterResult = getTargetObject(filterFields, [''])
    console.log('filterResult_', filterResult)
    evaluationList(filterResult).then((response) => {
      console.log('recordList_response', response)
      next(vm => {
        // vm.data = response.data.body.patients
        vm.responseData = response.data.body.assessmentItems
        vm.data = evaluationListFilter(response.data.body.assessmentItems)
        console.log('vm.data_', vm.data)
      })
    })
    // console.log(this) // undefined，不能用this来获取vue实例
    // console.log('组件路由钩子：beforeRouteEnter')
    // next(vm => {
    //   console.log(vm) // vm为vue的实例
    //   console.log('组件路由钩子beforeRouteEnter的next')
    // })
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
  }
}
</script>
<style lang="scss">
.main_content {
  margin-top: 10px;
<<<<<<< HEAD
  table {
    th {
      text-align: center;
    }
    td {
      text-align: center;
    }
  }
=======
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
}
.ant-table-pagination.ant-pagination {
  float: none;
}
<<<<<<< HEAD
.ant-table tr td {
  max-width: 200px;
  overflow: hidden;
  white-space: nowrap；;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
}
.ant-table tr th {
  text-align: center;
}
=======
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
</style>
