<template>
  <div>
    <!-- 组织结构管理 -->
    <div class="orgLeft">
      <!-- <a-tree defaultExpandAll :treeData="organization" /> -->
      <a-tree
        defaultExpandAll
        :treeData="organization"
        :defaultSelectedKeys="[user['organization']['key']]"
        @select="this.onSelect"
      />
    </div>
    <div class="orgRight">
      <div class="main_header">
        <a-input-search
          placeholder="请输入患者姓名搜索"
          style="width: 200px"
          @search="onSearch"
          class="float-left"
        />
        <a-button type="primary" class="float-right marginLeft"
          >+新建后台用户</a-button
        >
        <a-button type="primary" class="float-right marginLeft"
          >+添加部门</a-button
        >
        <a-button type="primary" @click="test" class="float-right marginLeft"
          >编辑部门</a-button
        >
        <div class="clear-both"></div>
      </div>
      <div class="main_content">
        <a-table
          :columns="columns"
          :dataSource="userList"
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
            <a href="javascript:;" v-if="record['status'] === 1">禁用</a>
            <a href="javascript:;" v-if="record['status'] === 0">启用</a>
            <a-divider type="vertical" />
          </span>
        </a-table>
      </div>
    </div>
  </div>
</template>
<script>
// import { roleList, orgQuery } from '@/api/system_moudle/index'
import { mapGetters } from 'vuex'
import { userQuery, userDisable } from '@/api/system_moudle/index'
import { getTargetObject } from '@/utils/tools'
import store from '@/store'
const columns = [
  {
    title: '序号',
    dataIndex: 'index'
  },
  {
    title: '姓名',
    dataIndex: 'fullname'
  }, {
    title: '手机号码',
    dataIndex: 'mobilenumber'
  }, {
    title: '邮箱',
    dataIndex: 'email'
  }, {
    title: '部门',
    dataIndex: 'organization'
  }, {
    title: '角色',
    dataIndex: 'roleName'
  }, {
    title: '状态',
    dataIndex: 'status',
    filterMultiple: false,
    filters: [
      { text: '不限', value: '' },
      { text: '启用', value: '1' },
      { text: '禁用', value: '0' }
    ]
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    sorter: true
  }, {
    title: '更新时间',
    dataIndex: 'updateTime',
    sorter: true
  },
  {
    title: '操作',
    key: 'action',
    width: '50%',
    scopedSlots: { customRender: 'action' }
  }
]

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
    const listItem = Object.assign(data[item]['userRoles'][0], data[item], { organization: data[item]['organization']['title'],
      key: data[item]['uid'],
      index: item + 1
    })
    userList.push(listItem)
  }
  return userList
}
const userList = []
export default {
  data: function () {
    return {
      data,
      columns,
      pagination,
      responseData: {},
      treeData: [],
      autoExpandParent: true,
      expandedKeys: [],
      userList
    }
  },
  computed: {
    ...mapGetters(['organization', 'user'])
  },
  methods: {
    onShowSizeChange (current, pageSize) {
      this.pageSize = pageSize
    },
    operate (event, record) {
      console.log('record_', record)
      const text = event.target.innerText
      if (text === '禁用' || text === '启用') {
        userDisable({ uid: 4 }).then((response) => {
          console.log('text_', text)
          record['status'] = record['status'] === 1 ? 2 : 1
        })
      };
      if (text === '编辑' || text === '查看') {
        console.log('text_', text)
        this.$router.push({// 你需要接受路由的参数再跳转，最终跳转是在main函数里面
          name: 'newBackUser',
          params: {
            operate: text,
            info: record
          }
        })
      }
      if (text === '查看') { }
    },
    onChange () {

    },
    handleTableChange (pagination, filters, sorter) {
      // requst 数据整合
      const filter = {}
      for (let item in filters) {
        if (item === 'status' && filters[item][0] !== '') {
          console.log('进入的')
          filter[item] = Number(filters[item][0])
        } else {
          console.log('没进的')
          filter[item] = filters[item][0]
        }
      }
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
      userQuery(requestFilter).then((response) => {
        this.responseData = response.data.body.users
        this.userList = userListFilter(response.data.body.users)
      })
    },
    onSearch (value) {
      const name = {
        fullname: value
      }
      const requestFilter = Object.assign(name, filterFields)
      userQuery(requestFilter).then((response) => {
        this.responseData = response.data.body.users
        this.userList = userListFilter(response.data.body.users)
      })
    },
    onSelect (selectedKeys, info) {
      console.log('selectedKeys_', selectedKeys)
      const org = {
        orgId: selectedKeys[0]
      }
      const filter = Object.assign(filterFields, org)
      userQuery(filter).then((response) => {
        this.responseData = response.data.body.users
        this.userList = userListFilter(response.data.body.users)
      })
    },
    test () {
      console.log('this.user_', this.user)
      this.$router.push({// 你需要接受路由的参数再跳转，最终跳转是在main函数里面
        name: 'newDepartment',
        params: {
          operate: '编辑'
        }
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    const organization = store.getters.user['organization']
    const org = {
      orgId: organization['key']
    }
    const filter = Object.assign(filterFields, org)
    console.log('organization_12312312_', organization)
    userQuery(filter).then((response) => {
      next(vm => {
        vm.responseData = response.data.body.users
        vm.userList = userListFilter(response.data.body.users)
        console.log('vm.responseData_', vm.userList)
        // vm.data = roleListFilter(response.data.body)
        // console.log('vm.responseData_', vm.responseData)
      })
    })
  }
}
</script>
<style lang="scss">
.orgLeft {
  float: left;
  width: 10%;
  margin-top: 50px;
}
.orgRight {
  float: left;
  margin-left: 10%;
  width: 79%;
  .main_content {
    margin-top: 10px;
    td {
      max-width: 95px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .ant-table-pagination.ant-pagination {
    float: none;
  }
  .main_header {
    .marginLeft {
      margin-left: 10px;
    }
  }
}
</style>
