<template>
  <div>
    <div class="main_header">
      <!-- <a-input-search
        placeholder="请输入患者姓名搜索"
        style="width: 200px"
        @search="onSearch"
        class="float-left"
      /> -->
      <a-button type="primary" class="float-right">+新增角色</a-button>
      <div class="clear-both"></div>
    </div>
    <div class="main_content">
      <a-table :columns="columns" :dataSource="data" :pagination="pagination">
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
        </span>
      </a-table>
    </div>
  </div>
</template>
<script>
import { roleList, roleDisable } from '@/api/system_moudle/index'
const columns = [
  {
    title: '序号',
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
    dataIndex: 'status'
  }, {
    title: '创建时间',
    dataIndex: 'createTime'
  }, {
    title: '更新时间',
    dataIndex: 'updateTime'
  }, {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' }
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
const filterFields = {
  pageNumber: 0,
  pageSize: 10
}
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
  data: function () {
    return {
      data,
      columns,
      pagination,
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
        roleDisable({ uid: record['uid'] }).then((response) => {
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
    }
  },
  beforeRouteEnter (to, from, next) {
    roleList(filterFields).then((response) => {
      next(vm => {
        vm.responseData = response.data.body.pageList
        vm.data = roleListFilter(response.data.body.pageList)
        console.log('vm.responseData_', vm.responseData)
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
</style>
