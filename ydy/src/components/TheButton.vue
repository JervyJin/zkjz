
<template>
  <div class="the-button">
    <el-button
      size='small'
      type='primary'
      v-for="btn in data"
      :key="btn.buttonId"
      @click="btnMethod(btn.methods)"
      plain >{{btn.modelName}}</el-button>

      
        <el-menu-item :index="'/index/page1'">
          <i class="el-icon-refresh"></i>
          <span slot="title">门户</span>
        </el-menu-item>
        <el-submenu :index="'/analyse'">
          <template slot="title">
            <i class="iconfont iconditu"></i>
            <span>移动污染源一张图</span>
          </template>
          <el-menu-item :index="'/analyse/ydwryyzt'">
            <span>遥感检测综合分析</span>
          </el-menu-item>
          <el-menu-item :index="'/analyse/dwfx'">
            <span>遥感检测点位分析</span>
          </el-menu-item>
          <el-menu-item :index="'/analyse/jgfx'">
            <span>机动车排放检验机构分析</span>
          </el-menu-item>
          <el-menu-item :index="'/analyse/jxfx'">
            <span>非道路移动机械分析</span>
          </el-menu-item>
          <el-menu-item :index="'/analyse/obd'">
            <span>重型柴油车治理及OBD分析</span>
          </el-menu-item>
          <el-menu-item :index="'/analyse/ccfx'">
            <span>抽检抽查分析</span>
          </el-menu-item>
        </el-submenu>
        <!-- 机动车档案库 -->
        <el-menu-item :index="'/' + 'archives'">
          <i class="iconfont icondangan1"></i>
          <span slot="title">机动车档案库</span>
        </el-menu-item>
        <!-- 机动车尾气分析菜单 -->
        <el-submenu index="offGes">
          <template slot="title">
            <i class="iconfont iconanalysis"></i>
            <span>机动车尾气影响分析</span>
          </template>
          <el-menu-item :index="'/' + 'match'">
            <span>多级网格与机动车精准匹配</span>
          </el-menu-item>
          <el-menu-item index="3-2">
            <span>机动车类型综合建模</span>
          </el-menu-item>
          <el-menu-item :index="'/offGes'">
            <span>机动车行驶尾气影响分析</span>
          </el-menu-item>
        </el-submenu>
        <!-- 机动车黑烟排放检测 -->
        <el-menu-item :index="'/analyse/jdchypfjc'">
          <i class="iconfont iconshujujiance"></i>
          <span slot="title">机动车黑烟排放检测</span>
        </el-menu-item>
        <!-- 移动污染源案件 -->
        <el-menu-item :index="'/analyse/ydwryajts'">
          <i class="iconfont icontuisong"></i>
          <span slot="title">移动污染源案件推送</span>
        </el-menu-item>
        <!-- 移动污染源车主批量告知-->
        <el-menu-item :index="'/analyse/czplgz'">
          <i class="iconfont icongonggao"></i>
          <span slot="title">移动污染源车主批量告知</span>
        </el-menu-item>
        <!--移动污染源新车销售抽测监管-->
        <el-menu-item :index="'/analyse/xcxsccjg'">
          <i class="iconfont iconjianguan"></i>
          <span slot="title">移动污染源新车销售抽测监管</span>
        </el-menu-item>
        <!-- 移动污染源移动执法系统 -->
        <el-submenu index="zfxt">
          <template slot="title">
            <i class="iconfont iconwinfo-icon-zhifazhichi"></i>
            <span>移动污染源移动执法系统</span>
          </template>
          <el-menu-item :index="'/zfxt/data'">
            <span>数据展示</span>
          </el-menu-item>
          <el-submenu :index="'/zfxt/rwpf'">
            <template slot="title">任务管理</template>
            <el-menu-item :index="'/zfxt/rwpf'">任务派发</el-menu-item>
            <el-menu-item :index="'/zfxt/dbrw'">待办任务</el-menu-item>
            <el-menu-item :index="'/zfxt/ybrw'">已办任务</el-menu-item>
          </el-submenu>
          <el-submenu :index="'/zfxt/rwcx'">
            <template slot="title">信息查询</template>
            <el-menu-item :index="'/zfxt/rwcx'">执法任务查询</el-menu-item>
            <el-menu-item :index="'/zfxt/ycyd'">一车一档</el-menu-item>
            <el-menu-item :index="'/zfxt/sccx'">环保手册查询</el-menu-item>
          </el-submenu>
          <el-submenu :index="'/zfxt/rwwcl'">
            <template slot="title">工作考核</template>
            <el-menu-item :index="'/zfxt/rwwcl'">任务完成率</el-menu-item>
            <el-menu-item :index="'/zfxt/zxrws'">人员执行任务数</el-menu-item>
            <el-menu-item :index="'/zfxt/rycyl'">人员参与率</el-menu-item>
          </el-submenu>
        </el-submenu>




  </div>
</template>
<script>
export default {
  props: {
    data: Array
  },
  methods: {
    /** * 按钮回掉 */
    btnMethod (mth) {
      this.$emit('btnMethod', mth)
    }
  }
}
</script>
<style lang="less">

</style>
