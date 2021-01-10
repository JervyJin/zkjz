<template>
  <div id="app">
   <router-view></router-view>
  </div>
</template>
<script>
import mixin from "./mixin"; // 混合被单独放在 mixin.js 中管理
window.mixin = mixin; // 将 混合/mixin 暴露在窗口对象中，某些组件需要时，直接提取 window.mixin


export default {
  name: "app",
  components: {
  },
  data() {
    return {
      pageName: "",
      routerAnimate: false,
      enterAnimate: "", //页面进入动效
      leaveAnimate: "" //页面离开动效
    };
  },
  created() {},
  methods: {},
  watch: {
    // 监听 $route 为店内页设置不同的过渡效果
    $route(to, from) {
      const toDepth = to.path.length;
      const fromDepth = from.path.length;
      if (toDepth === 2) {
        this.$store.commit("setPageName", to.name);
      }
      //同一级页面无需设置过渡效果
      if (to.meta.Athesamelevel) {
        return;
      }
      // this.enterAnimate =
      //   toDepth > fromDepth ? "animated fadeInRight" : "animated fadeInLeft";
      // this.leaveAnimate =
      //   toDepth > fromDepth ? "animated fadeOutLeft" : "animated fadeOutRight";
    }
  },
  updated() {
    // 只要组件发生变化都会触发可用于切换组件时公共数据的刷新
    // this.$store.dispatch('newbalance')
  }
};
</script>


<style lang="scss">
// @import "./assets/css/toast.css";
// /*阿里 fonticon*/
// @import "assets/css/lib/iconfont.css";
// /*过渡效果需要的动画库*/
// @import "assets/css/lib/animate.css";
.app-content {
  min-height: 100%;
}
</style>
