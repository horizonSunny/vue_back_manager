<template>
  <div>
    <div class="main_header">
      <a-input-search
        placeholder="请输入用户姓名搜索"
        style="width: 200px"
        @search="onSearch"
        class="float-left"
      />
<<<<<<< HEAD
      <a-button
        type="primary"
        @click="newUser"
        class="float-right marginLeft"
        :disabled="permissionIsTrue('313')"
=======
      <a-button type="primary" @click="newUser" class="float-right marginLeft"
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
        >+新建</a-button
      >
      <a-button
        type="primary"
        @click="exportUser"
        class="float-right marginLeft"
<<<<<<< HEAD
        :disabled="permissionIsTrue('312')"
=======
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
        >+导出</a-button
      >
      <!-- <a-button type="primary" class="float-right marginLeft">导入</a-button> -->
      <a-upload
        class="float-right marginLeft"
<<<<<<< HEAD
        name="doctorfile"
        :multiple="true"
        :action="baseUrl + 'rest/backend/importDoctors?status=1'"
        :headers="headers"
        @change="handleChange"
        :showUploadList="false"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      >
        <a-button type="primary" :disabled="permissionIsTrue('311')"
          >导入</a-button
        >
=======
        name="file"
        :multiple="true"
        action="//jsonplaceholder.typicode.com/posts/"
        :headers="headers"
        @change="upLoad"
      >
        <a-button type="primary">导入</a-button>
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
      </a-upload>
      <a-button type="primary" @click="exportTmp" class="float-right marginLeft"
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
<<<<<<< HEAD
        @change="handleTableChange"
        :scroll="{ x: true }"
      >
        <a slot="name" slot-scope="text" href="javascript:;">{{ text }}</a>
        <template slot="sex" slot-scope="sex">
          {{ sex | sexFilter }}
        </template>
        <template slot="status" slot-scope="status">
          {{ status | roleFilter }}
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
            :disabled="
              record['status'] === 3 ||
                record['status'] === 2 ||
                permissionIsTrue('314')
            "
            href="javascript:;"
            >编辑</a
          >
          <a-divider type="vertical" />
          <a
            :disabled="
              record['status'] === 3 ||
                record['status'] === 2 ||
                permissionIsTrue('315')
            "
            href="javascript:;"
            >查看</a
          >
          <a-divider type="vertical" />
          <a
            href="javascript:;"
            v-if="record['status'] === 1"
            :disabled="permissionIsTrue('316')"
            >禁用</a
          >
          <a
            href="javascript:;"
            v-if="record['status'] === 2"
            :disabled="permissionIsTrue('316')"
            >启用</a
          >
          <a href="javascript:;" v-if="record['status'] === 3" :disabled="true"
            >禁用</a
          >
          <a-divider type="vertical" />
          <a
            :disabled="
              record['status'] === 3 ||
                record['status'] === 2 ||
                permissionIsTrue('317')
            "
=======
          <a :disabled="record['status'] === 2" href="javascript:;">编辑</a>
          <a-divider type="vertical" />
          <a :disabled="record['status'] === 2" href="javascript:;">查看</a>
          <a-divider type="vertical" />
          <a href="javascript:;" v-if="record['status'] === 1">禁用</a>
          <a href="javascript:;" v-if="record['status'] === 2">启用</a>
          <a-divider type="vertical" />
          <a
            :disabled="record['status'] === 2"
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
            href="javascript:;"
            @click="showModal(record['uid'])"
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
          :rowSelection="rowSyncSelection"
          :columns="modalColumns"
          :dataSource="syncData"
          :pagination="false"
        >
<<<<<<< HEAD
          <template slot="sex" slot-scope="sex">
            {{ sex | sexFilter }}
          </template>
          <template slot="status" slot-scope="status">
            {{ status | roleFilter }}
          </template>
=======
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
          <a slot="name" slot-scope="text" href="javascript:;">{{ text }}</a>
        </a-table>
      </a-modal>
    </div>
  </div>
</template>
<script>
import { getTargetObject } from '@/utils/tools'
<<<<<<< HEAD
import { exportExcelPost, exportExcelGet } from '@/utils/exportExcel'
import { userList, updateDoctorStatus, synchronousData } from '@/api/user_module/index'
import { permissionIsTrue } from '@/utils/permissionIsTrue'
import baseUrl from '@/utils/global'
import { getToken } from '@/utils/token'
const columns = [{
  title: '姓名',
  dataIndex: 'fullname'
}, {
  title: '性别',
  dataIndex: 'sex',
  filterMultiple: false,
  filters: [
    { text: '男', value: '0' },
    { text: '女', value: '1' }
  ],
  scopedSlots: { customRender: 'sex' }
=======
import { userList, exportUsers, exportTemplate, updateDoctorStatus } from '@/api/user_module/index'
const columns = [{
  title: '姓名',
  dataIndex: 'fullname',
  scopedSlots: { customRender: 'name' }
}, {
  title: '性别',
  dataIndex: 'sex'
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
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
<<<<<<< HEAD
  dataIndex: 'status',
  scopedSlots: { customRender: 'status' }
=======
  dataIndex: 'status'
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
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
<<<<<<< HEAD
  scopedSlots: { customRender: 'action' },
  width: 250,
  fixed: 'right'
=======
  scopedSlots: { customRender: 'action' }
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
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
<<<<<<< HEAD
    { text: '男', value: '0' },
    { text: '女', value: '1' }
  ],
  scopedSlots: { customRender: 'sex' }
=======
    { text: '不限', value: '' },
    { text: '男', value: '0' },
    { text: '女', value: '1' }
  ]
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
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
<<<<<<< HEAD
  dataIndex: 'status',
  scopedSlots: { customRender: 'status' }
}]
// mock 数据
const data = []
// 筛选条件初始化
// const filterFields = {
//   pageNumber: 0,
//   pageSize: 10
// }
=======
  dataIndex: 'status'
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
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
// 从后端传回来的结果过滤患者的list，产生真实的data
function userListFilter (data) {
  const userList = []
  for (let item = 0; item < data.length; item++) {
<<<<<<< HEAD
    const listItem = Object.assign({
      index: item + 1,
      key: data[item]['uid']
    }, data[item], { hospitals: data[item]['doctorHospital']['hospitalName'], hospitalUid: data[item]['doctorHospital']['hospitalUid'] })
=======
    const listItem = Object.assign({ index: item + 1,
      key: data[item]['uid']
    }, data[item], data[item]['doctorEntity'])
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
    userList.push(listItem)
  }
  return userList
}
export default {
<<<<<<< HEAD
  name: 'userList-alive',
=======
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
  data: function () {
    return {
      data,
      syncData: [],
      syncDoctorUid: '',
      columns,
      modalColumns,
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
      selectedRowKey: [],
      selectedSyncRowKey: [],
      visible: false,
      responseData: {},
      headers: {
<<<<<<< HEAD
        Token: getToken()
      },
      baseUrl
=======
        authorization: 'authorization-text'
      }
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
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
    },
    rowSyncSelection () {
      const _this = this
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
          _this.selectedSyncRowKey = selectedRowKeys
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
<<<<<<< HEAD
        fullname: value,
        pageNumber: 0,
        pageSize: 10
      }
      this.pagination['current'] = 1
      console.log('this[filterFields]_', this['filterFields'])
      const requestFilter = Object.assign(this['filterFields'], name)
      userList(requestFilter).then((response) => {
        this.responseData = response.data.body.pageList
        this.data = userListFilter(response.data.body.pageList)
        this.pagination['total'] = response.data.body['totalElements']
=======
        fullname: value
      }
      const requestFilter = Object.assign(name, filterFields)
      userList(requestFilter).then((response) => {
        this.responseData = response.data.body.doctors
        this.data = userListFilter(response.data.body.doctors)
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
      })
    },
    handleTableChange (pagination, filters, sorter) {
      // requst 数据整合
      const filter = {}
<<<<<<< HEAD
      this.pagination['current'] = pagination['current']
      // if (filters['sex'] && filters['sex']['length'] !== 0) {
      filter['doctorSex'] = (filters['sex'] && filters['sex']['length'] !== 0) ? Number(filters['sex'][0]) : null
      // }
      const sort = {}
      if (sorter['columnKey'] && sorter['order']) {
        sort['orderBy'] = sorter['order'] === 'descend' ? 'DESC' : 'ASC'
        sort['sortKey'] = sorter['columnKey']
      }
=======
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
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
      const filterField = {
        pageNumber: pagination['current'] - 1,
        pageSize: pagination['pageSize']
      }
      const requestFilter = getTargetObject(Object.assign(filterField, sort, filter), [''])
<<<<<<< HEAD
      const request = Object.assign(this['filterFields'], requestFilter)
      // console.log('requestFilter_', requestFilter)
      userList(request).then((response) => {
        this.responseData = response.data.body.pageList
        this.data = userListFilter(response.data.body.pageList)
        this.pagination['total'] = response.data.body['totalElements']
=======
      console.log('requestFilter_', requestFilter)
      userList(requestFilter).then((response) => {
        this.responseData = response.data.body.doctors
        this.data = userListFilter(response.data.body.doctors)
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
      })
    },
    onShowSizeChange (current, pageSize) {
      this.pageSize = pageSize
    },
    operate (event, record) {
      console.log('record_', record)
      const text = event.target.innerText
      if (text === '禁用' || text === '启用') {
        updateDoctorStatus({ uid: record['uid'], operation: record['status'] === 1 ? 2 : 1 }).then((response) => {
          console.log('text_', text)
          record['status'] = record['status'] === 1 ? 2 : 1
        })
      };
      if (text === '编辑' || text === '查看') {
        console.log('text_', text)
        this.$router.push({// 你需要接受路由的参数再跳转，最终跳转是在main函数里面
          name: 'userManager',
          params: {
            operate: text,
            info: record
          }
        })
      }
    },
    showModal (uid) {
      console.log('this.data_', this.data)
      console.log('this.uid_', uid)
      this.syncDoctorUid = uid
<<<<<<< HEAD
      const request = {
        'pageNumber': 0,
        'pageSize': 100000,
        'doctorStatus': 2

      }
      userList(request).then((response) => {
        // this.responseData = response.data.body.pageList
        this.syncData = userListFilter(response.data.body.pageList)
        console.log('this.syncData_', this.syncData)
        this.visible = true
        // 同步完刷新页面
        // this.pagination['total'] = response.data.body['totalElements']
      })
      // this.syncData = this.data.filter((item) => {
      //   // return item['status'] === 2
      //   return item['status'] === 2
      // })
=======
      this.syncData = this.data.filter((item) => {
        // return item['status'] === 2
        return item['status'] === 2
      })
      console.log('this.syncData_', this.syncData)
      this.visible = true
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
    },
    handleOk () {
      console.log('this.selectedSyncRowKey_', this.selectedSyncRowKey)
      console.log('this.syncDoctorUid_', this.syncDoctorUid)
<<<<<<< HEAD
      const data = {
        formDoctorUids: this.selectedSyncRowKey,
        toDoctorUid: this.syncDoctorUid
      }
      synchronousData(data).then((response) => {
        this.visible = false
        userList(this['filterFields']).then((response) => {
          this.responseData = response.data.body.pageList
          this.data = userListFilter(response.data.body.pageList)
          this.pagination['total'] = response.data.body['totalElements']
        })
      })
    },
    exportTmp () {
      console.log(this.selectedRowKey)
      // exportTemplate().then(res => {
      //   let blob = new Blob([res], { type: 'application/vnd.ms-excel' })
      //   let objectUrl = URL.createObjectURL(blob)
      //   window.location.href = objectUrl
      // })
      exportExcelGet('rest/backend/getFileURL', '用户导入模版')
    },
    exportUser () {
      console.log('this.selectedRowKey_', this.selectedRowKey)
      if (this.selectedRowKey.length !== 0) {
        exportExcelPost('rest/backend/exportDoctors', { doctorIds: this.selectedRowKey }, '用户模版导出')
      } else {
        this.$message.info('请选中需要导出的用户档案')
      }
    },
    handleChange (info) {
      // console.log('info_event_', info.file.response['status']);

      const status = info.file.status
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        const responseStatus = info.file.response['status']
        if (Number(responseStatus) === 0) {
          if (info.file.response['body']) {
            let errorMsg = ''
            for (let item = 0; item < info.file.response['body']['length']; item++) {
              errorMsg += JSON.stringify(info.file.response['body'][item])
            }
            this.$message.error(errorMsg, 10)
          } else {
            this.$message.error(info.file.response['message'])
          }
          return
        }
        userList(this['filterFields']).then((response) => {
          this.responseData = response.data.body.pageList
          this.data = userListFilter(response.data.body.pageList)
          this.pagination['total'] = response.data.body['totalElements']
        })
        this.$message.success(`${info.file.name} 文件上传成功.`)
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} 文件上传失败.`)
      }
    },
=======
      // const data = {
      //   formDoctorUids: this.selectedSyncRowKey,
      //   toDoctorUid: this.syncDoctorUid
      // }
      // synchronousData(data).then((response) => {
      //   this.visible = false
      // })
    },
    exportTmp () {
      console.log(this.selectedRowKey)
      exportTemplate().then(res => {
        let blob = new Blob([res], { type: 'application/vnd.ms-excel' })
        let objectUrl = URL.createObjectURL(blob)
        window.location.href = objectUrl
      })
    },
    exportUser () {
      exportUsers({ doctorIds: this.selectedRowKey }).then(res => {
        let blob = new Blob([res], { type: 'application/vnd.ms-excel' })
        let objectUrl = URL.createObjectURL(blob)
        window.location.href = objectUrl
      })
    },
    upLoad () { },
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
    newUser () {
      this.$router.push({// 你需要接受路由的参数再跳转，最终跳转是在main函数里面
        name: 'userManager',
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
    sexFilter: function (value) {
      if (Number(value) === 0) {
        return '男'
      } else {
        return '女'
      }
    },
    roleFilter: function (value) {
      let showValue = ''
      switch (value) {
        case 2:
          showValue = '禁用'
          break
        case 1:
          showValue = '启用'
          break
        case 3:
          showValue = '永久禁用'
          break
      }
      return showValue
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log('from_', from['name'])
    next(vm => {
      const filterResult = getTargetObject(vm['filterFields'], [''])
      userList(filterResult).then((response) => {
        console.log('recordList_response', response)
        vm.responseData = response.data.body.pageList
        vm.data = userListFilter(response.data.body.pageList)
        console.log('vm.data_', vm.data)
        vm.pagination['total'] = response.data.body['totalElements']
      }, () => {
        next()
      })
      // 通过 `vm` 访问组件实例
      // vm.deleteScan()
    })
  },
  beforeRouteLeave (to, from, next) {
    // ...
    console.log('beforeRouteLeave_', to)
    const canActivePath = ['userManager']
    console.log('true?_', canActivePath.indexOf(to['name']) !== -1)
    if (canActivePath.indexOf(to['name']) !== -1) {
      console.log('beforeRouteLeave_comeIn')
      this.$store.commit('ADD_ACTIVE', 'userList-alive')
    } else {
      this.$store.commit('DELETE_ACTIVE', 'userList-alive')
    }
    next()
=======
    }
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
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
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
.main_header {
  .marginLeft {
    margin-left: 10px;
  }
}
</style>
