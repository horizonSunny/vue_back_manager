<template>
  <div>
    <div class="main_header">
      <a-input-search
        placeholder="请输入方案名称搜索"
        style="width: 200px"
        @search="onSearch"
        class="float-left"
      />
      <a-button
        type="primary"
        @click="newScheme"
        class="float-right"
        :disabled="permissionIsTrue('221')"
        >+新建测评方案</a-button
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
        <template slot="classify" slot-scope="classify">
          {{ classify | classifyFilter }}
        </template>
        <template slot="status" slot-scope="status">
          {{ status | roleFilter }}
        </template>
        <a slot="name" slot-scope="text" href="javascript:;">{{ text }}</a>
        <span
          slot="action"
          slot-scope="text, record"
          @click.stop="operate($event, record)"
        >
          <a
            :disabled="record['status'] === 0 || permissionIsTrue('222')"
            href="javascript:;"
            >编辑</a
          >
          <a-divider type="vertical" />
          <a
            :disabled="record['status'] === 0 || permissionIsTrue('223')"
            href="javascript:;"
            >查看</a
          >
          <a-divider type="vertical" />
          <a
            href="javascript:;"
            v-if="record['status'] === 1"
            :disabled="permissionIsTrue('224')"
            >禁用</a
          >
          <a
            href="javascript:;"
            v-if="record['status'] === 0"
            :disabled="permissionIsTrue('224')"
            >启用</a
          >
          <a-divider type="vertical" />
        </span>
      </a-table>
    </div>
  </div>
</template>
<script>
import { getTargetObject } from '@/utils/tools'
// import { patientsList } from '@/api/record_module/index'
import { shcemeList, planDisable } from '@/api/evaluation_module/index'
import { permissionIsTrue } from '@/utils/permissionIsTrue'
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
    { text: '基础版', value: '0' },
    { text: '临床版', value: '1' }
  ],
  scopedSlots: { customRender: 'classify' }
}, {
  title: '所属医院',
  dataIndex: 'hospitalName'
}, {
  // 未找到
  title: '测评',
  dataIndex: 'assessmentItemNum'
}, {
  title: '状态',
  dataIndex: 'status',
  filterMultiple: false,
  filters: [

    { text: '启用', value: '1' },
    { text: '禁用', value: '0' }
  ],
  scopedSlots: { customRender: 'status' }
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
function shcemeListFilter (data) {
  const shcemeList = []
  for (let item = 0; item < data.length; item++) {
    let hospitalsUid = []
    for (let i = 0; i < data[item]['hospitals']['length']; i++) {
      hospitalsUid.push(data[item]['hospitals'][i]['uid'])
    }
    const listItem = Object.assign({
      index: item + 1,
      key: data[item]['uid'],
      hasHospitalsUid: hospitalsUid,
      assessmentItemNum: data[item]['items']['length']
    }, data[item])
    shcemeList.push(listItem)
  }
  return shcemeList
}
export default {
  name: 'evaluationScheme-alive',
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
  },
  methods: {
    onSearch (value) {
      const name = {
        assessmentPlanName: value,
        pageNumber: 0,
        pageSize: 10
      }
      this.pagination['current'] = 1
      const requestFilter = Object.assign(this.filterFields, name)
      shcemeList(requestFilter).then((response) => {
        this.responseData = response.data.body.assessmentPlans
        this.data = shcemeListFilter(response.data.body.assessmentPlans)
        this.pagination['total'] = response.data.body['totalElements']
      })
    },
    onShowSizeChange (current, pageSize) {
      this.pageSize = pageSize
    },
    operate (event, record) {
      console.log('record_', record)
      const text = event.target.innerText
      if (text === '禁用' || text === '启用') {
        planDisable({ uid: record['uid'], status: record['status'] === 0 ? 1 : 0 }).then((response) => {
          console.log('text_', text)
          record['status'] = record['status'] === 0 ? 1 : 0
        })
      };
      if (text === '编辑' || text === '查看') {
        console.log('text_', text)
        this.$router.push({
          name: 'newScheme',
          params: {
            operate: text,
            info: record
          }
        })
      }
    },
    handleTableChange (pagination, filters, sorter) {
      // requst 数据整合
      console.log('filters_', filters['status'])
      const filter = {}
      this.pagination['current'] = pagination['current']
      // if (filters['classify'] && filters['classify']['length'] !== 0) {
      filter['classify'] = (filters['classify'] && filters['classify']['length'] !== 0) ? Number(filters['classify'][0]) : null
      // }
      // if (filters['status'] && filters['status']['length'] !== 0) {
      filter['status'] = (filters['status'] && filters['status']['length'] !== 0) ? Number(filters['status'][0]) : null
      // }
      const sort = {}
      if (sorter['columnKey'] && sorter['order']) {
        sort['orderBy'] = sorter['order'] === 'descend' ? 'DESC' : 'ASC'
        sort['sortKey'] = sorter['columnKey']
      }
      const filterField = {
        pageNumber: pagination['current'] - 1,
        pageSize: pagination['pageSize'],
        orgId: this.filterFields['orgId']
      }
      const requestFilter = getTargetObject(Object.assign(filterField, sort, filter), [''])
      console.log('requestFilter_', requestFilter)
      const request = Object.assign(this.filterFields, requestFilter)
      shcemeList(request).then((response) => {
        this.responseData = response.data.body.assessmentPlans
        this.data = shcemeListFilter(response.data.body.assessmentPlans)
        this.pagination['total'] = response.data.body['totalElements']
      })
    },
    newScheme () {
      this.$router.push({// 你需要接受路由的参数再跳转，最终跳转是在main函数里面
        name: 'newScheme',
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
    },
    roleFilter: function (value) {
      let showValue = ''
      switch (value) {
        case 0:
          showValue = '禁用'
          break
        case 1:
          showValue = '启用'
          break
      }
      return showValue
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log('from_', from['name'])
    next(vm => {
      const filterResult = getTargetObject(vm['filterFields'], [''])
      shcemeList(filterResult).then((response) => {
        // evaluationList(filterResult).then((response) => {
        console.log('recordList_response', response)
        // vm.data = response.data.body.patients
        vm.responseData = response.data.body.assessmentPlans
        vm.data = shcemeListFilter(response.data.body.assessmentPlans)
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
    const canActivePath = ['newScheme']
    if (canActivePath.indexOf(to['name']) !== -1) {
      console.log('beforeRouteLeave_comeIn')
      this.$store.commit('ADD_ACTIVE', 'evaluationScheme-alive')
    } else {
      this.$store.commit('DELETE_ACTIVE', 'evaluationScheme-alive')
    }
    next()
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
