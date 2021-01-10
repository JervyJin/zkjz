<template>
  <div id="app">
  <router-view></router-view>
  </div>
</template>

<script>
import url from '@/service/url-config.js';
import {getjianquan} from '../src/utility/jianquan'

export default {
  created() {
    getjianquan();
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  font-size: 17px;
  
  /deep/.van-field__control--custom{padding: 5px 0;}
  // /deep/.van-cell__label,.van-cell__title{
  //       overflow: hidden;
  //   text-overflow: ellipsis;
  //   white-space: nowrap;
  // }
}
html{
background-color:  #f2f2f2;
}

</style>
