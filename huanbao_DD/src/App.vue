<template>
  <div id="app">
    <div class="outter">
     
      <section class="app-content">
        <transition
          name="custom-classes-transition"
          :enter-active-class="enterAnimate"
          :leave-active-class="leaveAnimate"
        >
          <router-view/>
        </transition>
      </section>
    </div>
  </div>
</template>
<script>
import mixin from "./mixin"; // 混合被单独放在 mixin.js 中管理
window.mixin = mixin; // 将 混合/mixin 暴露在窗口对象中，某些组件需要时，直接提取 window.mixin

var ua = navigator.userAgent.toLowerCase();

var mobile = /mobile/gi.test(ua);
let isPC = !mobile;
if (isPC) {
  console.log('当前为PC')
  // let app = document.getElementsByClassName('app-content').style.fontSize = 16 + 'px';
  document.getElementsByTagName("html")[0].style.fontSize = 40 + 'px';
 
} else {
  console.log('当前不是PC')
  require('amfe-flexible/index.js')
}


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

// $material-icons-font-path: "~material-icons/iconfont/";
// @import "material-icons/iconfont/material-icons.scss";
// @import "./assets/css/toast.css";
// @import "assets/css/wx-header.css";
/*weui 样式库 非常适合高仿微信*/
// @import "assets/css/lib/weui.min.css";
// @import "assets/css/base.css";


/*过渡效果需要的动画库*/
@import "assets/css/lib/animate.css";
.app-content {
  width: 100vw;
  overflow-x: hidden;
  min-height: 100%;
  // font-size: 16px;
}
</style>
