<template>
  <div>
    <div class="main_header">
      <!-- <a-input-search
        placeholder="请输入患者姓名搜索"
        style="width: 200px"
        @search="onSearch"
        class="float-left"
      /> -->
      <a-button
        type="primary"
        @click="newRoleUser"
        class="float-right"
        :disabled="permissionIsTrue('411')"
        >+新增角色</a-button
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
            :disabled="record['status'] === 0 || permissionIsTrue('411')"
            href="javascript:;"
            >编辑</a
          >
          <a-divider type="vertical" />
          <a
            :disabled="record['status'] === 0 || permissionIsTrue('413')"
            href="javascript:;"
            >查看</a
          >
          <a-divider type="vertical" />
          <a
            href="javascript:;"
            v-if="record['status'] === 0"
            :disabled="permissionIsTrue('414')"
            >启用</a
          >
          <a
            href="javascript:;"
            v-if="record['status'] !== 0"
            :disabled="permissionIsTrue('414')"
            >禁用</a
          >
          <a-divider type="vertical" />
        </span>
      </a-table>
    </div>
  </div>
</template>
<script>
import { roleList, roleDisable } from '@/api/system_moudle/index'
import { getTargetObject } from '@/utils/tools'
import { permissionIsTrue } from '@/utils/permissionIsTrue'
const columns = [
  {
    title: '序号',
    width: 60,
    dataIndex: 'roleIndex'
  },
  {
    title: '角色名称',
    dataIndex: 'roleName'
  }, {
    title: '角色描述',
    dataIndex: 'description'
  }, {
    title: '状态',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' }
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    sorter: true
  }, {
    title: '更新时间',
    dataIndex: 'updateTime',
    sorter: true
  }, {
    title: '操作',
    key: 'action',
    width: 200,
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }]

// mock 数据
const data = []

// 从后端传回来的结果过滤患者的list，产生真实的data
function roleListFilter (data) {
  const roleListList = []
  for (let item = 0; item < data.length; item++) {
    const listItem = Object.assign({ key: data[item]['uid'], roleIndex: item + 1 }, data[item])
    roleListList.push(listItem)
  }
  return roleListList
}
// 依据roleList信息中的uid,查询到对应后端数据中那一个患者数据，传到详情页面
// 因为后端传回来的数据结构，所以要做数据过滤，未先定义好接口,responseData是回返数据中的roleLists
// function roleListDetails (uid, responseData) {
//   for (let item = 0; item < responseData.length; item++) {
//     if (responseData[item]['roleList']['uid'] === uid) {
//       return responseData[item]
//     }
//   }
// }
export default {
  name: 'roleList-alive',
  data: function () {
    return {
      data,
      columns,
      pagination: {
        showSizeChanger: true,
        // current: 10,
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
  },
  methods: {
    onShowSizeChange (current, pageSize) {
      this.pageSize = pageSize
    },
    operate (event, record) {
      console.log('record_', record)
      const text = event.target.innerText
      if (text === '禁用' || text === '启用') {
        console.log('text_', text)
        roleDisable({ uid: record['uid'], status: record['status'] === 1 ? 0 : 1 }).then((response) => {
          console.log('text_', text)
          record['status'] = record['status'] === 1 ? 0 : 1
        })
      };
      if (text === '编辑' || text === '查看') {
        console.log('text_', text)
        this.$router.push({// 你需要接受路由的参数再跳转，最终跳转是在main函数里面
          name: 'newRole',
          params: {
            operate: text,
            info: record
          }
        })
      }
      if (text === '查看') { }
    },
    newRoleUser () {
      this.$router.push({// 你需要接受路由的参数再跳转，最终跳转是在main函数里面
        name: 'newRole',
        params: {
          operate: '新建',
          info: ''
        }
      })
    },
    handleTableChange (pagination, filters, sorter) {
      // requst 数据整合
      const filter = {}
      for (let item in filters) {
        filter[item] = filters[item][0]
      }
      const sort = {}
      if (sorter['columnKey'] && sorter['order']) {
        sort['sortType'] = sorter['order'] === 'descend' ? 'DESC' : 'ASC'
        sort['sortFeild'] = sorter['columnKey']
      }
      const filterField = {
        pageNumber: pagination['current'] - 1,
        pageSize: pagination['pageSize']
      }

      const requestFilter = Object.assign(filterField, sort, filter)
      console.log('requestFilter_', requestFilter)
      const request = Object.assign(this.filterFields, requestFilter)
      roleList(request).then((response) => {
        this.responseData = response.data.body.pageList
        this.data = roleListFilter(response.data.body.pageList)
        this.pagination['total'] = response.data.body['totalElements']
      })
    },
    permissionIsTrue
  },
  filters: {
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
      const filterResult = getTargetObject(vm.filterFields, [''])
      roleList(filterResult).then((response) => {
        vm.responseData = response.data.body.pageList
        vm.data = roleListFilter(response.data.body.pageList)
        vm.pagination['total'] = response.data.body['totalElements']
        console.log('vm.responseData_', vm.responseData)
      }, () => {
        next()
      })
    })
  },
  beforeRouteLeave (to, from, next) {
    // ...
    console.log('beforeRouteLeave_', to)
    const canActivePath = ['newRole']
    if (canActivePath.indexOf(to['name']) !== -1) {
      console.log('beforeRouteLeave_comeIn')
      this.$store.commit('ADD_ACTIVE', 'roleList-alive')
    } else {
      this.$store.commit('DELETE_ACTIVE', 'roleList-alive')
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
.ant-table td {
  white-space: nowrap;
}
</style>
