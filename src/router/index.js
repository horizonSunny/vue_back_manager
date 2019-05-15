import Vue from 'vue'
import Router from 'vue-router'
import mainComponent from '../views/main_module/AppMain'
// import HelloWorld from '@/view/HelloWorld'
// 必须设置node环境变量
const _import = require('./import_' + process.env.NODE_ENV)
// const _import = require('./import_' + 'developments')

Vue.use(Router)

export const constRouter = [
  { path: '/', redirect: '/forget' },
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
    component: mainComponent,
    children: [
      {
        path: '/recordInfo',
        permissionCode: '111',
        component: _import('main_module/record_module/recordInfo/index')
      },
      {
        path: '/recordList',
        permissionCode: '11',
        component: _import('main_module/record_module/recordList/index')
      },
      {
        path: '/recordReport',
        permissionCode: '112',
        component: _import('main_module/record_module/recordReport/index')
      }
    ]
  },
  // 系统模块
  {
    path: '/system',
    permissionCode: '4',
    component: mainComponent,
    children: [
      // 后台管理
      {
        path: '/backManagerList',
        permissionCode: '42',
        component: _import('main_module/system_module/backManagerList/index')
      },
      {
        path: '/newBackUser',
        permissionCode: '421',
        component: _import('main_module/system_module/newBackUser/index')
      },
      // 部门
      {
        path: '/newDepartment',
        permissionCode: '426',
        component: _import('main_module/system_module/newDepartment/index')
      },
      // 角色
      {
        path: '/newRole',
        permissionCode: '411',
        component: _import('main_module/system_module/newRole/index')
      },
      {
        path: '/roleList',
        permissionCode: '41',
        component: _import('main_module/system_module/roleList/index')
      }
    ]
  },
  // 测评模块
  {
    path: '/evaluation',
    permissionCode: '2',
    component: mainComponent,
    children: [
      // 测评量表
      {
        path: '/evaluationList',
        permissionCode: '21',
        component: _import('main_module/evaluation_module/evaluationList/index')
      },
      // 方案管理
      {
        path: '/evaluationScheme',
        permissionCode: '22',
        component: _import(
          'main_module/evaluation_module/evaluationScheme/index'
        )
      },
      // 新建测评
      {
        path: '/newEvaluation',
        permissionCode: '211',
        component: _import('main_module/evaluation_module/newEvaluation/index')
      },
      // 新建方案
      {
        path: '/newScheme',
        permissionCode: '221',
        component: _import('main_module/evaluation_module/newScheme/index')
      }
    ]
  },
  // 用户模块
  {
    path: '/user',
    component: mainComponent,
    permissionCode: '3',
    children: [
      {
        path: '/userList',
        permissionCode: '31',
        component: _import('main_module/user_module/userList/index')
      },
      {
        path: '/userManager',
        permissionCode: '313',
        component: _import('main_module/user_module/userManager/index')
      }
    ]
  }
]
export default new Router({
  routes: constRouter
})
