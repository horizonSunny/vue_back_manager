<template>
  <div>
    <div class="title">
      <a class="float-left goBack" href="">返回</a>
      <span class="float-left patientInfo" @click="test"
        >{{ operate }}角色
      </span>
      <div class="clear-both"></div>
    </div>
    <div class="content">
      <a-row>
        <a-col class="marginTop" :span="20">
          <span>*角色名称：</span>
          <a-input class="roleWidth" placeholder="Basic usage" />
        </a-col>
        <a-col class="marginTop" :span="20">
          <span>*角色描述：</span>
          <a-textarea
            style="vertical-align: middle;"
            class="roleWidth"
            placeholder="Basic usage"
            :rows="4"
          />
        </a-col>
        <a-col class="marginTop" :span="20">
          <span>*分配权限：</span>
          <!-- <a-checkbox @change="onChange">Checkbox</a-checkbox> -->
          <!-- <a-row class="roleWidth">
            <a-col class="contentRow" :span="12">col-12</a-col>
            <a-col class="contentRow" :span="12">col-12</a-col>
          </a-row> -->
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>

export default {
  data: function () {
    return {
      operate: this.$route.params.operate
    }
  },
  methods: {
    onChange (e) {
      console.log('check_', e.target)
    },
    test () {
      const test = '1234'
      const length = test.length
      console.log('length_', length)
    }
  }
}
</script>
<style lang="scss">
.title {
  .patientInfo {
    font-size: 18px;
    margin-left: 20px;
  }
  .goBack {
    display: inline-block;
    height: 27px;
    line-height: 27px;
  }
}
.content {
  margin-top: 20px;
  .marginTop {
    margin-top: 20px;
    .roleWidth {
      width: 70%;
    }
    .contentRow {
      text-align: left;
      padding-left: 20px;
      border: 1px solid rgba(128, 128, 128, 0.7);
      // border: 1px solid rgba(0, 145, 255, 0.926);
      border-bottom: 0px;
      height: 55px;
      line-height: 55px;
      overflow: hidden;
    }
  }
}
</style>
