<template>
  <div class="page">
    <van-cell v-for="v in data" :key="v.path" :title="v.title" size="large" is-link :to="v.path">
      <template #icon>
        <van-image :src="v.src" />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "item",
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  watch: {
    data: {
      deep: true,
      immediate: true,
      handler(newVal) {
        // console.log(newVal)
      }
    }
  },
  data() {
    return {
      // data: [
      //   {
      //     title: '任务派发',
      //     path: '/task/send',
      //     src: require('@/assets/img/icon1.png')
      //   },
      //   {
      //     title: '任务办理',
      //     path: '/task/todo',
      //     src: require('@/assets/img/icon2.png')
      //   },
      //   {
      //     title: '已办任务',
      //     path: '/task/done',
      //     src: require('@/assets/img/icon3.png')
      //   },
      // ]
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  background: #f2f2f2;
  padding-top: 12px;
  height: calc(100vh - 44px);
  box-sizing: border-box;
  .van-cell {
    align-items: center;
    margin-bottom: 12px;
    /deep/ .van-image {
      width: 37px;
      margin-right: 15px;
    }
  }
}
</style>
