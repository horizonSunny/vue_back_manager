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
          placeholder="请输入姓名搜索"
          style="width: 200px"
          @search="onSearch"
          class="float-left"
        />
        <a-button
          type="primary"
          class="float-right marginLeft"
          @click="newUser"
          :disabled="permissionIsTrue('421')"
          >+新建后台用户</a-button
        >
        <a-button
          type="primary"
          class="float-right marginLeft"
          @click="operateDepartment('添加')"
          :disabled="(orgId && permissionIsTrue('426')) || !orgId"
          >+添加部门</a-button
        >
        <a-button
          type="primary"
          class="float-right marginLeft"
          @click="operateDepartment('编辑')"
          :disabled="
            (orgId && permissionIsTrue('425')) ||
              orgId === user['organization']['key'] ||
              !orgId
          "
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
          :scroll="{ x: true }"
        >
          <template slot="status" slot-scope="status">
            {{ status | roleFilter }}
          </template>
          <span
            slot="action"
            slot-scope="text, record"
            @click.stop="operate($event, record)"
          >
            <a
              :disabled="record['status'] === 0 || permissionIsTrue('422')"
              href="javascript:;"
              >编辑</a
            >
            <a-divider type="vertical" />
            <a
              :disabled="record['status'] === 0 || permissionIsTrue('423')"
              href="javascript:;"
              >查看</a
            >
            <a-divider type="vertical" />
            <a
              href="javascript:;"
              v-if="record['status'] === 1"
              :disabled="permissionIsTrue('424')"
              >禁用</a
            >
            <a
              href="javascript:;"
              v-if="record['status'] === 0"
              :disabled="permissionIsTrue('424')"
              >启用</a
            >
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
import { userQuery, userDisable, hospitalFind, allRoleList } from '@/api/system_moudle/index'
import store from '@/store'
import { permissionIsTrue } from '@/utils/permissionIsTrue'
const columns = [
  {
    title: '序号',
    width: 60,
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
      { text: '启用', value: '1' },
      { text: '禁用', value: '0' }
    ],
    scopedSlots: { customRender: 'status' }
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
    width: 200,
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
]

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
function userListFilter (data) {
  const userList = []
  // 获取角色列表
  for (let item = 0; item < data.length; item++) {
    let roleName = ''
    for (let roleItem = 0; roleItem < data[item]['userRoles'].length; roleItem++) {
      roleName = data[item]['userRoles'][roleItem]['roleName'] + (roleItem === data[item]['userRoles'].length - 1 ? '' : ',')
    }
    const listItem = Object.assign(data[item], { organization: data[item]['organization']['title'],
      key: data[item]['uid'],
      index: item + 1,
      roleIds: data[item]['userRoles'][0].uid,
      orgId: data[item]['organization']['key'],
      roleName: roleName
    })
    userList.push(listItem)
  }
  return userList
}
// 依据当前的orgId获取父级的orgId
function getParentOrgId (orgId, organization, objectInfo) {
  if (organization['children'] && organization['children']['length'] !== 0) {
    for (let item = 0; item < organization['children']['length']; item++) {
      console.log('Number(organization)_', Number(organization['children'][item]['key']))
      if (orgId === Number(organization['children'][item]['key'])) {
        // 到了 不用循环了
        console.log('到了 不用循环了')
        const result = {
          name: organization['children'][item]['title'],
          parentOrgId: organization['key']
        }
        console.log('result_', result, '_object_', objectInfo)
        Object.assign(objectInfo, result)
      } else {
        getParentOrgId(orgId, organization['children'][item], objectInfo)
      }
    }
  }
}
const userList = []
export default {
  name: 'backManagerList-alive',
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
      responseData: {},
      orgId: '',
      treeData: [],
      autoExpandParent: true,
      expandedKeys: [],
      allRoleList: [], // 存放角色列表
      userList,
      filterFields: {
        pageNumber: 0,
        pageSize: 10
      }
    }
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
  computed: {
    ...mapGetters(['organization', 'user', 'hospitals'])
    // disabledInfo: function () {
    //   return false
    // }
  },
  methods: {
    onShowSizeChange (current, pageSize) {
      this.pageSize = pageSize
    },
    operate (event, record) {
      console.log('record_123_', record)
      const text = event.target.innerText
      if (text === '禁用' || text === '启用') {
        userDisable({ uid: record['uid'], status: record['status'] === 1 ? 0 : 1 }).then((response) => {
          console.log('text_', text)
          record['status'] = record['status'] === 1 ? 0 : 1
        })
      };
      if (text === '编辑' || text === '查看') {
        console.log('text_', text)
        // record['orgId'] = this.orgId
        this.$router.push({// 你需要接受路由的参数再跳转，最终跳转是在main函数里面
          name: 'newBackUser',
          params: {
            operate: text,
            allRoleList: this.allRoleList,
            info: record
          }
        })
      }
    },
    handleTableChange (pagination, filters, sorter) {
      // requst 数据整合
      const filter = {}
      this.pagination['current'] = pagination['current']
      for (let item in filters) {
        if (item === 'status') {
          console.log('进入的')
          filter[item] = (filters[item] && filters[item]['length'] !== 0) ? Number(filters[item][0]) : null
        } else {
          console.log('没进的')
          filter[item] = (filters[item] && filters[item]['length'] !== 0) ? filters[item][0] : null
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
        orgId: this.filterFields['orgId']
      }
      const requestFilter = Object.assign(filterField, sort, filter)
      console.log('requestFilter_', requestFilter)
      console.log('this_this.filterFields_', this.filterFields)
      const request = Object.assign(this.filterFields, requestFilter)
      userQuery(request).then((response) => {
        this.responseData = response.data.body.pageList
        this.userList = userListFilter(response.data.body.pageList)
        this.pagination['total'] = response.data.body['totalElements']
      })
    },
    onSearch (value) {
      const name = {
        fullname: value,
        pageNumber: 0,
        pageSize: 10
      }
      this.pagination['current'] = 1
      const requestFilter = Object.assign(this.filterFields, name)
      userQuery(requestFilter).then((response) => {
        this.responseData = response.data.body.pageList
        this.userList = userListFilter(response.data.body.pageList)
        this.pagination['total'] = response.data.body['totalElements']
      })
    },
    onSelect (selectedKeys, info) {
      console.log('selectedKeys_', selectedKeys)
      console.log('info_', info)
      this.orgId = ''
      if (selectedKeys.length > 0) {
        this.orgId = selectedKeys[0]
        const org = {
          orgId: selectedKeys[0]
        }
        const filter = Object.assign(this.filterFields, org)
        userQuery(filter).then((response) => {
          this.responseData = response.data.body.pageList
          this.userList = userListFilter(response.data.body.pageList)
          this.pagination['total'] = response.data.body['totalElements']
        })
      }
      console.log('selectedKeys_', this.orgId)
    },
    newUser () {
      const tempInfo = {
        'orgId': this.orgId
      }
      this.$router.push({// 你需要接受路由的参数再跳转，最终跳转是在main函数里面
        name: 'newBackUser',
        params: {
          operate: '新建',
          allRoleList: this.allRoleList,
          info: tempInfo
        }
      })
    },
    operateDepartment (operate) {
      console.log('this.organization_123131——', this.organization)
      hospitalFind({ orgId: this.orgId }).then(res => {
        // 新建是parentId是当前orgId,编辑不是
        let hasSelectOptions = []
        let realResult = {
          name: '',
          parentOrgId: this.orgId
        }
        // 在编辑里面处理
        if (operate === '编辑') {
          for (let item = 0; item < res.data.body.length; item++) {
            hasSelectOptions.push(res.data.body[item]['uid'])
          }
          getParentOrgId(this.orgId, this.organization[0], realResult)
          realResult['uid'] = this.orgId
        }
        this.$router.push({// 你需要接受路由的参数再跳转，最终跳转是在main函数里面
          name: 'newDepartment',
          params: {
            operate: operate,
            hasSelectOptions,
            realResult
          }
        })
      })
    },
    getRoleList () {
      allRoleList().then(
        (res) => {
          console.log(res)
          if (res.data && res.data.status === '1') {
            this.allRoleList = res.data.body
          } else {
            this.allRoleList = []
          }
        }
      )
    },
    permissionIsTrue
  },
  beforeRouteEnter (to, from, next) {
    console.log('from_', from['name'])
    next(vm => {
      console.log('this.filterFields_system_', vm.filterFields)
      // 每次进页面，都进行刷新重新获取能够操作的角色权限
      vm.getRoleList()
      console.log('vm.orgId_', vm.orgId)
      console.log('store.getters.user_', store.getters.user['organization']['key'])
      const organization = store.getters.user['organization']
      const org = {
        orgId: vm.orgId ? vm.orgId : organization['key']
      }
      const filter = Object.assign(vm.filterFields, org)
      userQuery(filter).then((response) => {
        vm.responseData = response.data.body.pageList
        vm.userList = userListFilter(response.data.body.pageList)
        vm.orgId = vm.orgId ? vm.orgId : organization['key']
        console.log('vm.orgId_', vm.orgId)
        vm.pagination['total'] = response.data.body['totalElements']
      })
    }, () => {
      next()
    })
  },
  beforeRouteLeave (to, from, next) {
    // ...
    console.log('beforeRouteLeave_', to)
    const canActivePath = ['newBackUser', 'newDepartment']
    console.log('true?_', canActivePath.indexOf(to['name']) !== -1)
    if (canActivePath.indexOf(to['name']) !== -1) {
      console.log('beforeRouteLeave_comeIn')
      this.$store.commit('ADD_ACTIVE', 'backManagerList-alive')
    } else {
      this.$store.commit('DELETE_ACTIVE', 'backManagerList-alive')
    }
    next()
  },
  mounted () {
    // 获取用户角色列表
    this.getRoleList()
  }
}
</script>
<style lang="scss">
.orgLeft {
  float: left;
  width: 10%;
  margin-top: 50px;
  text-align: left;
}
.ant-table td {
  white-space: nowrap;
}
.orgRight {
  float: left;
  margin-left: 10%;
  width: 79%;
  .main_content {
    margin-top: 10px;
    td {
      /* max-width: 95px; */
      /* overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap; */
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
