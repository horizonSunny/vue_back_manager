<template>
  <div id="components-button-demo-button-group">
    <h4>Basic</h4>
    <a-button-group>
      <a-button @click="deleteStoreCount">delete</a-button>
      <a-button type="primary" @click="addStoreCount">add</a-button>
    </a-button-group>
    <a-button-group>
      <a-button disabled>L</a-button>
      <a-button disabled>M</a-button>
      <a-button disabled>R</a-button>
    </a-button-group>
    <a-button-group>
      <a-button type="primary">L</a-button>
      <a-button>M</a-button>
      <a-button>M</a-button>
      <a-button type="dashed">R</a-button>
    </a-button-group>

    <h4>With Icon</h4>
    <div class="icon-test">
      <a-button-group>
        <a-button type="primary"> <a-icon type="left" />Go back </a-button>
        <a-button type="primary"
          >Go forward
          <a-icon type="right" />
        </a-button>
      </a-button-group>
      <a-icon class="icon-font" type="step-backward" />
    </div>
    <a href="sada"></a>
    <span>{{ refreshCount }}</span>
  </div>
</template>
<style>
#components-button-demo-button-group h4 {
  margin: 16px 0;
  font-size: 14px;
  line-height: 1;
  font-weight: normal;
}
#components-button-demo-button-group h4:first-child {
  margin-top: 0;
}
#components-button-demo-button-group .ant-btn-group {
  margin-right: 8px;
}
#components-button-demo-button-group .icon-font {
  display: inline-block;
  vertical-align: middle;
  height: 32px;
  width: 32px;
  font-size: 32px;
}
#components-button-demo-button-group .icon-test {
  height: 50px;
  line-height: 50px;
}
</style>

<script>
import { mapState } from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 1
    }
  },
  // computed: {
  //   refresh: function () {
  //     return this.$store.getters.count
  //   }
  computed: {
    refresh: state => state.count,
    ...mapState({
      refreshCount (state) {
        return this.msg + state.count
      }
    })
  },
  methods: {
    addStoreCount: function () {
      this.$store.commit('increment')
      // console.log('this.$store.state.count_', this.$store.state.count)
      // this.msg++
      // console.log('this.msg_', this.msg)
    },
    deleteStoreCount: function (event) {
      this.$store.commit('decrement')
      // console.log('this.$store.state.count_', this.$store.state.count)
      // this.msg--
      // console.log('this.msg_', this.msg)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
