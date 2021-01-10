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
          title: '任务派发',
          path: '/task/send',
          src: require('@/assets/img/icon1.png')
        },
        {
          title: '待办任务',
          path: '/task/todo',
          src: require('@/assets/img/icon2.png')
        },
        
        {
          title: '已办任务',
          path: '/task/done',
          src: require('@/assets/img/icon3.png')
        },
        {
          title: '双随机任务',
          path: '/task/ssj',
          src: require('@/assets/img/icon4.png')
        },
      ]
    }
  }
}
</script>

<style lang="less" scoped>

</style>
