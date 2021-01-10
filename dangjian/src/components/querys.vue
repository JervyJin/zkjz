<template>
  <van-dropdown-menu>
    <van-dropdown-item
      v-for="(v, i) in querys" 
      :key="i"
      v-model="v.value" 
      :options="v.options"
      @change="changeOptions"
    />
  </van-dropdown-menu>
</template>

<script>
export default {
  props: {
    querys: {
      required: true,
      type: Array,
      defaultValue: [
        {
          value: 1,
          options: [
            {text: '全部', value: 1}
          ]
        }
      ]
    }
  },
  methods: {
    // 选项变更 传递给父元素
    changeOptions(v) {
      this.$emit('changeOptions', v)
    }
  }
}
</script>

<style lang="less" scoped>

</style>