const getters = {
  sidebar: state => state.app.sidebar,
  // 权限对象数组
  permissions: state => state.user.permissions,
  user: state => state.user.user,
  addRouters: state => state.permission.addRouters,
  permissionRouter: state => state.permission.permissionRouter,
  organization: state => state.app.organization,
<<<<<<< HEAD
  hospitals: state => state.app.hospitals,
  // 页面保活处理
  canAlived: state => state.app.canAlived,
  wxhospitals: state => state.app.wxhospitals
=======
  hospitals: state => state.app.hospitals
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
}
export default getters
