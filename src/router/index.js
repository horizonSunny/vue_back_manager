import Vue from 'vue'
import Router from 'vue-router'
import mainComponent from '../views/main_module/AppMain'
import moduleMainComponent from '../views/main_module/ModuleMain'
import noPermission from '../views/main_module/NoPermission'
// import HelloWorld from '@/view/HelloWorld'
// 必须设置node环境变量
// import loginComponent from '../views/login_module/login'
// const _import = require('./import_' + process.env.NODE_ENV)
const _import = require('./import_' + 'development')

Vue.use(Router)

export const constRouter = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    component: _import('login_module/login/index')
    // component: loginComponent
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
    path: 'record',
    permissionCode: '1',
    sideBarName: '患者档案',
    component: moduleMainComponent,
    children: [
      {
        path: 'noPermission',
        permissionCode: true,
        component: noPermission
      },
      {
        path: 'recordInfo',
        name: 'recordInfo',
        permissionCode: '111',
        sideBarName: '基本信息',
        component: _import('main_module/record_module/recordInfo/index')
      },
      {
        path: 'recordList',
        name: 'recordList',
        permissionCode: '11',
        sideBarName: '档案列表',
        component: _import('main_module/record_module/recordList/index')
      },
      {
        path: 'recordReport',
        name: 'recordReport',
        permissionCode: '112',
        sideBarName: '测评报告',
        component: _import('main_module/record_module/recordReport/index')
      }
    ]
  },
  // 系统模块
  {
    path: 'system',
    permissionCode: '4',
    sideBarName: '系统设置',
    component: moduleMainComponent,
    children: [
      // 后台管理

      {
        path: 'noPermission',
        permissionCode: true,
        component: noPermission
      },
      {
        path: 'backManagerList',
        name: 'backManagerList',
        permissionCode: '42',
        sideBarName: '后台用户',
        component: _import('main_module/system_module/backManagerList/index')
      },
      {
        path: 'newBackUser',
        name: 'newBackUser',
        permissionCode: '421',
        sideBarName: '新建后台用户',
        component: _import('main_module/system_module/newBackUser/index')
      },
      // 部门
      {
        path: 'newDepartment',
        name: 'newDepartment',
        permissionCode: '426',
        sideBarName: '新建部门',
        component: _import('main_module/system_module/newDepartment/index')
      },
      // 角色
      {
        path: 'newRole',
        name: 'newRole',
        permissionCode: '411',
        sideBarName: '新建角色',
        component: _import('main_module/system_module/newRole/index')
      },
      {
        path: 'roleList',
        permissionCode: '41',
        sideBarName: '角色管理',
        component: _import('main_module/system_module/roleList/index')
      }
    ]
  },
  // 测评模块
  {
    path: 'evaluation',
    permissionCode: '2',
    sideBarName: '量表管理',
    component: moduleMainComponent,
    children: [
      // 测评量表

      {
        path: 'noPermission',
        permissionCode: true,
        component: noPermission
      },
      {
        path: 'evaluationList',
        name: 'evaluationList',
        permissionCode: '21',
        sideBarName: '测评列表',
        component: _import('main_module/evaluation_module/evaluationList/index')
      },
      // 方案管理
      {
        path: 'evaluationScheme',
        name: 'evaluationScheme',
        permissionCode: '22',
        sideBarName: '方案管理',
        component: _import(
          'main_module/evaluation_module/evaluationScheme/index'
        )
      },
      // 新建测评
      {
        path: 'newEvaluation',
        name: 'newEvaluation',
        permissionCode: '211',
        sideBarName: '新建测评',
        component: _import('main_module/evaluation_module/newEvaluation/index')
      },
      // 新建方案
      {
        path: 'newScheme',
        name: 'newScheme',
        permissionCode: '221',
        sideBarName: '新建方案',
        component: _import('main_module/evaluation_module/newScheme/index')
      }
    ]
  },
  // 用户模块
  {
    path: 'user',
    component: moduleMainComponent,
    permissionCode: '3',
    sideBarName: '用户管理',
    children: [
      {
        path: 'noPermission',
        permissionCode: true,
        component: noPermission
      },
      {
        path: 'userList',
        permissionCode: '31',
        sideBarName: '脑健康管理师',
        component: _import('main_module/user_module/userList/index')
      },
      {
        path: 'userManager',
        name: 'userManager',
        permissionCode: '313',
        sideBarName: '新建用户',
        component: _import('main_module/user_module/userManager/index')
      }
    ]
  },
  // 微信端管理
  {
    path: 'wechat',
    component: moduleMainComponent,
    permissionCode: '5',
    sideBarName: '微信端管理',
    children: [
      {
        path: 'noPermission',
        permissionCode: true,
        component: noPermission
      },
      {
        path: 'materialManagement',
        name: 'materialManagement',
        permissionCode: '54',
        sideBarName: '素材管理',
        component: _import('main_module/wechat_module/materialManagement/index')
      },
      {
        path: 'drugstoreManagement',
        name: 'drugstoreManagement',
        permissionCode: '51',
        sideBarName: '药店管理',
        component: _import(
          'main_module/wechat_module/drugstoreManagement/index'
        )
      },
      {
        path: 'hospitalManagement',
        name: 'hospitalManagement',
        permissionCode: '53',
        sideBarName: '医院管理',
        component: _import('main_module/wechat_module/hospitalManagement/index')
      },
      {
        path: 'doctorManagement',
        // name: 'doctorManagement',
        permissionCode: '52',
        sideBarName: '医生管理',
        component: _import('main_module/wechat_module/doctorManagement/index')
      },
      // 这边是sunyu新添加的静态配置路由，从每一个引入_asyncAddRouter中提取处理
      {
        path: 'doctorInsert',
        // name: 'doctorManagement',
        permissionCode: true,
        name: 'doctorInsert',
        sideBarName: '医生管理',
        component: _import(
          'main_module/wechat_module/doctorManagement/doctorInsert'
        )
      },
      {
        path: 'drugStoreInsert',
        name: 'drugStoreInsert',
        permissionCode: true,
        sideBarName: '医生管理',
        component: _import(
          'main_module/wechat_module/drugstoreManagement/drugStoreInsert'
        )
      },
      {
        path: 'graphicInsert',
        name: 'graphicInsert',
        permissionCode: true,
        sideBarName: '医生管理',
        component: _import(
          'main_module/wechat_module/graphicManagement/graphicInsert'
        )
      },
      {
        path: 'hospitalInsert',
        name: 'hospitalInsert',
        permissionCode: true,
        sideBarName: '医生管理',
        component: _import(
          'main_module/wechat_module/hospitalManagement/hospitalInsert'
        )
      },
      {
        path: 'videoInsert',
        name: 'videoInsert',
        permissionCode: true,
        sideBarName: '医生管理',
        component: _import(
          'main_module/wechat_module/videoManagement/videoInsert'
        )
      }
    ]
  }
]
export const addMainRouter = [
  {
    path: '/main',
    component: mainComponent,
    children: []
  }
]

const router = new Router({
  mode: 'hash',
  routes: constRouter
})

function _addRouteByPath (path, name, componentPath) {
  let component = _import(componentPath)
  let tempRoute = {
    path: '',
    component: mainComponent,
    hidden: true,
    children: [
      {
        path: path,
        name: name,
        component: component
      }
    ]
  }
  return tempRoute
}
export function _asyncAddRouter (path, name, componentPath) {
  let tmpRouter = _addRouteByPath(path, name, componentPath)

  // 本地缓存添加被加入的路由，防止刷新
  // let locAddRouter = localStorage.getItem('asyncAddRouter')
  // const tmpLoc = { path: path, name: name }
  // if (!locAddRouter) {
  //     locAddRouter = JSON.stringify([tmpLoc])
  // } else {
  //   if (!JSON.parse(locAddRouter).some((val) => { return val.name === name })) {
  //     locAddRouter = JSON.parse(locAddRouter)
  //     locAddRouter.push(tmpLoc)
  //     locAddRouter = JSON.stringify(locAddRouter)
  //   } else {
  //     return
  //   }
  // }
  // localStorage.setItem('asyncAddRouter', locAddRouter)
  router.addRoutes(
    [tmpRouter].concat([
      {
        path: 'noPermission',
        permissionCode: true,
        component: noPermission
      }
    ])
  )
}

export default router
