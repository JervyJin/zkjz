<template>
  <el-container>
    <el-aside :class="showNav ? 'aside1' : 'aside2'">
      <nav-bar @hideNav="hideNav"></nav-bar>
      <div class="close-button" @click="closeLeft" v-if="menus.length"></div>
    </el-aside>
    
    <el-main>
      <div :class="showMenu ? 'main-part' : 'main-all'">
        <router-view v-if="menus.length"></router-view>
      </div>
      <!-- <link-menu @showMenu="toShowMenu"/> -->
    </el-main>
  </el-container>
</template>

<script>
import NavBar from "@/components/nav-bar";
import linkMenu from '@/components/linkMenu'
// import {url} from '@/servers/url-config'

export default {
  components: {
    NavBar,
    linkMenu
  },
  data() {
    return {
     showNav: true,
     showMenu: false
    };
  },
  computed: {
    // 菜单
    menus() {
      return [1]
      // return this.$store.state.menus.menus;
    }
  },
  methods: {
   hideNav(v) {
     this.showNav = !v;
   },
   toShowMenu(v) {
     this.showMenu = v;
   },
   closeLeft() {
     this.showNav = !this.showNav;
   }
  }
};
</script>
<style lang="less" >
.el-container {
  height: 100%;
  overflow: hidden;
  .el-aside{
    overflow: hidden;
    transition: width linear .2s;
    height: 100%;
    position: relative;
    
    .close-button {
      position: absolute;
      right: -8px;
      top: 50%;
      transform: translateX(-50%);
      width: 16px;
      height: 66px;
      background: url('~@/assets/image/close.png') no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
    }
    &.aside1 {
      // width: 180px!important;
      width: 228px!important;
      // width: 300px!important;
    }
    &.aside2 {
      width: 16px!important;
    }
    // .el-submenu {
    //   width: 300px!important;
    // }
    .el-menu-item-group__title {
      padding: 0px 0 0px 20px;
    }
    .el-submenu__title *, .el-menu-item * {
      line-height: 1;
      // max-width: 198px;
      max-width: 85%;
      display: inline-block;
      vertical-align: middle;
      white-space: pre-wrap;
    }
    .el-menu-item, .el-submenu__title{
      width: 100%;
      padding-left: 20px!important;
      padding-right: 20px!important;
    }
    .el-submenu {
      .el-menu-item{
        padding-left: 10px!important;
        padding-right: 20px!important;
      }
    }
  }
  .el-main {
    height: 100%;
    overflow: hidden;
    .main-all{
      height: 100%;
      width: 100%;
      overflow: hidden;
    }
    // .main-part {
    //   padding-bottom: 60px;
    //   height: calc(100% - 60px);
    //   width: calc(100% - 100px);
    //   overflow: auto;
    // }
  }
}
</style>
