const getters = {
  sidebar: state => state.app.sidebar,
  // 权限对象数组
  permissions: state => state.user.permissions,
  permission_router: state => state.permission.accessRouter
}
export default getters
