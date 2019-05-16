<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <Sidebar></Sidebar>
    <a-layout>
      <Topbar></Topbar>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px'
        }"
      >
        <template>
          <!-- <a-cascader
            :options="options"
            :displayRender="displayRender"
            @change="onChange"
            changeOnSelect
          /> -->
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
      collapsed: false,
      options: [{
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [{
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [{
            value: 'xihu',
            label: 'West Lake'
          }]
        }]
      }, {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [{
          value: 'nanjing',
          label: 'Nanjing',
          children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men'
          }]
        }]
      }]
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
</style>
