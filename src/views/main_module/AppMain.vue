<template>
  <a-layout class="background" id="components-layout-demo-custom-trigger">
    <Sidebar></Sidebar>
    <a-layout>
      <Topbar></Topbar>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
          overflow: 'scroll'
        }"
      >
        <template>
<<<<<<< HEAD
=======
          <!-- <a-cascader
            :options="options"
            :displayRender="displayRender"
            @change="onChange"
            changeOnSelect
            :defaultValue="defaultDepartment"
          /> -->
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
          <router-view></router-view>
        </template>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { Sidebar, Topbar } from './layout_component/index.js'
export default {
  name: 'mainComponent',
  data () {
    return {
      collapsed: false
    }
  },
  components: {
    Sidebar, Topbar
  },
  methods: {
    onChange (value) {
      console.log(value)
    },
    displayRender ({ labels }) {
      return labels[labels.length - 1]
    }
<<<<<<< HEAD
  },
  created () {
    console.log('重新走了一遍main模块函数')
=======
>>>>>>> 175a699051bf061e7d6217a0a127867458381d77
  }
}
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.background {
  width: 100%;
  height: 100%;
}
</style>
