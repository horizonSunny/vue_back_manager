<template>
  <div class="main-container">
    <div>
      <a-input-search
        placeholder="请输入医院名称搜索"
        style="width: 200px"
        v-model="searchText"
        @search="onSearch"
      />
      <div class="insert-btn">
        <a-button type="primary" @click="insertHandle" :disabled="permissionIsTrue('531')">新增医院</a-button>
      </div>
    </div>
    <div class="table-container">
      <a-table
        :columns="columns"
        :rowKey="record => record.id"
        :dataSource="data"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
        :scroll="{ x: true }"
      >
      <span slot="index" slot-scope="text, record, index">{{ index+1 }}</span>
      <span slot="pic" slot-scope="text, record, index"><img class="columns-pic" :src="text"></span>
      <span slot="level" slot-scope="text, record, index">{{ text }}</span>
      <span slot="operate" slot-scope="text, record" @click.stop="operate($event, record)">
        <a
          :disabled="record['status'] === 0 ||
          permissionIsTrue('532')"
          >编辑</a
        >
        <a-divider type="vertical" />
        <a
          v-if="record['status'] === 1"
          :disabled="record['status'] === 0 ||
          permissionIsTrue('533')"
          >禁用</a
        >
        <a
          v-if="record['status'] === 0 ||
          permissionIsTrue('533')"
          >启用</a
        >
      </span>
      </a-table>
    </div>
  </div>
</template>

<script>
import { _asyncAddRouter } from '@/router/index.js'
import { queryHospitalList, updateHospitalStatus } from '@/api/wechat_module/index.js'
import { permissionIsTrue } from '@/utils/permissionIsTrue'
const columns = [{
  title: '序号',
  dataIndex: 'index',
  width: 60,
  scopedSlots: { customRender: 'index' }
}, {
  title: '医院名称',
  dataIndex: 'hospitalName'
}, {
  title: '图片',
  dataIndex: 'pic',
  scopedSlots: { customRender: 'pic' }
}, {
  title: '等级',
  dataIndex: 'level',
  scopedSlots: { customRender: 'level' }
}, {
  title: '地址',
  dataIndex: 'address'
}, {
  title: '创建时间',
  dataIndex: 'createTime',
  sorter: true
}, {
  title: '创建人',
  dataIndex: 'creater'
}, {
  title: '操作',
  fixed: 'right',
  width: 150,
  scopedSlots: { customRender: 'operate' }
}]
const pagination = {
  showSizeChanger: true,
  current: 1,
  defaultCurrent: 1,
  defaultPageSize: 10,
  pageSize: 10,
  pageSizeOptions: ['10', '20', '30', '40'],
  total: 0,
  showQuickJumper: true
}
export default {
  data () {
    return {
      searchText: '',
      data: [],
      loading: false,
      pagination,
      columns,
      sortObj: {}
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      let searchObj = {
        'hospitalName': this.searchText
      }
      let pagenationObj = {
        'pageNumber': this.pagination.current - 1,
        'pageSize': this.pagination.pageSize
      }
      let sortObj = {
        'sortKey': this.sortObj.field,
        'orderBy': this.sortObj.order
      }
      // 查询条件
      let params = Object.assign({}, searchObj, pagenationObj, sortObj)
      // 请求后台数据
      this.loading = true
      queryHospitalList(params).then(
        (res) => {
          this.loading = false
          if (res && res.data && res.data.status === '1') {
            this.data = res.data.body.pageList
            this.pagination.total = res.data.body.totalElements
          } else {
            this.$message.error('数据请求失败!')
            this.data = []
            this.pagination.total = 0
          }
        },
        (err) => {
          this.loading = false
          console.log('请求失败:', err)
          this.$message.error('数据请求失败!')
        }
      )
    },
    onSearch (value) {
      this.pagination.current = 1
      this.getList()
    },
    handleTableChange (pagination, filters, sorter) {
      this.pagination = pagination
      this.sortObj = sorter
      this.getList()
    },
    insertHandle () {
      // _asyncAddRouter('wechat/hospitalInsert', 'hospitalInsert', 'main_module/wechat_module/hospitalManagement/hospitalInsert')
      this.$router.push({// 你需要接受路由的参数再跳转，最终跳转是在main函数里面
        name: 'hospitalInsert'
      })
    },
    operate (event, record) {
      const text = event.target.innerText
      if (text === '禁用' || text === '启用') {
        updateHospitalStatus({
          'id': record.id,
          'status': record.status === 1 ? 0 : 1
        }).then((res) => {
          if (res && res.data && res.data.status === '1') {
            record['status'] = record['status'] === 1 ? 0 : 1
          }
        })
      };
      if (text === '编辑' || text === '查看') {
        _asyncAddRouter('wechat/hospitalInsert', 'hospitalInsert', 'main_module/wechat_module/hospitalManagement/hospitalInsert')
        this.$router.push({// 你需要接受路由的参数再跳转，最终跳转是在main函数里面
          name: 'hospitalInsert',
          params: record
        })
      }
    },
    permissionIsTrue
  }
}
</script>

<style lang="scss" scoped>
.main-container {
  text-align: left;
  .insert-btn {
    float: right;
  }
  .table-container {
    margin-top: 10px;
    .columns-pic {
      height: 30px;
      max-width: 150px;
    }
  }
}
</style>
