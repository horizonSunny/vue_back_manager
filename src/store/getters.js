const getters = {
  sidebar: state => state.app.sidebar,
  // 权限对象数组
  permissions: state => state.user.permissions,
  user: state => state.user.user,
  addRouters: state => state.permission.addRouters,
  permissionRouter: state => state.permission.permissionRouter,
  organization: state => state.app.organization,
  hospitals: state => state.app.hospitals,
  // 页面保活处理
  canAlived: state => state.app.canAlived,
  wxhospitals: state => state.app.wxhospitals
}
export default getters
