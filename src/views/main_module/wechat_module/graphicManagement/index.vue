<template>
  <div class="graphic-container">
    <div>
      <a-input-search
        placeholder="搜索图文消息名称"
        style="width: 200px"
        v-model="searchText"
        @search="onSearch"
      />
      <a-button class="insert-btn" type="primary" @click='insertHandle' :disabled="permissionIsTrue('546')">新建图文</a-button>
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
      <span slot="status" slot-scope="text, record, index">{{ text | statusFilter }}</span>
      <span slot="readQuantity" slot-scope="text, record, index">{{ text ? text : '0' }}</span>
      <span slot="operate" slot-scope="text, record" @click.stop="operate($event, record)">
        <a
          :disabled="record['status'] === 2 ||
          permissionIsTrue('547')"
          >编辑</a
        >
        <a-divider type="vertical" />
        <a
          :disabled="record['status'] === 2 ||
          permissionIsTrue('548')"
          >查看</a
        >
        <a-divider type="vertical" />
        <a
          :disabled="record['status'] === 2 ||
          permissionIsTrue('550')"
          v-if="record['status'] === 0"
          >发布</a
        >
        <a
          :disabled="record['status'] === 2 ||
          permissionIsTrue('549')"
          v-if="record['status'] === 1"
          >禁用</a
        >
        <a
          v-if="record['status'] === 2 ||
          permissionIsTrue('550')"
          >启用</a
        >
        </span>
      </a-table>
    </div>
  </div>
</template>

<script>
import { _asyncAddRouter } from '@/router/index.js'
import { queryGraphicList, updateGraphicStatus } from '@/api/wechat_module/index.js'
import { permissionIsTrue } from '@/utils/permissionIsTrue'
const columns = [{
  title: '序号',
  dataIndex: 'index',
  width: 60,
  scopedSlots: { customRender: 'index' }
}, {
  title: '图文名称',
  dataIndex: 'title'
}, {
  title: '状态',
  dataIndex: 'status',
  scopedSlots: { customRender: 'status' }
}, {
  title: '作者',
  dataIndex: 'author'
}, {
  title: '阅读量',
  dataIndex: 'readQuantity',
  scopedSlots: { customRender: 'readQuantity' }
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
  width: 240,
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
  filters: {
    statusFilter (value) {
      let temp
      if (value === 0) {
        temp = '未发布'
      } else if (value === 1) {
        temp = '已发布'
      } else if (value === 2) {
        temp = '禁用'
      } else {
        temp = value
      }
      return temp
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      let searchObj = {
        'title': this.searchText
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
      queryGraphicList(params).then(
        (res) => {
          this.loading = false
          if (res && res.data && res.data.status === '1') {
            this.data = res.data.body.pageList
            this.pagination.total = res.data.body.totalElements
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
      // _asyncAddRouter('wechat/graphicInsert', 'graphicInsert', 'main_module/wechat_module/graphicManagement/graphicInsert')
      this.$router.push({// 你需要接受路由的参数再跳转，最终跳转是在main函数里面
        name: 'graphicInsert',
        params: {
          titleStatus: '新增'
        }
      })
    },
    operate (event, record) {
      const text = event.target.innerText
      if (text === '禁用' || text === '启用' || text === '发布') {
        let tempStatus = 0
        if (text === '禁用') {
          tempStatus = 2
        } else if (text === '启用') {
          tempStatus = 0
        } else {
          tempStatus = 1
        }
        updateGraphicStatus({
          'id': record.id,
          'status': tempStatus
        }).then((res) => {
          if (res && res.data && res.data.status === '1') {
            record['status'] = tempStatus
          }
        })
      };
      if (text === '编辑' || text === '查看') {
        _asyncAddRouter('wechat/graphicInsert', 'graphicInsert', 'main_module/wechat_module/graphicManagement/graphicInsert')
        this.$router.push({// 你需要接受路由的参数再跳转，最终跳转是在main函数里面
          name: 'graphicInsert',
          params: {
            ...record,
            titleStatus: text
          }
        })
      }
    },
    permissionIsTrue
  }
}
</script>

<style lang="scss" scoped>
.graphic-container {
  .insert-btn {
    float: right;
  }
  .table-container {
    margin-top: 10px;
  }
}
</style>
