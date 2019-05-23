<template>
  <div>
    <div class="main_header">
      <a-input-search
        placeholder="请输入用户姓名搜索"
        style="width: 200px"
        @search="onSearch"
        class="float-left"
      />
      <a-button type="primary" class="float-right marginLeft">+新建</a-button>
      <a-button type="primary" class="float-right marginLeft">+导出</a-button>
      <!-- <a-button type="primary" class="float-right marginLeft">导入</a-button> -->
      <a-upload
        class="float-right marginLeft"
        name="file"
        :multiple="true"
        action="//jsonplaceholder.typicode.com/posts/"
        :headers="headers"
        @change="upLoad"
      >
        <a-button type="primary">导入</a-button>
      </a-upload>
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
          <a
            :disabled="record['status'] === 0"
            href="javascript:;"
            @click="showModal"
            >同步数据</a
          >
        </span>
      </a-table>
    </div>
    <div>
      <!-- <a-button type="primary" @click="showModal">Open Modal</a-button> -->
      <a-modal
        title="请选择需要同步的数据，可多选"
        v-model="visible"
        @ok="handleOk"
      >
        <a-table
          :rowSelection="rowSelection"
          :columns="modalColumns"
          :dataSource="data"
          :pagination="false"
        >
          <a slot="name" slot-scope="text" href="javascript:;">{{ text }}</a>
        </a-table>
      </a-modal>
    </div>
  </div>
</template>
<script>
import { getTargetObject } from '@/utils/tools'
import { userList } from '@/api/user_module/index'
const columns = [{
  title: '姓名',
  dataIndex: 'fullname',
  scopedSlots: { customRender: 'name' }
}, {
  title: '性别',
  dataIndex: 'sex'
}, {
  title: '年龄',
  dataIndex: 'age'
}, {
  title: '手机号码',
  dataIndex: 'mobilenumber'
}, {
  title: '邮箱',
  dataIndex: 'registerEmail'
}, {
  title: '所属医院',
  dataIndex: 'hospitals'
}, {
  title: '已测试人数',
  dataIndex: 'recordsCount'
}, {
  title: '状态',
  dataIndex: 'status'
}, {
  title: '创建时间',
  dataIndex: 'createTime',
  sorter: true
}, {
  title: '创建人',
  dataIndex: 'creator'
}, {
  title: '操作',
  key: 'action',
  scopedSlots: { customRender: 'action' }
}]
const modalColumns = [{
  title: '姓名',
  dataIndex: 'fullname',
  scopedSlots: { customRender: 'name' }
}, {
  title: '性别',
  dataIndex: 'sex',
  filterMultiple: false,
  filters: [
    { text: '不限', value: '' },
    { text: '男', value: '0' },
    { text: '女', value: '1' }
  ]
}, {
  title: '年龄',
  dataIndex: 'age'
}, {
  title: '手机号码',
  dataIndex: 'mobilenumber'
}, {
  title: '邮箱',
  dataIndex: 'registerEmail'
}, {
  title: '所属医院',
  dataIndex: 'hospitals'
}, {
  title: '已测试人数',
  dataIndex: 'recordsCount'
}, {
  title: '状态',
  dataIndex: 'status',
  filterMultiple: false,
  filters: [
    { text: '不限', value: '' },
    { text: '启用', value: '1' },
    { text: '禁用', value: '0' }
  ]
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
function userListFilter (data) {
  const userList = []
  for (let item = 0; item < data.length; item++) {
    const listItem = Object.assign({ index: item + 1,
      key: data[item]['uid']
    }, data[item], data[item]['doctorEntity'])
    userList.push(listItem)
  }
  return userList
}
export default {
  data: function () {
    return {
      data,
      columns,
      modalColumns,
      pagination,
      filterFields,
      visible: false,
      responseData: {},
      headers: {
        authorization: 'authorization-text'
      }
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
        fullname: value
      }
      const requestFilter = Object.assign(name, filterFields)
      userList(requestFilter).then((response) => {
        this.responseData = response.data.body.doctors
        this.data = userListFilter(response.data.body.doctors)
      })
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
      // if (sorter['columnKey'] && sorter['order']) {
      //   sort['orderBy'] = sorter['order'] === 'descend' ? 'DESC' : 'ASC'
      //   sort['sortKey'] = sorter['columnKey']
      // }
      const filterField = {
        pageNumber: pagination['current'] - 1,
        pageSize: pagination['pageSize']
      }
      const requestFilter = getTargetObject(Object.assign(filterField, sort, filter), [''])
      console.log('requestFilter_', requestFilter)
      userList(requestFilter).then((response) => {
        this.responseData = response.data.body.doctors
        this.data = userListFilter(response.data.body.doctors)
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
          name: 'userManager',
          params: {
            operate: text,
            info: record
          }
        })
      }
      if (text === '查看') { }
    },
    showModal () {
      this.visible = true
    },
    handleOk (e) {
      console.log(e)
      this.visible = false
    },
    upLoad () { }
  },
  beforeRouteEnter (to, from, next) {
    const filterResult = getTargetObject(filterFields, [''])
    console.log('filterResult_', filterResult)
    userList(filterResult).then((response) => {
      console.log('recordList_response', response)
      next(vm => {
        vm.responseData = response.data.body.doctors
        vm.data = userListFilter(response.data.body.doctors)
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
.main_header {
  .marginLeft {
    margin-left: 10px;
  }
}
</style>
