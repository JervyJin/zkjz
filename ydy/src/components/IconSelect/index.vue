<template>
  <div class="icon-body">
    <el-input v-model="name" style="position: relative;" clearable placeholder="请输入图标名称" @clear="filterIcons" @input.native="filterIcons">
      <i slot="suffix" class="el-icon-search el-input__icon" />
    </el-input>
    <div class="icon-list">
      <div class="icons" v-for="(item, index) in iconList" :key="index" @click="selectedIcon(item)">
        <i :class="['icon', 'iconfont', item.icon]"></i>
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IconSelect',
  data() {
    return {
      name: '',
      iconList: [],
      icons: [
        {name: '门户', icon: 'icon-yaoganjiance1'},
        {name: '设置', icon: 'icon-shezhi'},
        {name: '抽查', icon: 'icon-choucha'},
        {name: '档案库', icon: 'icon-danganku'},
        {name: '线路检测', icon: 'icon-xianlujiance'},
        {name: '机动车尾气', icon: 'icon-jidongcheweiqi'},
        {name: '更多', icon: 'icon-gengduo'},
        {name: '告知', icon: 'icon-gaozhiwode-'},
        {name: '文件', icon: 'icon-wenjian'},
        {name: '时钟', icon: 'icon-shizhong'},
        {name: '机动车遥感监测系统', icon: 'icon-jidongcheyaoganjiancexitong'},
        // {name: '告知', icon: 'icon-yidongwuranyuanchezhupilianggaozhi'},
        {name: '机动车黑烟排放检测', icon: 'icon-jidongcheheiyanpaifangjiance'},
        {name: '移动污染源移动执法系统', icon: 'icon-yidongwuranyuanyidongzhifaxitong'},
        {name: '机动车档案库', icon: 'icon-jidongchedanganku'},
        {name: '管理端', icon: 'icon-guanliduan'},
        {name: '抽测监管', icon: 'icon-yidongwuranyuanxinchexiaoshouchoucejianguan'},
        {name: '重型柴油车改造治理', icon: 'icon-zhongxingchaiyouchegaizaozhili'},
        {name: '移动污染源案件推送', icon: 'icon-yidongwuranyuananjiantuisong'},

        {name: 'obd', icon: 'icon-06_obd'},
        {name: 'M站', icon: 'icon-Mzhan'},
        {name: '通知', icon: 'icon-tongzhi'},
        {name: '添加', icon: 'icon-tianjia'},
        {name: '搜索', icon: 'icon-sousuo'},
        {name: '更新', icon: 'icon-gengxin'},
        {name: '修改', icon: 'icon-xiugai'},
        {name: '删除', icon: 'icon-delete'},
        {name: '刷新', icon: 'icon-shuaxincopy'},
        {name: '数据', icon: 'icon-data'},

      ]
    }
  },
  methods: {
    filterIcons() {
      if (this.name) {
        this.iconList = this.icons;
        this.iconList = this.iconList.filter(item => item.includes(this.name))
      }
    },
    selectedIcon(name) {
      this.$emit('selected', name)
      document.body.click()
    },
    reset() {
      this.name = ''
      this.iconList = this.icons;
    }
  }
}
</script>

<style lang="less" scoped>
  .icon-body {
    width: 100%;
    padding: 10px;
    .icon-list {
      height: 200px;
      overflow-y: scroll;
      .icons {
        width: 33%;
        height: 30px;
        line-height: 30px;
        margin-bottom: -5px;
        cursor: pointer;
        float: left;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        span {
          display: inline-block;
          vertical-align: middle;
          fill: currentColor;
          overflow-x: hidden;
          max-width: 85%;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin-left: 5px;
        }
      }
    }
  }
</style>