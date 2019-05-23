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
  title: '手机号码',
  dataIndex: 'mobilephone'
}, {
  title: '邮箱',
  dataIndex: 'status'
}, {
  title: '所属医院',
  dataIndex: 'education'
}, {
  title: '已测试人数',
  dataIndex: 'jobType'
}, {
  title: '状态',
  dataIndex: 'marrige'
}, {
  title: '创建时间',
  dataIndex: 'address'
}, {
  title: '创建人',
  dataIndex: 'medicalHistoryDegree'
}, {
  title: '操作',
  key: 'action',
  scopedSlots: { customRender: 'action' }
}]
const modalColumns = [{
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
  title: '手机号码',
  dataIndex: 'mobilephone'
}, {
  title: '邮箱',
  dataIndex: 'status'
}, {
  title: '所属医院',
  dataIndex: 'education'
}, {
  title: '已测试人数',
  dataIndex: 'jobType'
}, {
  title: '状态',
  dataIndex: 'marrige'
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
      modalColumns,
      pagination,
      filterFields,
      visible: false,
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
