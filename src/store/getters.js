const getters = {
  sidebar: state => state.app.sidebar,
  // 权限对象数组
  permissions: state => state.user.permissions,
  addRouters: state => state.permission.addRouters
}
export default getters
