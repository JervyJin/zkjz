<template>
  <div>
    <!-- 面包屑导航区 -->
    <div class="breadcrumbBox">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>举报管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
      <span class="loginOut">[退出]</span>
    </div>

    <el-container>
      <el-aside width="170px">
        <el-menu>
          <el-menu-item index="1">
            <i class="el-icon-document"></i>
            <span slot="title">所有举报</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">微信举报</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">网络举报</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">电话举报</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-setting"></i>
            <span slot="title">其他方式</span>
          </el-menu-item>
          <el-menu-item index="6">
            <i class="el-icon-setting"></i>
            <span slot="title">电话咨询</span>
          </el-menu-item>
          <el-menu-item index="7">
            <i class="el-icon-setting"></i>
            <span slot="title">草稿箱</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 内容区域 -->
      <el-main>
        <div class="box">
          <p>已选内容</p>
        </div>
        <!-- 通过插槽形式展示(分成两列) -->
        <split-pane
          v-on:resize="resize"
          :min-percent="20"
          :default-percent="30"
          split="vertical"
        >
          <template slot="paneL"> A </template>
          <template slot="paneR"> B </template>
        </split-pane>
        <!-- 数字滚动组件 -->
        <countTo :startVal='startVal' :endVal='endVal' :duration='3000' prefix="￥" :decimals="2"></countTo>
      </el-main>
    </el-container>
    <!-- 菜单导行 -->
  </div>
</template>

<script>
import countTo from 'vue-count-to';
export default {
  components: { countTo },
  data() {
    return {
      startVal: 0,
      endVal: 2017
    };
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
}
.breadcrumbBox {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  background: #f5f5f5;
  height: 32px;
  line-height: 32px;
  .el-breadcrumb {
    line-height: 32px;
  }
  .loginOut {
    color: #1890ff;
  }
}
// 菜单导航
.el-menu {
  width: 170px;
}
</style>
