本页面主要测试移动端rem在vant下的适配，因为vant自带的组件默认使用的是px单位
<template>
  <div>
    <!-- 我们在这里引用vant的dialog组件看看效果  发现它会自动把px转化为rem-->
    <van-button type="primary" size="large" @click="show_dialog">大号按钮</van-button>
    <!-- 测试引入本地阿里图标库 -->
    <i class="iconfont iconkeyibaoyunhuiyuanicon-155"></i>
    <!-- 测试 使用dayjs结合filter过滤器格式化日期 -->
    <span>{{nowDate|formatDate}}</span>
  </div>
</template>
<script>
// import dayjs from "dayjs";
export default {
  data() {
    return {
      nowDate: new Date()
      // nowDate: dayjs(new Date()).format("YYYY-MM-DD")
    };
  },
  methods: {
    show_dialog() {
      this.$dialog.alert({
        message: "弹窗内容"
      });
    }
  }
};
</script>
<style>
</style>