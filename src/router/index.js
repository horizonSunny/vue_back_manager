import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/view/HelloWorld'
// 必须设置node环境变量
const _import = require('./import_' + process.env.NODE_ENV)
// const _import = require('./import_' + 'developments')

Vue.use(Router)

export const constRouter = [
  { path: '/', redirect: '/main' },
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
  },
  {
    path: '/main',
    component: _import('main_module/AppMain'),
    hidden: true
  }
]

export const asyncRouter = [
  {
    path: '/record',
    permissionCode: 1,
    component: _import('main_module/record_module/RecordMain'),
    children: [
      {
        path: '/recordInfo',
        permissionCode: 11,
        component: _import('main_module/record_module/recordInfo/index')
      },
      {
        path: '/recordList',
        permissionCode: 1,
        component: _import('main_module/record_module/recordList/index')
      },
      {
        path: '/recordReport',
        permissionCode: 11,
        component: _import('main_module/record_module/recordReport/index')
      }
    ]
  },
  {
    path: '/system',
    permissionCode: '2',
    component: _import('main_module/system_module/SystemMain'),
    children: [
      {
        path: '/backManagerList',
        component: _import('main_module/system_module/backManagerList/index')
      },
      {
        path: '/newBackUser',
        component: _import('main_module/system_module/newBackUser/index')
      },
      {
        path: '/newDepartment',
        component: _import('main_module/system_module/newDepartment/index')
      },
      {
        path: '/newRole',
        component: _import('main_module/system_module/newRole/index')
      },
      {
        path: '/roleList',
        component: _import('main_module/system_module/roleList/index')
      }
    ]
  },
  {
    path: '/evaluation',
    permissionCode: '3',
    component: _import('main_module/evaluation_module/EvaluationMain'),
    children: [
      {
        path: '/evaluationList',
        component: _import('main_module/evaluation_module/evaluationList/index')
      },
      {
        path: '/evaluationScheme',
        component: _import(
          'main_module/evaluation_module/evaluationScheme/index'
        )
      },
      {
        path: '/newEvaluation',
        component: _import('main_module/evaluation_module/newEvaluation/index')
      },
      {
        path: '/newScheme',
        component: _import('main_module/evaluation_module/newScheme/index')
      }
    ]
  },
  {
    path: '/user',
    component: _import('main_module/user_module/UserMain'),
    children: [
      {
        path: '/userList',
        component: _import('main_module/user_module/userList/index')
      },
      {
        path: '/userManager',
        component: _import('main_module/user_module/userManager/index')
      }
    ]
  }
]
export default new Router({
  routes: constRouter
})
