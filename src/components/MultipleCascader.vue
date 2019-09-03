<template>
  <div class="multi_cascader">
    <a-cascader
      :disabled="disabledInfo"
      size="default"
      class="multi_cascader__cascader"
      :popupVisible="cascaderPopupVisible"
      :popupClassName="'multi_cascader__cascader_popup' + timestamp"
      expandTrigger="hover"
      :options="cascaderOptions"
      :fieldNames="{ label: 'label', value: 'id', children: 'children' }"
      v-model="cascaderValues"
      ref="cascader"
      :showSearch="{ cascaderFilter }"
      :changeOnSelect="changeSelect"
      @change="cascaderChange"
    ></a-cascader>
    <a-select
      :disabled="disabledInfo"
      size="default"
      class="multi_cascader__select"
      dropdownClassName="hide"
      :mode="optionOperate"
      :value="selectValues"
      :placeholder="placeholderText"
      :options="selectOptions"
      @deselect="deleteOption"
      @change="selectChange"
      @search="selectSearch"
      @focus="showCascader"
      ref="selectCascader"
    ></a-select>
  </div>
</template>

<script>
function optionsListFilter (data) {
  for (let item = 0; item < data.length; item++) {
    data[item]['id'] = data[item]['value']
    if (data[item]['children'] && data[item]['children']['length'] === 0) {
      delete data[item]['children']
    }
    if (data[item]['children'] && data[item]['children']['length'] !== 0) {
      optionsListFilter(data[item]['children'])
    }
  }
}
function selectHopOptionsList (data, options) {
  for (let item = 0; item < data.length; item++) {
    if (data[item]['hospitals'] && data[item]['hospitals']['length'] !== 0) {
      options.push(...data[item]['hospitals'])
    }
    if (data[item]['children'] && data[item]['children']['length'] !== 0) {
      selectHopOptionsList(data[item]['children'], options)
    }
  }
}
function selectOrzOptionsList (data, options) {
  for (let item = 0; item < data.length; item++) {
    options.push(data[item])
    if (data[item]['children'] && data[item]['children']['length'] !== 0) {
      selectOrzOptionsList(data[item]['children'], options)
    }
  }
}
// 从父组件传入值的时候，判断是级联单选还是级联多选，需要改template中的model,cascaderChange方法中的
// this.selectValues置空
export default {
  name: 'MultipleCascader',
  props: ['optionCascader', 'optionOperate', 'haveSelect', 'changeSelect', 'selectFunction', 'disabledInfo'],
  data: function () {
    return {
      timestamp: Date.now(),
      selectOptions: [],
      selectValues: [],
      cascaderPopupVisible: false,
      cascaderValues: []
      // changeInSelect: true
    }
  },
  computed: {
    cascaderOptions: function () {
      optionsListFilter(this.optionCascader)
      return this.optionCascader
    },
    placeholderText: function () {
      const text = this.selectFunction === 'hospital' ? '请选择医院' : '请选择部门'
      return text
    }
  },
  mounted () {
    document.addEventListener('click', this.hideCascaderPopup)
    console.log('this.$refs.selectCascader.$el_', this.$refs.selectCascader.$el)
    this.$refs.selectCascader.$el.querySelectorAll('.ant-select-selection--multiple').forEach(item => {
      console.log('item_', item, '_this_', this)
      item.onclick = this.showCascaderPopup
    })
  },
  created () {
    // 获取所有已选selectOption
    // 判断对不同的结构进行不同的函数处理，获取options
    if (this.selectFunction === 'hospital') {
      selectHopOptionsList(this.optionCascader, this.selectOptions)
    } else if (this.selectFunction === 'organization') {
      selectOrzOptionsList(this.optionCascader, this.selectOptions)
    }
    this.selectValues.push(...this.haveSelect)
  },
  destroyed () {
    document.removeEventListener('click', this.hideCascaderPopup)
  },
  methods: {
    // you may have different logic with the selected option, here I just want the last one.
    cascaderChange (values, options) {
      let targetValue = values.slice(-1).pop()
      let selectedValIndex = this.selectValues.indexOf(targetValue)
      if (selectedValIndex >= 0 && this.optionOperate === 'multiple') {
        this.selectValues.splice(selectedValIndex, 1)
      } else {
        // 单选清空
        if (this.optionOperate !== 'multiple') {
          console.log('targetValue_', targetValue)
          this.selectValues.splice(0, 1, targetValue)
          this.cascaderPopupVisible = false
        }
        this.selectValues.push(targetValue)
      }
      const hasSelect = this.optionOperate !== 'multiple' ? this.selectValues[0] : this.selectValues
      this.$emit('selectValues', hasSelect)
    },
    deleteOption (value) {
      let selectedValIndex = this.selectValues.indexOf(value)
      this.cascaderChange([value], [this.selectOptions[selectedValIndex]])
    },
    selectChange (values, vNodes) {
      // console.log('showCascader_selectChange')
      if (values.length === 0) {
        this.selectValues = []
      }
    },
    selectSearch (keyword) {
      let searchInput = this.$refs.cascader.$el.querySelector('input')
      if (searchInput) {
        searchInput.value = keyword
        searchInput.dispatchEvent(new Event('input'))
      }
    },
    cascaderFilter (inputValue, path) {
      return path.some(
        option =>
          option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
      )
    },
    hideCascaderPopup (event) {
      let cascaderPopup = document.querySelector(
        '.multi_cascader__cascader_popup' + this.timestamp
      )
      let isClickCascaderPopup =
        cascaderPopup && cascaderPopup.contains(event.target)
      if (isClickCascaderPopup) {
        return
      }
      this.cascaderPopupVisible = false
    },
    showCascaderPopup (event) {
      this.cascaderPopupVisible = true
    },
    showCascader () {
      this.cascaderPopupVisible = true
    }
  }
}
</script>

<style scoped>
.multi_cascader {
  height: 40px;
  padding-top: 40px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
.multi_cascader__select {
  width: 100%;
  margin-top: 0;
  margin-bottom: auto;
  transform: translate(0, -100%);
}
.multi_cascader__cascader {
  width: 100%;
  margin-top: auto;
  margin-bottom: 0;
  opacity: 0;
}
.multi_cascader /deep/ .ant-select-selection--multiple {
  height: 34px;
  overflow: auto;
}
/* .multi_cascader /deep/ .ant-select-arrow {
  width: 100%;
}
.multi_cascader /deep/ .ant-select-arrow i {
  float: right;
} */
</style>

<style>
/* global style*/
.hide {
  display: none;
}
</style>
