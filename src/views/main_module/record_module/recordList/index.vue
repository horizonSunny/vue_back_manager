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
      >
        <a slot="name" slot-scope="text" href="javascript:;">{{ text }}</a>
      </a-table>
    </div>
  </div>
</template>
<script>
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
const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park'
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park'
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park'
}, {
  key: '4',
  name: 'Disabled User',
  age: 99,
  address: 'Sidney No. 1 Lake Park'
}]
// 分页配置
const pagination = {
  showSizeChanger: true,
  current: 10,
  defaultCurrent: 1,
  defaultPageSize: 10,
  pageSize: 20,
  pageSizeOptions: ['10', '20', '30', '40'],
  total: 100,
  showQuickJumper: true
}
export default {
  data: function () {
    return {
      data,
      columns,
      pagination
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
      console.log(value)
    },
    onShowSizeChange (current, pageSize) {
      this.pageSize = pageSize
    }
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
