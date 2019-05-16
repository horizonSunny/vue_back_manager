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
        if (permission) {
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
    const permissionRouter = deepCopy(this.permissionRouter)
    this.menu = this.filterMenu(permissionRouter, permissionSidebar)
  }
}
</script>
<style lang="scss">
</style>
