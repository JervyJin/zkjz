<template>
  <div class="pageIndex">
    <!-- tab切换栏 -->
    <div class="tabs">
      <!--<span :class="['tab', currentTab == 0 ? 'active' : '']" @click="turnPage(0)">统一登录</span>-->
      <span :class="['tab', currentTab == 1 ? 'active' : '']" @click="turnPage(1)">遥感监测点位分析</span>
      <span :class="['tab', 'tab1', currentTab == 2 ? 'active' : '']" @click="turnPage(2)">机动车排放检验机构</span>
      <span
        :class="['tab', 'tab1', currentTab == 3 ? 'active' : '']"
        @click="turnPage(3)"
      >柴油货车OBD远程监控</span>
      <span :class="['tab', 'tab1', currentTab == 4 ? 'active' : '']" @click="turnPage(4)">路检路查统计</span>
      <span :class="['tab', currentTab == 0 ? 'active' : '']" @click="turnPage(0)">统一登录</span>
      <!-- <el-dropdown @command="handleCommand" :class="['tab', 'tab1', currentTab == 4 ? 'active' : '']">
        <span class="el-dropdown-link">
          抽检抽查分析
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">路检分析</el-dropdown-item>
          <el-dropdown-item command="b">路查分析</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
    </div>

    <div class="map_wrap">
      <router-view />
    </div>

    <!-- <link-menu /> -->
  </div>
</template>

<script>
  import url from "@/servers/url-config.js";
// import linkMenu from '@/components/linkMenu'
export default {
  // components: { linkMenu },
  data() {
    return {
      currentTab: 1,
      showProper: true
    };
  },
  created () {
    /*let userId = '';
    if (this.$store.state.users) {
      userId = this.$store.state.users.user.id
      this.$ajax(url.userIsWh, { userId }).then(res => {
        this.$store.commit('set_isWh', res.data || false)
      });
    }*/
  },
  methods: {
    turnPage(v) {
      // if (v === 4) return;

      this.currentTab = v;
      this.$router.push({
        path:"/index/page" + v,
        // query:{command:command}
        });
    },
    handleCommand(command) {
        // this.$message('click on item ' + command);
        this.currentTab = 4;
        this.$router.push({
            path:"page4",
            query:{command:command}
            })

      }
  }
};
</script>

<style lang="less">
.pageIndex {
  height: 100%;
  width: 100%;
  // position: relative;
  .map_wrap{
    height: calc(100% - 52px);
    overflow: hidden;
    // margin-bottom: 40px;
    margin-top: 20px;
  }
  .tabs {
    font-size: 15px;
    // position: absolute;
    z-index: 121;
    left: 56px;
    top: 32px;
    display: flex;
    .tab {
      display: flex;
      justify-content: center;
      align-items: center;
      // width: 167px;
      // height: 32px;
      padding: 8px 6px;
      min-width: 170px;
      color: #03B180;
      background: #ffffff;
      /*border: 1px solid #AEBBD5;*/
      box-sizing: border-box;
      cursor: pointer;
      margin-right: 20px;
      background: url('~@/assets/image/long.png');
      background-size: cover;
      &:hover {
        background: url('~@/assets/image/long-selected.png');
        color: #ffffff;
        background-size: cover;
      }
      &.tab1 {
        /*border-left: none;*/
      }
      &.active {
        /*border: 1px solid #1890ff;*/
        color: #ffffff;
        background: url('~@/assets/image/long-selected.png');
        background-size: cover;
        /*background-image: linear-gradient(270deg, #3396FF 2%, #04D298 100%);*/
      }
    }
  }
}
</style>
