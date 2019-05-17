import Vue from 'vue'
import Router from 'vue-router'
import mainComponent from '../views/main_module/AppMain'
import noPermission from '../views/main_module/NoPermission'
// import HelloWorld from '@/view/HelloWorld'
// 必须设置node环境变量
const _import = require('./import_' + process.env.NODE_ENV)
// const _import = require('./import_' + 'developments')

Vue.use(Router)

export const constRouter = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    component: _import('login_module/login/index'),
    hidden: true
  },
  {
    path: '/forget',
    component: _import('login_module/forget/index'),
    hidden: true
  },
  {
    path: '/404',
    component: _import('error/404'),
    hidden: true
  }
]

export const asyncRouter = [
  // 档案模块
  {
    path: '/record',
    permissionCode: '1',
    sideBarName: '档案',
    component: mainComponent,
    children: [
      { path: '/', redirect: '/noPermission' },
      {
        path: 'noPermission',
        permissionCode: true,
        component: noPermission
      },
      {
        path: 'recordInfo',
        permissionCode: '111',
        sideBarName: '基本信息',
        component: _import('main_module/record_module/recordInfo/index')
      },
      {
        path: 'recordList',
        permissionCode: '11',
        sideBarName: '档案列表',
        component: _import('main_module/record_module/recordList/index')
      },
      {
        path: 'recordReport',
        permissionCode: '112',
        sideBarName: '测评报告',
        component: _import('main_module/record_module/recordReport/index')
      }
    ]
  },
  // 系统模块
  {
    path: '/system',
    permissionCode: '4',
    sideBarName: '系统',
    component: mainComponent,
    children: [
      // 后台管理
      {
        path: '/backManagerList',
        permissionCode: '42',
        sideBarName: '后台用户',
        component: _import('main_module/system_module/backManagerList/index')
      },
      {
        path: '/newBackUser',
        permissionCode: '421',
        sideBarName: '新建后台用户',
        component: _import('main_module/system_module/newBackUser/index')
      },
      // 部门
      {
        path: '/newDepartment',
        permissionCode: '426',
        sideBarName: '新建部门',
        component: _import('main_module/system_module/newDepartment/index')
      },
      // 角色
      {
        path: '/newRole',
        permissionCode: '411',
        sideBarName: '新建角色',
        component: _import('main_module/system_module/newRole/index')
      },
      {
        path: '/roleList',
        permissionCode: '41',
        sideBarName: '角色管理',
        component: _import('main_module/system_module/roleList/index')
      }
    ]
  },
  // 测评模块
  {
    path: '/evaluation',
    permissionCode: '2',
    sideBarName: '测评',
    component: mainComponent,
    children: [
      // 测评量表
      {
        path: '/evaluationList',
        permissionCode: '21',
        sideBarName: '测评列表',
        component: _import('main_module/evaluation_module/evaluationList/index')
      },
      // 方案管理
      {
        path: '/evaluationScheme',
        permissionCode: '22',
        sideBarName: '方案管理',
        component: _import(
          'main_module/evaluation_module/evaluationScheme/index'
        )
      },
      // 新建测评
      {
        path: '/newEvaluation',
        permissionCode: '211',
        sideBarName: '新建测评',
        component: _import('main_module/evaluation_module/newEvaluation/index')
      },
      // 新建方案
      {
        path: '/newScheme',
        permissionCode: '221',
        sideBarName: '新建方案',
        component: _import('main_module/evaluation_module/newScheme/index')
      }
    ]
  },
  // 用户模块
  {
    path: '/user',
    component: mainComponent,
    permissionCode: '3',
    sideBarName: '用户管理',
    children: [
      {
        path: '/userList',
        permissionCode: '31',
        sideBarName: '脑健康管理师',
        component: _import('main_module/user_module/userList/index')
      },
      {
        path: '/userManager',
        permissionCode: '313',
        sideBarName: '新建用户',
        component: _import('main_module/user_module/userManager/index')
      }
    ]
  }
]
export default new Router({
  routes: constRouter
})
