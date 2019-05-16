<template>
  <!-- <div>123</div> -->
  <div>
    <a-menu
      :defaultSelectedKeys="['1']"
      :defaultOpenKeys="['sub1']"
      mode="inline"
      theme="dark"
      :inlineCollapsed="isCollapsed"
    >
      <template v-for="item in menuMessage">
        <a-menu-item
          :key="item.permissionCode"
          v-if="item.children.length === 1"
          class="text-aligin-left"
        >
          <a-icon type="inbox" />
          <span>{{ item["sideBarName"] }}</span>
        </a-menu-item>
        <a-sub-menu
          :key="item.permissionCode"
          v-if="item.children.length > 1"
          class="text-aligin-left"
        >
          <span slot="title"
            ><a-icon type="appstore" /><span>{{
              item["sideBarName"]
            }}</span></span
          >
          <template v-for="subItem in item.children">
            <a-menu-item :key="subItem.permissionCode">{{
              subItem["sideBarName"]
            }}</a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      isCollapsed: false
    }
  },
  props: ['menuMessage'],
  created: function () {
    console.log('menuMessage_', this.menuMessage)
  }
}
</script>
<style lang="scss">
</style>
