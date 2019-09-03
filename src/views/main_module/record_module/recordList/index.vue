<template>
  <div>
    <div class="main_header">
      <a-input-search
        placeholder="请输入患者姓名搜索"
        style="width: 200px"
        @search="onSearch"
        class="float-left"
      />
      <a-button
        type="primary"
        @click="exportPatient"
        class="float-right"
        :disabled="permissionIsTrue('113')"
        >导出</a-button
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
        @change="handleTableChange"
      >
        <a slot="name" slot-scope="text" href="javascript:;">{{ text }}</a>
        <template slot="patientSex" slot-scope="patientSex">
          {{ patientSex | sexFilter }}
        </template>
        <template slot="medicalHistory" slot-scope="medicalHistory">
          {{ medicalHistory | medicalFilter }}
        </template>
      </a-table>
    </div>
  </div>
</template>
<script>
import { getTargetObject } from '@/utils/tools'
import { patientsList } from '@/api/record_module/index'
import { exportExcelPost } from '@/utils/exportExcel'
import { permissionIsTrue } from '@/utils/permissionIsTrue'

const columns = [{
  title: '姓名',
  dataIndex: 'patientName',
  scopedSlots: { customRender: 'name' }
}, {
  title: '性别',
  dataIndex: 'patientSex',
  filterMultiple: false,
  filters: [
    { text: '男', value: '0' },
    { text: '女', value: '1' }
  ],
  scopedSlots: { customRender: 'patientSex' }
}, {
  title: '年龄',
  dataIndex: 'patientAge',
  filterMultiple: false,
  filters: [

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
    { text: '小于7', value: '0-7' },
    { text: '7-9', value: '7-9' },
    { text: '10-12', value: '10-12' },
    { text: '13-16', value: '13-16' },
    { text: '大于16', value: '16-1000' }
  ]
}, {
  title: '职业',
  dataIndex: 'jobType',
  filterMultiple: false,
  filters: [

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
  dataIndex: 'medicalHistory',
  filterMultiple: false,
  filters: [
    { text: 'MCI', value: '1' },
    { text: '早期', value: '2' },
    { text: '中期', value: '3' },
    { text: '晚期', value: '4' },
    { text: '其他', value: '5' },
    { text: '不知道', value: '7' },
    { text: '否', value: '0' }
  ],
  scopedSlots: { customRender: 'medicalHistory' }
}, {
  title: '是否用过痴呆药物',
  dataIndex: 'medicationName',
  filterMultiple: false,
  filters: [
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
  dataIndex: 'creater'
}, {
  title: '更新时间',
  dataIndex: 'updateTime',
  sorter: true
}]

// mock 数据
const data = []
// 分页配置
// const pagination = {
//   showSizeChanger: true,
//   current: 1,
//   defaultCurrent: 1,
//   defaultPageSize: 10,
//   // pageSize: 20,
//   pageSizeOptions: ['10', '20', '30', '40'],
//   total: 0,
//   showQuickJumper: true
// }

// 从后端传回来的结果过滤患者的list，产生真实的data
function patientListFilter (data) {
  const patientList = []
  for (let item = 0; item < data.length; item++) {
    const listItem = Object.assign({
      medicationName: data[item]['medicationNames'],
      medicalHistory: data[item]['medicalHistoryType'][0]['medicalHistoryDegree'],
      key: data[item]['patient']['uid'],
      creater: data[item]['creater']
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
// const selectedRowKey = []
export default {
  name: 'recordList-alive',
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
      selectedRowKey: [],
      responseData: {}
    }
  },
  computed: {
    rowSelection () {
      const _this = this
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
          _this.selectedRowKey = selectedRowKeys
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
    // 依据姓名进行筛选
    onSearch (value) {
      const name = {
        patientName: value,
        pageNumber: 0,
        pageSize: 10
      }
      this.pagination['current'] = 1
      const requestFilter = getTargetObject(Object.assign(this.filterFields, name), [''])
      patientsList(requestFilter).then((response) => {
        this.responseData = response.data.body.patients
        this.data = patientListFilter(response.data.body.patients)
        this.pagination['total'] = response.data.body['totalElements']
      })
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
      // requst 数据整合
      const filter = {}
      this.pagination['current'] = pagination['current']
      for (let item in filters) {
        if (item === 'medicalHistory' || item === 'patientSex') {
          console.log('进入的')
          // filter[item] = Number(filters[item][0])
          filter[item] = (filters[item] && filters[item]['length'] !== 0) ? Number(filters[item][0]) : null
        } else {
          console.log('没进的')
          filter[item] = (filters[item] && filters[item]['length'] !== 0) ? filters[item][0] : null
        }
      }
      // debugger
      // if (filter['education']) {
      filter['educationTime'] = filter['education'] ? filter['education'] : null
      delete filter['education']
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
      const requestFilter = getTargetObject(Object.assign(page, sort, filter), [''])
      console.log('requestFilter_', requestFilter)
      const request = Object.assign(this.filterFields, requestFilter)
      patientsList(request).then((response) => {
        this.responseData = response.data.body.patients
        // console.log('this.responseData_')
        this.data = patientListFilter(response.data.body.patients)
        this.pagination['total'] = response.data.body['totalElements']
      })
    },
    exportPatient () {
      console.log('this.selectedRowKey_', this.selectedRowKey)
      if (this.selectedRowKey.length !== 0) {
        // exportPatients({ patientIds: this.selectedRowKey }).then(res => {
        //   let blob = new Blob([res], { type: 'application/vnd.ms-excel' })
        //   let objectUrl = URL.createObjectURL(blob)
        //   window.location.href = objectUrl
        // })
        exportExcelPost('rest/backend/exportPatients', { patientIds: this.selectedRowKey }, '患者档案导出')
      } else {
        this.$message.info('请选中需要导出的患者档案')
      }
    },
    permissionIsTrue
  },
  filters: {
    sexFilter: function (value) {
      if (Number(value) === 0) {
        return '男'
      } else {
        return '女'
      }
    },
    medicalFilter: function (value) {
      let showValue = ''
      switch (value) {
        case 0:
          showValue = '否'
          break
        case 1:
          showValue = 'MCI'
          break
        case 2:
          showValue = '早期'
          break
        case 3:
          showValue = '中期'
          break
        case 4:
          showValue = '晚期'
          break
        case 5:
          showValue = '其他'
          break
        case 7:
          showValue = '不知道'
          break
      }
      return showValue
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log('from_', from['name'])
    next(vm => {
      const filterResult = getTargetObject(vm.filterFields, [''])
      patientsList(filterResult).then((response) => {
        console.log('重新进入——created')
        console.log('recordList_response', response)
        // vm.data = response.data.body.patients
        vm.responseData = response.data.body.patients
        vm.data = patientListFilter(response.data.body.patients)
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
    const canActivePath = ['recordInfo', 'recordReport']
    if (canActivePath.indexOf(to['name']) !== -1) {
      console.log('canActivePath_add_comeIn')
      this.$store.commit('ADD_ACTIVE', 'recordList-alive')
    } else {
      this.$store.commit('DELETE_ACTIVE', 'recordList-alive')
    }
    next()
  }
}
</script>
<style lang="scss">
.main_content {
  margin-top: 10px;
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
.ant-table-pagination.ant-pagination {
  float: none;
}
</style>
