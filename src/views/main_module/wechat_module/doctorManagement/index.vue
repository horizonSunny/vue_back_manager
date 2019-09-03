<template>
  <div class="main-container">
    <div>
      <a-input-search
        placeholder="请输入专家姓名搜索"
        style="width: 200px"
        @search="onSearch"
        v-model="searchText"
      />
      <a-button class="insert-btn" type="primary" @click.stop="insertHandle" :disabled="permissionIsTrue('521')">新增医生</a-button>
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
        <span slot="index" slot-scope="text, record, index">{{
          index + 1
        }}</span>
        <span slot="doctorName" slot-scope="text, record, index">
          <a-popover v-if="record.headPortrait" placement="left">
            <template slot="content">
              <img
                :src="record.headPortrait"
                width="50px"
                height="50px"
                alt=""
              />
            </template>
            <span>{{ text }}</span>
          </a-popover>
          <span v-else>{{ text }}</span>
      </span>
      <span slot="sex" slot-scope="text, record, index">{{ text === 1 ? '男' : '女' }}</span>
      <span slot="operate" slot-scope="text, record" @click.stop="operate($event, record)">
        <a
          :disabled="record['status'] === 2 ||
          permissionIsTrue('522')"
          >编辑</a
        >
        <a-divider type="vertical" />
        <a :disabled="permissionIsTrue('523')">查看</a>
      </span>
      </a-table>
    </div>
  </div>
</template>

<script>
import { _asyncAddRouter } from '@/router/index.js'
import { queryDoctorList } from '@/api/wechat_module/index.js'
import { permissionIsTrue } from '@/utils/permissionIsTrue'
const columns = [{
  title: '序号',
  dataIndex: 'index',
  width: 60,
  scopedSlots: { customRender: 'index' }
}, {
  title: '医生名称',
  dataIndex: 'doctorName',
  scopedSlots: { customRender: 'doctorName' }
}, {
  title: '性别',
  dataIndex: 'sex',
  scopedSlots: { customRender: 'sex' }
}, {
  title: '年龄',
  dataIndex: 'age'
}, {
  title: '联系方式',
  dataIndex: 'contact'
}, {
  title: '科室',
  dataIndex: 'department'
}, {
  title: '职称',
  dataIndex: 'doctorTitle'
}, {
  title: '所属医院',
  dataIndex: 'hospital.hospitalName'
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
    console.log('切换视屏管理,初始化列表')
    this.getList()
  },
  methods: {
    getList () {
      let searchObj = {
        'doctorName': this.searchText
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
      queryDoctorList(params).then(
        (res) => {
          this.loading = false
          console.log('请求成功:', res)
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
      console.log('value', value)
      this.getList()
    },
    handleTableChange (pagination, filters, sorter) {
      console.log('列表参数变化:', pagination, filters, sorter)
      this.pagination = pagination
      this.sortObj = sorter
      this.getList()
    },
    insertHandle () {
      // _asyncAddRouter('wechat/doctorInsert', 'doctorInsert', 'main_module/wechat_module/doctorManagement/doctorInsert')
      this.$router.push({// 你需要接受路由的参数再跳转，最终跳转是在main函数里面
        name: 'doctorInsert',
        params: {
          titleStatus: '新增'
        }
      })
    },
    operate (event, record) {
      console.log('record_', record)
      const text = event.target.innerText
      if (text === '禁用' || text === '启用') {
        // updateDrugstore({
        //   'id': record.id,
        //   'status': record.status === 1 ? 2 : 1
        // }).then((response) => {
        //   console.log('text_', text)
        //   record['status'] = record['status'] === 1 ? 2 : 1
        // })
      };
      if (text === '编辑' || text === '查看') {
        _asyncAddRouter('wechat/doctorInsert', 'doctorInsert', 'main_module/wechat_module/doctorManagement/doctorInsert')
        this.$router.push({// 你需要接受路由的参数再跳转，最终跳转是在main函数里面
          name: 'doctorInsert',
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
.main-container {
  text-align: left;
  .insert-btn {
    float: right;
  }
  .table-container {
    margin-top: 10px;
  }
}
</style>
