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
          title: '任务完成率',
          path: '/work/finishRate',
          src: require('@/assets/img/icon4.png')
        },
        {
          title: '人员执行任务数',
          path: '/work/handleRate',
          src: require('@/assets/img/icon5.png')
        },
        {
          title: '人员参与率',
          path: '/work/attendRate',
          src: require('@/assets/img/icon6.png')
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>

</style>
