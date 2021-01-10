<template>
  <item :data="data" />
</template>

<script>
import item from 'components/item.vue';
export default {
  name: "index",
  components: {
    item
  },
  data() {
    return {
      data: [
        {
          title: '执法任务日期统计',
          path: '/analyse/month',
          src: require('@/assets/img/icon4.png')
        },
        {
          title: '执法任务类型统计',
          path: '/analyse/taskType',
          src: require('@/assets/img/icon5.png')
        },
        {
          title: '执法任务分析统计',
          path: '/analyse/handleAnalyse',
          src: require('@/assets/img/icon6.png')
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>

</style>
