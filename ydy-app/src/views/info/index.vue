<template>
  <item :data="data" />
</template>

<script>
import item from 'components/item.vue'
export default {
  name: "index",
  components: {
    item
  },
  data() {
    return {
      data: [
        {
          title: '任务查询',
          path: '/info/task',
          src: require('@/assets/img/icon1.png')
        },
        {
          // title: '机动车档案数据查询',
          title: '一车一档',
          path: '/info/files',
          src: require('@/assets/img/icon2.png')
        },
        {
          title: '环保手册查询',
          path: '/info/handbook',
          src: require('@/assets/img/icon3.png')
        },
        {
          title: '遥感监测数据查询',
          path: '/info/data',
          src: require('@/assets/img/icon4.png')
        },
      ]
    }
  }
}
</script>

<style lang="less" scoped>

</style>
