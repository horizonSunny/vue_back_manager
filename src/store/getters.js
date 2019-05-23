const getters = {
  sidebar: state => state.app.sidebar,
  // 权限对象数组
  permissions: state => state.user.permissions,
  user: state => state.user.user,
  addRouters: state => state.permission.addRouters,
  permissionRouter: state => state.permission.permissionRouter,
  organization: state => state.app.organization
}
export default getters
