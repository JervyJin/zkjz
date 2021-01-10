<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <div>
        <span class="title">河南省12369环保举报联网管理平台</span>
      </div>
      <el-menu
        unique-opened
        :collapse="isCollapse"
        :collapse-transition="false"
        router
        mode="horizontal"
        :default-active="activePath"
        background-color="#409EFF"
        text-color="#BCF3BC"
        active-text-color="#fff"
      >
        <!-- :unique-opened="true"->只允许展开一个菜单 -->
        <!-- :collapse-transition="false" -> 关闭动画 -->
        <!-- router -> 导航开启路由模式 -->
        <el-menu-item :index="'/' + 'welcome'">
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item :index="'/' + 'report'">
          <span slot="title">举报管理</span>
        </el-menu-item>
        <el-menu-item index="2">
          <span slot="title">统计分析</span>
        </el-menu-item>
        <el-menu-item index="3">
          <span slot="title">综合查询</span>
        </el-menu-item>
        <el-menu-item index="4">
          <span slot="title">系统设置</span>
        </el-menu-item>
        <el-menu-item index="5">
          <span slot="title">资料库</span>
        </el-menu-item>
        <el-menu-item index="6">
          <span slot="title">管理视图</span>
        </el-menu-item>
      </el-menu>
    </el-header>
    <router-view></router-view>
  </el-container>
</template>
<script>

export default {
  data() {
    return {
      isFullscreen: false, //默认不全屏
      // 左侧菜单数据
      menuList: [],
      // 默认不折叠
      isCollapse: false,
      // 被激活导航地址
      activePath: ""
    };
  },
  created() {},
  methods: {
    /**
     * 全屏
     */
    clickFullscreen() {
      if (!screenfull.isEnabled) {
        this.$message({
          message: "you browser can not work",
          type: "warning"
        });
        return false;
      }
      screenfull.toggle();
    },
    /**
     * 退出登录
     */
    logout() {
      // 清空token
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    userSet() {
      this.$router.push("/userSet");
    },

    // 菜单的折叠与展开
    togleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    // 保存连接的激活地址
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #409eff;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    img {
      height: 40px;
    }
    span.title {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;

  .el-menu {
    border: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  // 鼠标放上去变成小手
  cursor: pointer;
}
.Fullscreen,
.out {
  cursor: pointer;
  font-size: 14px;
}
</style>
