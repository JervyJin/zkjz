<template>
  <div>
    <topNav />
    <router-view />
  </div>
</template>

<script>
import topNav from '@/components/topNav.vue';
export default {
  name: 'task',
  components: {
    topNav
  },
  data() {
    return {
      transitionName: 'slide-right'
    }
  }
}
</script>

<style lang="less" scoped>
  .v-enter{
    opacity: 0;
    transform: translateX(100%);
  }
  .v-leave-to{
    opacity: 0;
    transform: translateX(-100%);
    // 解决页面从上往下位移问题
    position: absolute;
  }
  .v-enter-active,.v-leave-active{
    transition: all 0.35s ease;
  }
</style>