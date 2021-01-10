<template>
  <van-nav-bar
    :title="$route.meta.title"
    :left-text="leftText"
    :right-text="rightText"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  >
    <template #right v-if="isSearch">
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  name: "topNav",
  // props: ["title"],
  data() {
    return {
      isSearch: false,
      // title: "标题",
      leftText: "",
      rightText: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {}
  }
}
</script>

<style lang="less" scoped>
  .van-nav-bar { 
    height: 44px;
    /deep/ .van-nav-bar__title {
      color: #333;
      font-size: 18px;
      font-weight: 600;
    }
    /deep/ .van-nav-bar__left {
      font-size: 18px;
      .van-icon {
        font-weight: 600;
        color: #282828;
      }
    }
  }
</style>
