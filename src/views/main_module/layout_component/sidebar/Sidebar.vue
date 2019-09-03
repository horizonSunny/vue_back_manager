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
        const nullpermission = typeof router.permissionCode === 'object'
        if (permission || nullpermission) {
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
    console.log('deepCopy(this.permissionRouter)_', this.permissionRouter[0]['children'])
    const permissionRouter = deepCopy(this.permissionRouter[0]['children'])
    console.log('permissionSidebar_', permissionSidebar, '_permissionRouter_', permissionRouter)
    console.log('this.permissionRouter_', this.permissionRouter)
    this.menu = this.filterMenu(permissionRouter, permissionSidebar)
    console.log('this.menu_', this.menu)
  }
}
</script>
<style lang="scss">
</style>
