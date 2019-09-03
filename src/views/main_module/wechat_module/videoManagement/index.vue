<template>
  <div class="video-container">
    <div>
      <a-input-search
        placeholder="搜索视屏名称"
        style="width: 200px"
        v-model="searchText"
        @search="onSearch"
      />
      <a-button class="insert-btn" type="primary" @click.stop="insertHandle" :disabled="permissionIsTrue('541')">新增视屏</a-button>
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
      <span slot="plays" slot-scope="text, record, index">{{ text ? text : '0' }}</span>
      <div slot="video" slot-scope="text, record">
        <div class="list-video" @click.stop="playVideo(record)">
          <img class="list-img" :src="record.coverUrl" alt="">
          <div class="circle">
            <div class="circle_inner_play"></div>
          </div>
        </div>
        <!-- <video :src="record.videoUrl" class="list-video"></video> -->
      </div>
      <span slot="operate" slot-scope="text, record" @click.stop="operate($event, record)">
        <a
          :disabled="record['status'] === 2 ||
          permissionIsTrue('542')"
          >编辑</a
        >
        <a-divider type="vertical" />
        <a
          :disabled="record['status'] === 2 ||
          permissionIsTrue('543')"
          >查看</a
        >
        <a-divider type="vertical" />
        <a
          :disabled="record['status'] === 2 ||
          permissionIsTrue('545')"
          v-if="record['status'] === 0"
          >发布</a
        >
        <a
          :disabled="record['status'] === 2 ||
          permissionIsTrue('544')"
          v-if="record['status'] === 1"
          >禁用</a
        >
        <a
          v-if="record['status'] === 2 ||
          permissionIsTrue('545')"
          >启用</a
        >
        </span>
      </a-table>
    </div>
    <a-modal
      v-model="showVideo"
      :footer="null"
      :closable="false"
      destroyOnClose
    >
      <div class="modal-video">
        <video :src="videoUrl" style="width: 100%;height: 100%;margin-top: 20px;"  controls></video>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { _asyncAddRouter } from '@/router/index.js'
import { queryVideoList, updateVideoStatus } from '@/api/wechat_module/index.js'
import { permissionIsTrue } from '@/utils/permissionIsTrue'
// , insertVideo, updateVideo
const columns = [{
  title: '序号',
  dataIndex: 'index',
  width: 60,
  scopedSlots: { customRender: 'index' }
}, {
  title: '视屏名称',
  dataIndex: 'title'
}, {
  title: '视屏',
  dataIndex: 'video',
  scopedSlots: { customRender: 'video' }
}, {
  title: '状态',
  dataIndex: 'status',
  scopedSlots: { customRender: 'status' }
}, {
  title: '关联医生',
  dataIndex: 'doctorInfo.doctorName'
}, {
  title: '播放次数',
  dataIndex: 'plays',
  scopedSlots: { customRender: 'plays' }
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
      sortObj: {},
      videoUrl: '',
      showVideo: false
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
      queryVideoList(params).then(
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
      // _asyncAddRouter('wechat/videoInsert', 'videoInsert', 'main_module/wechat_module/videoManagement/videoInsert')
      this.$router.push({// 你需要接受路由的参数再跳转，最终跳转是在main函数里面
        name: 'videoInsert',
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
        updateVideoStatus({
          'id': record.id,
          'status': tempStatus
        }).then((res) => {
          if (res && res.data && res.data.status === '1') {
            record['status'] = tempStatus
          }
        })
      }
      if (text === '编辑' || text === '查看') {
        _asyncAddRouter('wechat/videoInsert', 'videoInsert', 'main_module/wechat_module/videoManagement/videoInsert')
        this.$router.push({// 你需要接受路由的参数再跳转，最终跳转是在main函数里面
          name: 'videoInsert',
          params: {
            ...record,
            titleStatus: text
          }
        })
      }
    },
    playVideo (record) {
      if (record) {
        this.videoUrl = record.videoUrl
        this.showVideo = true
      } else {
        this.$message.error('无法播放')
      }
    },
    permissionIsTrue
  }
}
</script>

<style lang="scss" scoped>
.video-container {
  .insert-btn {
    float: right;
  }
  .table-container {
    margin-top: 10px;
    .list-video{
      height: 50px;
      position: relative;
      cursor: pointer;
      .list-img{
        max-height: 50px;
      }
    }
    .circle {
      /* border: 1px solid #3F51B5; */
      background-color: #3f51b5;
      height: 20px;
      width: 20px;
      border-radius: 20px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .circle_inner_play {
      content: "";
      display: block;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 5px 0 5px 8px;
      border-color: transparent transparent transparent #ffffff;
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -5px 0px 0px -3px;
    }
  }
}
</style>
