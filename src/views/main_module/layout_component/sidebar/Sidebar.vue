<template>
  <a-layout-sider :trigger="null" collapsible v-model="isCollapsed">
    <SidebarItem :menu-message="menu"></SidebarItem>
  </a-layout-sider>
</template>

<script>
import { mapGetters } from 'vuex'
import { default as SidebarItem } from './SidebarItem'
import { deepCopy } from '@/utils/tools'
export default {
  data: function () {
    return {
      menu: []
    }
  },
  components: {
    SidebarItem
  },
  computed: {
    ...mapGetters(['sidebar', 'permissionRouter']),
    isCollapsed () {
      return !this.sidebar.opened
    }
  },
  methods: {
    filterMenu (permissionRouter, permissionSidebar) {
      const filterMenu = permissionRouter.filter(router => {
        const permission = permissionSidebar.indexOf(router.permissionCode) > -1
<<<<<<< HEAD
        const nullpermission = typeof router.permissionCode === 'object'
        if (permission || nullpermission) {
=======
        if (permission) {
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
          if (router.children && router.children.length) {
            router.children = this.filterMenu(router.children, permissionSidebar)
          }
          return true
        }
        return false
      })
      console.log('filterMenu_', filterMenu)
      return filterMenu
    }
  },
  created: function () {
    const permissionSidebar = this.sidebar.permission
<<<<<<< HEAD
    console.log('deepCopy(this.permissionRouter)_', this.permissionRouter[0]['children'])
    const permissionRouter = deepCopy(this.permissionRouter[0]['children'])
    console.log('permissionSidebar_', permissionSidebar, '_permissionRouter_', permissionRouter)
    console.log('this.permissionRouter_', this.permissionRouter)
    this.menu = this.filterMenu(permissionRouter, permissionSidebar)
    console.log('this.menu_', this.menu)
=======
    const permissionRouter = deepCopy(this.permissionRouter)
    this.menu = this.filterMenu(permissionRouter, permissionSidebar)
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
  }
}
</script>
<style lang="scss">
</style>
