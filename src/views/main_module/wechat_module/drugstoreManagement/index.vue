<template>
  <div class="main-container">
    <div>
      <a-input-search
        placeholder="请输入药店名搜索"
        style="width: 200px"
        v-model="searchText"
        @search="onSearch"
      />
      <div class="insert-btn">
        <a-button type="primary" @click="handleDownload" :disabled="permissionIsTrue('512')">下载模板</a-button>
        <a-upload accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="handleUpload" name="file" :showUploadList="false" :action="uploadUrl" :headers="headers" :disabled="permissionIsTrue('511')">
          <a-button type="primary">导入</a-button>
        </a-upload>
        <a-button type="primary" @click.stop="insertHandle" :disabled="permissionIsTrue('512')">新增药店</a-button>
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
        <span slot="operate" slot-scope="text, record" @click.stop="operate($event, record)">
          <a
            :disabled="record['status'] === 0 ||
            permissionIsTrue('513')"
            >编辑</a
          >
          <a-divider type="vertical" />
          <a
            :disabled="record['status'] === 0 ||
            permissionIsTrue('513')"
            >查看</a
          >
          <a-divider type="vertical" />
          <a
            v-if="record['status'] === 1 ||
            permissionIsTrue('514')"
            >禁用</a
          >
          <a
            v-if="record['status'] !== 1 ||
            permissionIsTrue('514')"
            >启用</a
          >
        </span>
      </a-table>
    </div>
  </div>
</template>

<script>
import { _asyncAddRouter } from '@/router/index.js'
import { queryDrugstoreList, updateDrugstoreStatus } from '@/api/wechat_module/index.js'
import { exportExcelGet } from '@/utils/exportExcel'
import baseUrl from '@/utils/global'
import { getToken } from '@/utils/token'
import { permissionIsTrue } from '@/utils/permissionIsTrue'
const columns = [{
  title: '序号',
  dataIndex: 'index',
  width: 60,
  scopedSlots: { customRender: 'index' }
}, {
  title: '药店名称',
  dataIndex: 'name'
}, {
  title: '标签',
  dataIndex: 'label',
  scopedSlots: { customRender: 'label' }
}, {
  title: '地址',
  dataIndex: 'address'
}, {
  title: '联系方式',
  dataIndex: 'phoneList',
  scopedSlots: { customRender: 'label' }
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
      sortObj: {},
      uploadUrl: baseUrl + 'wx/backend/importDrugstores',
      headers: {
        Token: getToken()
      }
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      let searchObj = {
        'name': this.searchText
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
      queryDrugstoreList(params).then(
        (res) => {
          this.loading = false
          if (res && res.data && res.data.status === '1') {
            this.data = res.data.body.pageList
            this.pagination.total = res.data.body.totalElements
          }
        },
        (err) => {
          console.log('err', err)
          this.loading = false
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
      // _asyncAddRouter('wechat/drugStoreInsert', 'drugStoreInsert', 'main_module/wechat_module/drugstoreManagement/drugStoreInsert')
      this.$router.push({// 你需要接受路由的参数再跳转，最终跳转是在main函数里面
        name: 'drugStoreInsert',
        params: {
          titleStatus: '新增'
        }
      })
    },
    operate (event, record) {
      const text = event.target.innerText
      if (text === '禁用' || text === '启用') {
        updateDrugstoreStatus({
          'id': record.id,
          'status': record.status === 1 ? 0 : 1
        }).then((res) => {
          if (res && res.data && res.data.status === '1') {
            record['status'] = record['status'] === 1 ? 0 : 1
          }
        })
      };
      if (text === '编辑' || text === '查看') {
        _asyncAddRouter('wechat/drugStoreInsert', 'drugStoreInsert', 'main_module/wechat_module/drugstoreManagement/drugStoreInsert')
        this.$router.push({// 你需要接受路由的参数再跳转，最终跳转是在main函数里面
          name: 'drugStoreInsert',
          params: {
            ...record,
            titleStatus: text
          }
        })
      }
    },
    handleUpload (info) {
      console.log('上传状态改变:', info)
      const status = info.file.status
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
        this.getList()
        this.$message.success(`${info.file.name} 文件上传成功.`)
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} 文件上传失败.`)
      }
    },
    handleDownload () {
      exportExcelGet('wx/backend/download/drugstoreTemplate', '药店模板')
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
