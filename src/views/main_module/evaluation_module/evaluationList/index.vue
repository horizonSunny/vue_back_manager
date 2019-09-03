<template>
  <div>
    <div class="main_header">
      <a-input-search
        placeholder="请输入测评名称搜索"
        style="width: 200px"
        @search="onSearch"
        class="float-left"
      />
      <a-button
        type="primary"
        @click="newEvaluation"
        class="float-right"
        :disabled="permissionIsTrue('211')"
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
        :scroll="{ x: true }"
      >
        <a slot="name" slot-scope="text" href="javascript:;">{{ text }}</a>
        <template slot="classify" slot-scope="classify">
          {{ classify | classifyFilter }}
        </template>
        <span
          slot="action"
          slot-scope="text, record"
          @click.stop="operate($event, record)"
        >
          <a
            :disabled="record['status'] === 0 || permissionIsTrue('212')"
            href="javascript:;"
            >编辑</a
          >
        </span>
      </a-table>
    </div>
  </div>
</template>
<script>
import { getTargetObject } from '@/utils/tools'
// import { patientsList } from '@/api/record_module/index'
import { evaluationList } from '@/api/evaluation_module/index'
import { permissionIsTrue } from '@/utils/permissionIsTrue'
const columns = [{
  title: '序号',
  dataIndex: 'index'
}, {
  title: '测评名称',
  dataIndex: 'assessmentName'
}, {
  title: '分类',
  dataIndex: 'classify',
  filterMultiple: false,
  filters: [
    { text: '基础版', value: '0' },
    { text: '临床版', value: '1' }
  ],
  scopedSlots: { customRender: 'classify' }
}, {
  title: '用时',
  dataIndex: 'duration'
}, {
  title: '测评简介',
  dataIndex: 'assessmentDescribe'
}, {
  title: '量表简称',
  dataIndex: 'testId'
}, {
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
  scopedSlots: { customRender: 'action' },
  width: 200,
  fixed: 'right'
}]

// mock 数据
const data = []
// 筛选条件初始化
// const filterFields = {
//   pageNumber: 0,
//   pageSize: 10
// }
// 从后端传回来的结果过滤患者的list，产生真实的data
function evaluationListFilter (data) {
  const patientList = []
  for (let item = 0; item < data.length; item++) {
    const listItem = Object.assign({
      index: item + 1,
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
  name: 'evaluationList-alive',
  data: function () {
    return {
      data,
      columns,
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
      this.pagination['current'] = pagination['current']
      // if (filters['classify'] && filters['classify']['length'] !== 0) {
      console.log('filters_classify_', filters['classify'])
      filter['classify'] = (filters['classify'] && filters['classify']['length'] !== 0) ? Number(filters['classify'][0]) : null
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
      console.log('this.filterFields_', this.filterFields)
      const requestFilter = getTargetObject(Object.assign(page, sort, filter), [''])
      const request = Object.assign(this.filterFields, requestFilter)
      evaluationList(request).then((response) => {
        this.responseData = response.data.body.assessmentItems
        this.data = evaluationListFilter(response.data.body.assessmentItems)
        this.pagination['total'] = response.data.body['totalElements']
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
  }
}
</script>
<style lang="scss">
.main_content {
  margin-top: 10px;
  table {
    th {
      text-align: center;
    }
    td {
      text-align: center;
    }
  }
}
.ant-table-pagination.ant-pagination {
  float: none;
}
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
</style>
