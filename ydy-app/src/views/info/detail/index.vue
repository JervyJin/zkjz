<template>
  <div>
    <van-tabs v-model="active" color="#28A1FF" title-active-color="#28A1FF" title-inactive-color="#333">
      <van-tab title="任务信息">
        <tab1 />
      </van-tab>
      <van-tab title="流转记录">
        <tab2 />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import tab1 from './tab1';
import tab2 from './tab2';
export default {
  components: {
    tab1,
    tab2
  },
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>
  /deep/ .van-tabs__line {
    width: 44px!important;
  }
</style>