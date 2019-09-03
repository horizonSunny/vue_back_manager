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
<<<<<<< HEAD
          :key="item.path"
          v-if="item.children.length === 0"
          class="text-aligin-left"
          @click="toNextPath('noPermission')"
        >
          <a-icon type="inbox" />
          <span>{{ item["sideBarName"] }}</span>
        </a-menu-item>
        <a-menu-item
          :key="item.path"
=======
          :key="item.permissionCode"
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
          v-if="item.children.length === 1"
          class="text-aligin-left"
          @click="toNextPath(item['children'][0]['path'])"
        >
          <a-icon type="inbox" />
          <span>{{ item["sideBarName"] }}</span>
        </a-menu-item>
        <a-sub-menu
<<<<<<< HEAD
          :key="item.path"
=======
          :key="item.permissionCode"
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
          v-if="item.children.length > 1"
          class="text-aligin-left"
        >
          <span slot="title"
            ><a-icon type="appstore" /><span>{{
              item["sideBarName"]
            }}</span></span
          >
          <template v-for="subItem in item.children">
            <a-menu-item
<<<<<<< HEAD
              :key="subItem.path"
=======
              :key="subItem.permissionCode"
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
              @click="toNextPath(subItem['path'])"
              >{{ subItem["sideBarName"] }}</a-menu-item
            >
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
  methods: {
    toNextPath (path) {
      console.log('next_path', path)
      this.$router.push({ path: path })
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
